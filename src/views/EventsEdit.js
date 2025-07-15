// EventsEdit.js
import { updateEvent, getEvents } from '../api.js';
import { showSuccess, showError } from '../swal.js';

export default async function EventsEdit() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const events = await getEvents();
  const event = events.find(ev => ev.id == id);
  if (!event) {
    document.getElementById('app').innerHTML = '<p>Event not found</p>';
    return;
  }
  document.getElementById('app').innerHTML = `
    <form id="editEventForm" class="form">
      <h2>Edit Event</h2>
      <input type="text" name="name" value="${event.name}" required />
      <input type="date" name="date" value="${event.date}" required />
      <input type="number" name="capacity" value="${event.capacity}" required min="1" />
      <button type="submit">Save</button>
      <a href="/dashboard" data-link>Back</a>
      <div id="eventError" class="error"></div>
    </form>
  `;
  document.getElementById('editEventForm').onsubmit = async e => {
    e.preventDefault();
    const name = e.target.name.value;
    const date = e.target.date.value;
    const capacity = parseInt(e.target.capacity.value);
    try {
      await updateEvent(id, { name, date, capacity });
      showSuccess('Event updated successfully');
      window.history.pushState({}, '', '/dashboard');
      import('./Dashboard.js').then(m => m.default());
    } catch {
      showError('Error updating event');
      document.getElementById('eventError').textContent = 'Error updating event';
    }
  };
}
