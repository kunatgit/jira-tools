'use client';

const SESSION_KEY = 'jira_tools_session';

export function saveSession(user) {
  if (typeof window === 'undefined') return;
  const session = {
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
    avatar: user.avatar,
    department: user.department,
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
