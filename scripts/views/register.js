const Register = {
  async render() {
    document.querySelector('link#css-page').href = "styles/pages/register.css";
    let response = await fetch("../../views/register.html");
    return await response.text();
  },
  async afterRender() {
    const form = document.querySelector('form')
    form.addEventListener('submit', (ev) => {
      ev.preventDefault()
    })
  }
}

export default Register;