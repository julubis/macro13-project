const Food = {
  async render() {
    document.querySelector('link#css-page').href = "styles/pages/food.css";
    let response = await fetch("../../views/food.html");
    return await response.text();
  },
  async afterRender() {
    document.querySelectorAll('header nav li>a').forEach(el => el.classList.remove('active'));
    document.querySelector('header nav li>a.food').classList.add('active')
  }
}

export default Food;