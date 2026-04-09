import { createHash, timingSafeEqual } from 'crypto';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ADMIN_COOKIE_NAME = 'portfolio_admin_session';

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || 'portfolio-admin';
}

function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || 'portfolio-admin-secret';
}

function createSessionToken() {
  return createHash('sha256')
    .update(`${getAdminPassword()}:${getAdminSessionSecret()}`)
    .digest('hex');
}

export function validateAdminPassword(password: string) {
  const expected = Buffer.from(getAdminPassword());
  const provided = Buffer.from(password);

  if (expected.length !== provided.length) {
    return false;
  }

  return timingSafeEqual(expected, provided);
}

export function isAdminAuthenticated() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  return token === createSessionToken();
}

export function attachAdminSession(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: createSessionToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
}

export function clearAdminSession(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
