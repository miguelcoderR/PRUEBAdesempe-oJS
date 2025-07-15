// EventsCreate.js
import { createEvent } from '../api.js';
import { showSuccess, showError } from '../swal.js';

export default function EventsCreate() {
  document.getElementById('app').innerHTML = `
    <form id="createEventForm" class="form">
      <h2>Create Event</h2>
      <input type="text" name="name" placeholder="Event name" required />
      <input type="date" name="date" required />
      <input type="number" name="capacity" placeholder="Capacity" required min="1" />
      <button type="submit">Create</button>
      <a href="/dashboard" data-link>Back</a>
      <div id="eventError" class="error"></div>
    </form>
  `;
  document.getElementById('createEventForm').onsubmit = async e => {
    e.preventDefault();
    const name = e.target.name.value;
    const date = e.target.date.value;
    const capacity = parseInt(e.target.capacity.value);
    try {
      await createEvent({ name, date, capacity });
      showSuccess('Event created successfully');
      window.history.pushState({}, '', '/dashboard');
      import('./Dashboard.js').then(m => m.default());
    } catch {
      showError('Error creating event');
      document.getElementById('eventError').textContent = 'Error creating event';
    }
  };
}
