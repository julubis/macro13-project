import App from "./scripts/app.js";

window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const app = new App(root);
  app.renderPage()
});

window.addEventListener('hashchange', () => {
  const root = document.getElementById('root');
  const app = new App(root);
  app.renderPage()
});