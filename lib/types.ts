export type PortfolioLanguage = 'tsx' | 'html' | 'js' | 'json' | 'ts' | 'css' | 'md';

export type ActivityPanelId = 'explorer' | 'search' | 'source-control' | 'extensions';

export interface FileItem {
  id: string;
  name: string;
  route: string;
  workspacePath: string;
  type: PortfolioLanguage;
  icon: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  code: string;
  keywords: string[];
}

export interface Tab {
  id: string;
  file: FileItem;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export type AnalyticsEventType = 'view' | 'click' | 'chat';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  page: string;
  metadata: Record<string, unknown>;
  timestamp: number;
  sessionId?: string;
  userAgent?: string;
}

export interface HeatmapPoint {
  page: string;
  x: number;
  y: number;
  value: number;
}

export interface AnalyticsSummary {
  totalVisits: number;
  activeUsers: number;
  pageViews: Array<{ page: string; views: number }>;
  fileClicks: Array<{ name: string; clicks: number }>;
  tabUsage: Array<{ name: string; opens: number; focuses: number; closes: number }>;
  commonQueries: Array<{ query: string; count: number }>;
  heatmapPoints: HeatmapPoint[];
  recentEvents: AnalyticsEvent[];
}

export interface PortfolioContext {
  bio: string;
  skills: string[];
  projects: Array<{ name: string; summary: string }>;
  contacts: Array<{ label: string; value: string }>;
}

export type AnalyticsData = AnalyticsSummary;
