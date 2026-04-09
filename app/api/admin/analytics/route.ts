import { NextResponse } from 'next/server';

import { isAdminAuthenticated } from '@/lib/auth';
import { summarizeAnalytics } from '@/lib/analytics-store';

export const runtime = 'nodejs';

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const summary = await summarizeAnalytics();
  return NextResponse.json(summary);
}
