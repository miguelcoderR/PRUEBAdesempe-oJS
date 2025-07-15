// Dashboard.js
import { getSession, clearSession } from '../auth.js';
import { getEvents, getRegistrationsByUser, registerToEvent, deleteEvent } from '../api.js';
import { showSuccess, showError } from '../swal.js';

export default async function Dashboard() {
  const user = getSession();
  let events = await getEvents();
  let registrations = [];
  if (user.role === 'visitor') {
    registrations = await getRegistrationsByUser(user.id);
  }
  const registeredEventIds = registrations.map(r => String(r.eventId));

  document.getElementById('app').innerHTML = `
    <div class="dashboard">
      <header>
        <h2>Welcome, ${user.username} (${user.role})</h2>
        <button id="logoutBtn">Log out</button>
      </header>
      <nav>
        <a href="/dashboard" data-link>Home</a>
        ${user.role === 'admin' ? '<a href="/dashboard/events/create" data-link>Create Event</a>' : ''}
      </nav>
      <section>
        <h3>Events</h3>
        <div class="events-container">
          ${events
            .filter(ev => user.role !== 'visitor' || !registeredEventIds.includes(String(ev.id)))
            .map(ev =>
              `<div class="event-card">
                <h4>${ev.name}</h4>
                <p>Date: ${ev.date}</p>
                <p>Capacity: ${ev.capacity}</p>
                ${user.role === 'admin'
                  ? `<a href="/dashboard/events/edit?id=${ev.id}" data-link class="btn btn-secondary">Edit</a>
                     <button class="delete-event-btn btn btn-danger" data-eventid="${ev.id}">Delete</button>`
                  : `<button class="view-event-btn btn btn-info" data-eventid="${ev.id}">View details</button>`
                }
              </div>`
            ).join('')}
        </div>
        ${user.role === 'visitor' ? `
          <h4>My registrations</h4>
          <ul>
            ${registrations.map(r => {
              const ev = events.find(e => String(e.id) === String(r.eventId));
              return ev ? `<li>${ev.name} - ${ev.date} <button class="cancel-btn" data-regid="${r.id}">Cancel registration</button></li>` : '';
            }).join('')}
          </ul>
        ` : ''}
        <div id="eventDetail"></div>
      </section>
    </div>
  `;

  document.getElementById('logoutBtn').onclick = () => {
    clearSession();
    window.history.pushState({}, '', '/login');
    import('./Login.js').then(m => m.default());
  };

  // Eliminar evento (admin)
  document.querySelectorAll('.delete-event-btn').forEach(btn => {
    btn.onclick = async () => {
      const eventId = btn.getAttribute('data-eventid');
      await deleteEvent(eventId);
      showSuccess('Event deleted successfully');
      Dashboard();
    };
  });

  // Ver detalles de evento (visitante)
  document.querySelectorAll('.view-event-btn').forEach(btn => {
    btn.onclick = () => {
      const eventId = btn.getAttribute('data-eventid');
      window.history.pushState({}, '', `/dashboard/events/detail?id=${eventId}`);
      import('./EventDetail.js').then(m => m.default(eventId));
    };
  });

  // Registro en evento (desde lista)
  document.querySelectorAll('.register-btn').forEach(btn => {
    btn.onclick = async () => {
      const eventId = btn.getAttribute('data-eventid');
      const ev = events.find(e => String(e.id) === String(eventId));
      if (ev && ev.capacity <= 0) {
        showError('You cannot register, the event is full');
        return;
      }
      await registerToEvent({ userId: user.id, eventId });
      // Decrement capacity
      if (ev && ev.capacity > 0) {
        const newCapacity = ev.capacity - 1;
        await fetch(`http://localhost:3000/events/${ev.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ capacity: newCapacity })
        });
      }
      showSuccess('You have registered for the event');
      Dashboard();
    };
  });

  // Cancelar registro
  document.querySelectorAll('.cancel-btn').forEach(btn => {
    btn.onclick = async () => {
      const regId = btn.getAttribute('data-regid');
      // Obtener el evento relacionado
      const reg = registrations.find(r => String(r.id) === String(regId));
      const ev = events.find(e => String(e.id) === String(reg.eventId));
      if (ev) {
        const nuevaCapacidad = ev.capacity + 1;
        await fetch(`http://localhost:3000/events/${ev.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ capacity: nuevaCapacidad })
        });
      }
      await fetch(`http://localhost:3000/registrations/${regId}`, { method: 'DELETE' });
      showSuccess('Registration cancelled successfully');
      Dashboard();
    };
  });
}
