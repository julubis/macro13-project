const Login = {
  async render() {
    document.querySelector('link#css-page').href = "styles/pages/login.css";
    let response = await fetch("../../views/login.html");
    return await response.text();
  },
  async afterRender() {
    const form = document.querySelector('form')
    form.addEventListener('submit', (ev) => {
      ev.preventDefault()
    })
  }
}

export default Login;