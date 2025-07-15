// Router.js
// Enrutador SPA con protección de rutas
import { isAuthenticated, getUserRole } from './auth.js';

const routes = [
  { path: '/', view: 'Root' },
  { path: '/login', view: 'Login' },
  { path: '/register', view: 'Register' },
  { path: '/dashboard', view: 'Dashboard', protected: true },
  { path: '/dashboard/events/create', view: 'EventsCreate', protected: true, role: 'admin' },
  { path: '/dashboard/events/edit', view: 'EventsEdit', protected: true, role: 'admin' },
  { path: '/dashboard/events/detail', view: 'EventDetail', protected: true, role: 'visitor' },
  { path: '*', view: 'NotFound' }
];

function navigate(path) {
  // Soporte para rutas con parámetros (ej: /dashboard/events/edit?id=123)
  const cleanPath = path.split('?')[0];
  const route = routes.find(r => r.path === cleanPath) || routes.find(r => r.path === '*');

  // Redirección desde root
  if (cleanPath === '/') {
    if (isAuthenticated()) {
      window.history.replaceState({}, '', '/dashboard');
      renderView('Dashboard');
    } else {
      window.history.replaceState({}, '', '/login');
      renderView('Login');
    }
    return;
  }

  // Protección de rutas
  if (route.protected && !isAuthenticated()) {
    renderView('NotFound');
    window.history.replaceState({}, '', '/not-found');
    return;
  }
  if ((cleanPath === '/login' || cleanPath === '/register') && isAuthenticated()) {
    window.history.replaceState({}, '', '/dashboard');
    renderView('Dashboard');
    return;
  }
  if (route.role && getUserRole() !== route.role) {
    renderView('NotFound');
    window.history.replaceState({}, '', '/not-found');
    return;
  }
  // Si es vista de detalle de evento, pasar el id
  if (cleanPath === '/dashboard/events/detail') {
    const params = new URLSearchParams(path.split('?')[1]);
    const eventId = params.get('id');
    import('./views/EventDetail.js').then(module => module.default(eventId));
    return;
  }
  renderView(route.view);
}

function renderView(viewName) {
  import(`./views/${viewName}.js`).then(module => {
    module.default();
  });
}

window.onpopstate = () => navigate(window.location.pathname);

export function routerInit() {
  document.body.addEventListener('click', e => {
    const link = e.target.closest('a[data-link]');
    if (link && link.getAttribute('href').startsWith('/')) {
      e.preventDefault();
      const path = link.getAttribute('href');
      window.history.pushState({}, '', path);
      navigate(path);
    }
  });
  navigate(window.location.pathname);
}
