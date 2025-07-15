// NotFound.js
export default function NotFound() {
  document.getElementById('app').innerHTML = `
    <div class="not-found">
      <h2>Page not found</h2>
      <a href="/login" data-link>Go to Login</a>
    </div>
  `;
}
