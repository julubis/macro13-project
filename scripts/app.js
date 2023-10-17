import UrlParser from './routes/url-parser.js';
import routes from './routes/routes.js';
import { getActiveUser } from './utils/auth.js';
import { loadPhoto } from './utils/user.js';

function drawerInitiator(url) {
  const navbarNav = document.querySelector('header>nav ul')
  const navbarAction = document.querySelector('header>nav .extra')
  if (url === '/login' || url === '/register') {
    navbarNav.classList.add('hidden')
    navbarAction.classList.add('hidden')
  } else {
    navbarNav.classList.remove('hidden')
    navbarAction.classList.remove('hidden')
  }
  
  if (getActiveUser()) {
    navbarAction.innerHTML = `<a href="/#/profile"><img src="assets/male.png"></img></a>`
    loadPhoto(navbarAction.querySelector('a>img'))
  } else {
    navbarAction.innerHTML = `<a href="/#/login" class="btn btn-outline">Login</a>
    <a href="/#/register" class="btn">Get Started</a>`;
  }
}

class App {
  /** @param {HTMLElement} content */
  constructor(content) {
    this.content = content;
  }
  async renderPage() {
    const url = UrlParser.parseUrlWithCombiner();
    drawerInitiator(url);
    const page = routes[url];
    this.content.innerHTML = '';
    this.content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;