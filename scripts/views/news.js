const News = {
  async render() {
    document.querySelector('link#css-page').href = "styles/pages/news.css";
    let response = await fetch("../../views/news.html");
    return await response.text();
  },
  async afterRender() {
    document.querySelectorAll('header nav li>a').forEach(el => el.classList.remove('active'));
    document.querySelector('header nav li>a.news').classList.add('active')
  }
}

export default News;