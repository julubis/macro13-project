const News = {
  async render() {
    document.querySelector('link#css-page').href = "styles/pages/news.css";
    let response = await fetch("../../views/news.html");
    return await response.text();
  },
  async afterRender() {
    document.querySelectorAll('header nav li>a').forEach(el => el.classList.remove('active'));
    document.querySelector('header nav li>a.news').classList.add('active')

    const response = await fetch('https://newsapi.org/v2/everything?q=diet&apiKey=b247546d3f79485291c6f308b5a6e828');
    let newsArray = await response.json();
    if (!newsArray.status === 'ok') {
      return
    }
    newsArray = newsArray.articles

    const newsList = document.querySelector('.card-container')
    newsList.innerHTML = `
    ${newsArray.map(news => `
    <a class="card" href="${news.url}" target="_blank">
      <div class="header">
        <img src="${news.urlToImage}" alt="News Image">
      </div>
      <div class="body">
        <p>${news.title}</p>
      </div>
    </a>
    `).join('')}`;

    const key = document.getElementById('input-search')
    key.addEventListener('input', () => {
      setTimeout(() => {
        newsList.innerHTML = `
          ${newsArray
            .filter(news => news.title.toLowerCase().includes(key.value.trim().toLowerCase()))
            .map(news => `
          <a class="card" href="${news.url}" target="_blank">
            <div class="header">
              <img src="${news.urlToImage}" alt="News Image">
            </div>
            <div class="body">
              <p>${news.title}</p>
            </div>
          </a>
          `).join('')}`;
      }, 500)
    })
  }
}

export default News;