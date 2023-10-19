if (!localStorage.get('foods')) {
  localStorage.setItem('foods', '[]')
}
if (!localStorage.get('waters')) {
  localStorage.setItem('waters', '[]')
}
if (!localStorage.get('activities')) {
  localStorage.setItem('activities', '[]')
}

const addFood = async(id, date, {email}) => {
  let foods = JSON.parse(localStorage('foods'))
  const response = await fetch("../../../data/recipes.json");
  let recipes = await response.json();
  recipes = recipes.filter(food => food.id === id)[0]
  foods.push({email, })
}

const addWater = (ammount, date, {email}) => {

}

const addActivity = (id, duration, date, {email}) => {

}

const getCurrentFood = (date, {email}) => {

}

const getCurrentActivity = (date, {email}) => {

}

const getCurrentWater = (date, {email}) => {

}

export {addActivity, addFood, addWater, getCurrentActivity, getCurrentFood, getCurrentWater}