// EventDetail.js
import { getEvents, registerToEvent } from '../api.js';
import { getSession } from '../auth.js';
import { showSuccess, showError } from '../swal.js';

export default async function EventDetail(eventId) {
  const user = getSession();
  const events = await getEvents();
  const ev = events.find(e => String(e.id) === String(eventId));
  if (!ev) {
    document.getElementById('app').innerHTML = '<p>Event not found</p>';
    return;
  }
  document.getElementById('app').innerHTML = `
    <div class="event-details-section">
      <h2>${ev.name}</h2>
      <p>Date: ${ev.date}</p>
      <p>Capacity: ${ev.capacity}</p>
      ${user.role === 'visitor' ? `<button class="register-btn" data-eventid="${ev.id}">Register</button>` : ''}
      <button class="btn btn-secondary" id="backToDashboard">Back</button>
    </div>
  `;
  document.getElementById('backToDashboard').onclick = () => {
    window.history.pushState({}, '', '/dashboard');
    import('./Dashboard.js').then(m => m.default());
  };
  if (user.role === 'visitor') {
    document.querySelector('.register-btn').onclick = async () => {
      if (ev.capacity <= 0) {
        showError('You cannot register, the event is full');
        return;
      }
      await registerToEvent({ userId: user.id, eventId: ev.id });
      // Decrement capacity
      if (ev.capacity > 0) {
        const newCapacity = ev.capacity - 1;
        await fetch(`http://localhost:3000/events/${ev.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ capacity: newCapacity })
        });
      }
      showSuccess('You have registered for the event');
      window.history.pushState({}, '', '/dashboard');
      import('./Dashboard.js').then(m => m.default());
    };
  }
  
}
