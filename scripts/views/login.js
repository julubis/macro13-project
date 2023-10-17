import {login, getActiveUser} from '../utils/auth.js';

const Login = {
  async render() {
    if (getActiveUser()) {
      window.location.href = '/#/home';
      return '';
    }

    document.querySelector('link#css-page').href = "styles/pages/login.css";
    let response = await fetch("../../views/login.html");
    return await response.text();
  },
  async afterRender() {
    const form = document.querySelector('form')
    form.addEventListener('submit', (ev) => {
      ev.preventDefault()
      const formData = new FormData(form);
      const { email, password } = Object.fromEntries(formData);
      try {
        login(email, password);
      } catch (err) {
        alert(err);
      }
    })
  }
}

export default Login;