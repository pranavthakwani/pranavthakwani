'use client';

import { AnalyticsEvent, AnalyticsEventType } from '@/lib/types';

const SESSION_STORAGE_KEY = 'portfolio.session.id';

function getSessionId() {
  if (typeof window === 'undefined') {
    return '';
  }

  const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const created = `session_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, created);
  return created;
}

function sendAnalytics(payload: AnalyticsEvent) {
  const body = JSON.stringify(payload);

  if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon('/api/track', blob);
    return;
  }

  void fetch('/api/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    keepalive: true,
  });
}

export function pointerMetadata(event?: MouseEvent | PointerEvent | React.MouseEvent<HTMLElement>) {
  const nativeEvent = event && 'nativeEvent' in event ? event.nativeEvent : event;

  if (!nativeEvent) {
    return {};
  }

  return {
    x: Number((nativeEvent.clientX / window.innerWidth).toFixed(4)),
    y: Number((nativeEvent.clientY / window.innerHeight).toFixed(4)),
  };
}

export function trackEvent(type: AnalyticsEventType, page: string, metadata: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  sendAnalytics({
    type,
    page,
    metadata,
    timestamp: Date.now(),
    sessionId: getSessionId(),
    userAgent: navigator.userAgent,
  });
}

export function trackPageView(page: string, metadata: Record<string, unknown> = {}) {
  trackEvent('view', page, metadata);
}

export function trackClick(page: string, metadata: Record<string, unknown> = {}) {
  trackEvent('click', page, metadata);
}

export function trackChat(page: string, metadata: Record<string, unknown> = {}) {
  trackEvent('chat', page, metadata);
}
