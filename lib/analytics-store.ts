import { appendFile, mkdir, readFile } from 'fs/promises';
import path from 'path';

import { AnalyticsEvent, AnalyticsSummary, HeatmapPoint } from '@/lib/types';

const DATA_DIRECTORY = path.join(process.cwd(), '.data');
const ANALYTICS_FILE = path.join(DATA_DIRECTORY, 'analytics-events.ndjson');

interface AnalyticsStore {
  appendEvent(event: AnalyticsEvent): Promise<void>;
  readEvents(): Promise<AnalyticsEvent[]>;
}

class FileAnalyticsStore implements AnalyticsStore {
  private async ensureFile() {
    await mkdir(DATA_DIRECTORY, { recursive: true });
    try {
      await readFile(ANALYTICS_FILE, 'utf8');
    } catch {
      await appendFile(ANALYTICS_FILE, '', 'utf8');
    }
  }

  async appendEvent(event: AnalyticsEvent) {
    await this.ensureFile();
    await appendFile(ANALYTICS_FILE, `${JSON.stringify(event)}\n`, 'utf8');
  }

  async readEvents() {
    await this.ensureFile();
    const raw = await readFile(ANALYTICS_FILE, 'utf8');

    return raw
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line) as AnalyticsEvent;
        } catch {
          return null;
        }
      })
      .filter((event): event is AnalyticsEvent => Boolean(event))
      .sort((left, right) => right.timestamp - left.timestamp);
  }
}

const analyticsStore: AnalyticsStore = new FileAnalyticsStore();

function incrementCounter(record: Record<string, number>, key: string) {
  record[key] = (record[key] || 0) + 1;
}

function groupHeatmapPoints(events: AnalyticsEvent[]): HeatmapPoint[] {
  const buckets = new Map<string, HeatmapPoint>();

  for (const event of events) {
    const x = Number(event.metadata.x);
    const y = Number(event.metadata.y);

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      continue;
    }

    const bucketX = Math.max(0, Math.min(1, Math.round(x * 12) / 12));
    const bucketY = Math.max(0, Math.min(1, Math.round(y * 8) / 8));
    const key = `${event.page}:${bucketX}:${bucketY}`;
    const existing = buckets.get(key);

    if (existing) {
      existing.value += 1;
      continue;
    }

    buckets.set(key, {
      page: event.page,
      x: bucketX,
      y: bucketY,
      value: 1,
    });
  }

  return Array.from(buckets.values())
    .sort((left, right) => right.value - left.value)
    .slice(0, 80);
}

export async function recordAnalyticsEvent(event: AnalyticsEvent) {
  await analyticsStore.appendEvent(event);
}

export async function readAnalyticsEvents() {
  return analyticsStore.readEvents();
}

export async function summarizeAnalytics(): Promise<AnalyticsSummary> {
  const events = await analyticsStore.readEvents();
  const pageViews: Record<string, number> = {};
  const fileClicks: Record<string, number> = {};
  const commonQueries: Record<string, number> = {};
  const activeSessions = new Set<string>();
  const tabUsage = new Map<string, { name: string; opens: number; focuses: number; closes: number }>();
  const now = Date.now();

  for (const event of events) {
    if (event.type === 'view') {
      incrementCounter(pageViews, event.page);
    }

    if (event.type === 'click') {
      const action = String(event.metadata.action || '');
      const fileName = String(event.metadata.fileName || event.metadata.label || '');

      if (action === 'file_open' && fileName) {
        incrementCounter(fileClicks, fileName);
      }

      if (action.startsWith('tab_') && fileName) {
        const existing = tabUsage.get(fileName) || {
          name: fileName,
          opens: 0,
          focuses: 0,
          closes: 0,
        };

        if (action === 'tab_open') {
          existing.opens += 1;
        }
        if (action === 'tab_focus') {
          existing.focuses += 1;
        }
        if (action === 'tab_close') {
          existing.closes += 1;
        }

        tabUsage.set(fileName, existing);
      }
    }

    if (event.type === 'chat') {
      const query = String(event.metadata.query || '').trim();
      if (query) {
        incrementCounter(commonQueries, query);
      }
    }

    if (event.sessionId && now - event.timestamp <= 5 * 60 * 1000) {
      activeSessions.add(event.sessionId);
    }
  }

  return {
    totalVisits: Object.values(pageViews).reduce((sum, count) => sum + count, 0),
    activeUsers: activeSessions.size,
    pageViews: Object.entries(pageViews)
      .map(([page, views]) => ({ page, views }))
      .sort((left, right) => right.views - left.views),
    fileClicks: Object.entries(fileClicks)
      .map(([name, clicks]) => ({ name, clicks }))
      .sort((left, right) => right.clicks - left.clicks),
    tabUsage: Array.from(tabUsage.values()).sort(
      (left, right) =>
        right.opens + right.focuses + right.closes - (left.opens + left.focuses + left.closes)
    ),
    commonQueries: Object.entries(commonQueries)
      .map(([query, count]) => ({ query, count }))
      .sort((left, right) => right.count - left.count)
      .slice(0, 8),
    heatmapPoints: groupHeatmapPoints(events.filter((event) => event.type === 'click')),
    recentEvents: events.slice(0, 40),
  };
}
