import { supabase } from './supabase';
import { AnalyticsEvent } from './types';

let sessionId: string | null = null;
const USE_API_ENDPOINT = false; // Set to true to use API endpoint instead of direct Supabase

function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  if (!sessionId) {
    sessionId = sessionStorage.getItem('portfolio_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('portfolio_session_id', sessionId);
    }
  }
  return sessionId;
}

export async function trackEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return;

  const eventData = {
    event_type: event.event_type,
    page: event.page,
    metadata: event.metadata || {},
    session_id: getSessionId(),
    user_agent: navigator.userAgent,
  };

  try {
    if (USE_API_ENDPOINT) {
      // Use API endpoint
      const response = await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        console.error('Analytics tracking error:', await response.text());
      }
    } else {
      // Use direct Supabase
      const { error } = await supabase.from('analytics_events').insert(eventData);

      if (error) {
        console.error('Analytics tracking error:', error);
      }
    }
  } catch (err) {
    console.error('Analytics error:', err);
  }
}

export function trackPageView(page: string) {
  trackEvent({
    event_type: 'page_view',
    page,
  });
}

export function trackFileClick(fileName: string, path: string) {
  trackEvent({
    event_type: 'file_click',
    page: path,
    metadata: { fileName },
  });
}

export function trackChatInteraction(question: string, answer: string) {
  trackEvent({
    event_type: 'chat_interaction',
    page: window.location.pathname,
    metadata: { question, answer },
  });
}

export function trackButtonClick(buttonName: string, page: string) {
  trackEvent({
    event_type: 'button_click',
    page,
    metadata: { buttonName },
  });
}

export function trackTabClose(fileName: string) {
  trackEvent({
    event_type: 'tab_close',
    page: window.location.pathname,
    metadata: { fileName },
  });
}
