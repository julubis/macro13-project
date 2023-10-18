import UrlParser from '../routes/url-parser.js'

const Detail = {
  async render() {
    document.querySelector('link#css-page').href = "styles/pages/detail.css";
    let response = await fetch("../../views/detail.html");
    return await response.text();
  },
  async afterRender() {
    document.querySelectorAll('header nav li>a').forEach(el => el.classList.remove('active'));
    document.querySelector('header nav li>a.food').classList.add('active')
    
    const url = UrlParser.parseUrlWithoutCombiner()
    console.log(url.id)
    const ingred = document.getElementById('food-ingred')

    const response = await fetch("../../../data/recipes.json");
    const recipes = await response.json();
    
    const {name, image, description, serving, time, direction} = recipes.filter(r => r.id === +url.id)[0]
    document.getElementById('food-img').src = image;
    document.getElementById('food-name').textContent = name;
    document.getElementById('food-desc').textContent = description;
    document.getElementById('food-serv').textContent = `${serving} serving`;
    document.getElementById('food-time').textContent = `${time} minutes`;
    document.getElementById('food-direct').innerHTML = `
    ${direction.map(direct => `<li>${direct}</li>`).join('')}
    `
  }
}

export default Detail;