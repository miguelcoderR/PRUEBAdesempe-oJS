// Register.js
import { register } from '../api.js';
import { showSuccess, showError } from '../swal.js';

export default function Register() {
  document.getElementById('app').innerHTML = `
    <form id="registerForm" class="form">
      <h2>Register</h2>
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <select name="role" required>
        <option value="visitor">Visitor</option>
      </select>
      <button type="submit">Register</button>
      <p>Already have an account? <a href="/login" data-link>Sign In</a></p>
      <div id="registerError" class="error"></div>
    </form>
  `;
  document.getElementById('registerForm').onsubmit = async e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const role = e.target.role.value;
    try {
      await register({ username, password, role });
      showSuccess('User registered successfully');
      window.history.pushState({}, '', '/login');
      import('./Login.js').then(m => m.default());
    } catch {
      showError('Error registering user');
      document.getElementById('registerError').textContent = 'Error registering user';
    }
  };
}
