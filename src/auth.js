// auth.js
// Módulo para autenticación y persistencia de sesión

const AUTH_KEY = 'user_session';

export function saveSession(user) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function getSession() {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearSession() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  return !!getSession();
}

export function getUserRole() {
  const user = getSession();
  return user ? user.role : null;
}
