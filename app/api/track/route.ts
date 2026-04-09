import { NextRequest, NextResponse } from 'next/server';

import { recordAnalyticsEvent } from '@/lib/analytics-store';
import { AnalyticsEventType } from '@/lib/types';

export const runtime = 'nodejs';

const validEventTypes: AnalyticsEventType[] = ['view', 'click', 'chat'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const type = body.type as AnalyticsEventType;
    const page = String(body.page || '').trim();
    const timestamp = Number(body.timestamp || Date.now());
    const metadata = typeof body.metadata === 'object' && body.metadata ? body.metadata : {};

    if (!validEventTypes.includes(type) || !page) {
      return NextResponse.json(
        { error: 'Invalid analytics event payload.' },
        { status: 400 }
      );
    }

    await recordAnalyticsEvent({
      type,
      page,
      metadata,
      timestamp,
      sessionId: typeof body.sessionId === 'string' ? body.sessionId : undefined,
      userAgent:
        typeof body.userAgent === 'string'
          ? body.userAgent
          : request.headers.get('user-agent') || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to record analytics event.' }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({
    ok: true,
    message: 'Use POST /api/track to record analytics events.',
  });
}
