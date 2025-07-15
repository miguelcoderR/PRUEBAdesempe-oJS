// api.js
// Módulo para comunicación con json-server

const API_URL = 'http://localhost:3000';

export async function login(username, password) {
  const res = await fetch(`${API_URL}/users?username=${username}&password=${password}`);
  const users = await res.json();
  return users[0] || null;
}

export async function register(user) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return res.json();
}

export async function getEvents() {
  const res = await fetch(`${API_URL}/events`);
  return res.json();
}

export async function createEvent(event) {
  const res = await fetch(`${API_URL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  });
  return res.json();
}

export async function updateEvent(id, event) {
  const res = await fetch(`${API_URL}/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  });
  return res.json();
}

export async function deleteEvent(id) {
  await fetch(`${API_URL}/events/${id}`, { method: 'DELETE' });
}

export async function registerToEvent(registration) {
  const res = await fetch(`${API_URL}/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registration)
  });
  return res.json();
}

export async function getRegistrationsByUser(userId) {
  const res = await fetch(`${API_URL}/registrations?userId=${userId}`);
  return res.json();
}
