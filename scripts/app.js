import UrlParser from './routes/url-parser.js';
import routes from './routes/routes.js';

function drawerInitiator(url) {
  const navbar = document.querySelector('header>nav')
  if (url === '/login' || url === '/register') {
    navbar.querySelector('ul').classList.add('hidden')
    navbar.querySelector('.extra').classList.add('hidden')
  } else {
    navbar.querySelector('ul').classList.remove('hidden')
    navbar.querySelector('.extra').classList.remove('hidden')
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