import {getActiveUser} from '../utils/auth.js';

const Landing = {
  async render() {
    if (getActiveUser()) {
      window.location.href = '/#/home'
      return ''
    }
    document.querySelector('link#css-page').href = "styles/pages/index.css";
    let response = await fetch("../../views/landing.html");
    return await response.text();
  },
  async afterRender() {
    document.querySelectorAll('header nav li>a').forEach(el => el.classList.remove('active'));
  }
}

export default Landing;