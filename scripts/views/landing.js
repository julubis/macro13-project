const Landing = {
  async render() {
    document.querySelector('link#css-page').href = "styles/pages/index.css";
    let response = await fetch("../../views/landing.html");
    return await response.text();
  },
  async afterRender() {

  }
}

export default Landing;