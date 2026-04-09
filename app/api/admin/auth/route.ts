import { NextRequest, NextResponse } from 'next/server';

import { attachAdminSession, validateAdminPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const password = String(body.password || '');

  if (!validateAdminPassword(password)) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  attachAdminSession(response);
  return response;
}
