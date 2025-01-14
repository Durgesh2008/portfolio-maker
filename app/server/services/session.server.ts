import { createCookieSessionStorage } from "@remix-run/node";

const storage = createCookieSessionStorage({
  cookie: {
    name: 'session',
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET as string],
    secure: process.env.NODE_ENV === 'production',
  },
});

export let { getSession, commitSession, destroySession } = storage;
