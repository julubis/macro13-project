if (!localStorage.get('foods')) {
  localStorage.setItem('foods', '[]')
}
if (!localStorage.get('waters')) {
  localStorage.setItem('waters', '[]')
}
if (!localStorage.get('activities')) {
  localStorage.setItem('activities', '[]')
}

const addFood = (id, date, {email}) = {

}

const addWater = (ammount, date, {email}) = {

}

const addActivity = (id, duration, date, {email}) = {

}

const getCurrentFood = (date, {email}) => {

}

const getCurrentActivity = (date, {email}) => {

}

const getCurrentWater = (date, {email}) => {

}

export {addActivity, addFood, addWater, getCurrentActivity, getCurrentFood, getCurrentWater}