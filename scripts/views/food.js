const filter = {
  key: '',
  category: 'all',
}

function cardTemplate({id, name, calorie, time, image}) {
  return `<a class="card" href="/#/food/${id}">
  <div class="header">
    <img src="${image}" alt="">
  </div>
  <div class="body">
    <p>${name}</p>
    <div class="desc">
      <div class="calorie">
        <p>${calorie} kcal</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd"/>
        </svg>  
      </div>
      <div class="time">                
        <p>${time} min</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
  </div>
</a>`
}

function loadFood(list, element) {
  element.innerHTML = `${
    list
      .filter(recipe => recipe.name.toLowerCase().includes(filter.key) && (recipe.category === filter.category || filter.category === 'all'))
      .map(recipe => cardTemplate(recipe))
      .join('')
  }`;
}

const Food = {
  async render() {
    document.querySelector('link#css-page').href = "styles/pages/food.css";
    let response = await fetch("../../views/food.html");
    return await response.text();
  },
  async afterRender() {
    document.querySelectorAll('header nav li>a').forEach(el => el.classList.remove('active'));
    document.querySelector('header nav li>a.food').classList.add('active')

    const inputSearch = document.getElementById('input-search')
    const cardList = document.querySelector('.card-container');
    const response = await fetch("../../../data/recipes.json");
    const recipes = await response.json();

    cardList.innerHTML = `${recipes.map(recipe => cardTemplate(recipe)).join('')}`;

    inputSearch.addEventListener('input', () => {
      setTimeout(() => {
        filter.key = inputSearch.value.trim().toLowerCase()
        loadFood(recipes, cardList);
      }, 500)
    })

    const form = document.getElementById('form-filter')
    form.addEventListener('submit', ev => {
      ev.preventDefault()
      const formData = new FormData(form)
      const {category} = Object.fromEntries(formData);
      
      filter.category = category
      loadFood(recipes, cardList);
    })

    

    

    
  //   document.querySelector('.card-container').innerHTML = `<a class="card" href="/#/food/1">
  //   <div class="header">
  //     <img src="assets/image 6.png" alt="">
  //   </div>
  //   <div class="body">
  //     <p>Banana muffin oat</p>
  //     <div class="desc">
  //       <div class="calorie">
  //         <p>100 kcal</p>
  //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  //           <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd"/>
  //         </svg>  
  //       </div>
  //       <div class="time">                
  //         <p>10 min</p>
  //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
  //           <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd"/>
  //         </svg>
  //       </div>
  //     </div>
  //   </div>
  // </a>`.repeat(6)
  }
}

export default Food;