export interface FileItem {
  id: string;
  name: string;
  path: string;
  type: 'tsx' | 'html' | 'js' | 'json' | 'ts' | 'css' | 'md';
  icon: string;
}

export interface Tab {
  id: string;
  file: FileItem;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface AnalyticsEvent {
  event_type: 'page_view' | 'file_click' | 'chat_interaction' | 'button_click' | 'tab_close';
  page: string;
  metadata?: Record<string, any>;
  session_id?: string;
  user_agent?: string;
}

export interface AnalyticsData {
  totalVisits: number;
  pageViews: Record<string, number>;
  fileClicks: Record<string, number>;
  chatInteractions: number;
  topQuestions: Array<{ question: string; count: number }>;
}
