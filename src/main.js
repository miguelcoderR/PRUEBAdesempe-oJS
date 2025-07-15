import './style.css';
import { routerInit } from './Router.js';

// SPA: punto de entrada
if (!document.getElementById('app')) {
  const appDiv = document.createElement('div');
  appDiv.id = 'app';
  document.body.appendChild(appDiv);
}

routerInit();
