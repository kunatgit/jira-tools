'use client';

const SESSION_KEY = 'jira_tools_session';

export function saveSession(user) {
  if (typeof window === 'undefined') return;
  const session = {
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    email: user.email,
    avatar: user.avatar,
    position: user.position,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession() {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_KEY);
}

export function isLoggedIn() {
  return getSession() !== null;
}
