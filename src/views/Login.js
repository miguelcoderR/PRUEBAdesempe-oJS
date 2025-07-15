// Login.js
import { login } from '../api.js';
import { saveSession } from '../auth.js';
import { showSuccess, showError } from '../swal.js';

export default function Login() {
  document.getElementById('app').innerHTML = `
    <form id="loginForm" class="form">
      <h2>Sign In</h2>
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
      <p>Don't have an account? <a href="/register" data-link>Register</a></p>
      <div id="loginError" class="error"></div>
    </form>
  `;
  document.getElementById('loginForm').onsubmit = async e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const user = await login(username, password);
    if (user) {
      saveSession(user);
      showSuccess('Logged in successfully');
      window.history.pushState({}, '', '/dashboard');
      import('./Dashboard.js').then(m => m.default());
    } else {
      showError('Incorrect credentials');
      document.getElementById('loginError').textContent = 'Incorrect credentials';
    }
  };
}
