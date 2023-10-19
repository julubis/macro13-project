import {getActiveUser} from '../utils/auth.js';
import Calendar from '../utils/calendar.js';
import Progress from '../utils/progress.js';
let user;
let date;

const meal = {}
const activity = {}
const water = {}

const Plan = {
  async render() {
    user = getActiveUser()
    if (!user) {
      window.location.href = '/#/login';
      return '';
    }

    document.querySelector('link#css-page').href = "styles/pages/plan.css";
    let response = await fetch("../../views/plan.html");
    return await response.text();
  },
  async afterRender() {
    document.querySelectorAll('header nav li>a').forEach(el => el.classList.remove('active'));
    document.querySelector('header nav li>a.plan').classList.add('active');
    const mealCarbs = document.getElementById('carbs-ammount');
    const mealProtein = document.getElementById('protein-ammount');
    const mealFats = document.getElementById('fats-ammount');
    const mealProg = document.getElementById('progress-meal');
    const addMeal = document.getElementById('add-meal');
    const addMealForm = document.getElementById('add-meal-form');

    const activityCal = document.getElementById('cal-ammount');
    const activityTime = document.getElementById('time-ammount');
    const activityProg = document.getElementById('progress-activity');
    const addAct = document.getElementById('add-activity');
    const addActForm = document.getElementById('add-activity-form');
    
    const waterDrunk = document.getElementById('water-ammount');
    const waterProg = document.getElementById('progress-water');
    const addWater = document.getElementById('add-water');
    const addWaterForm = document.getElementById('add-water-form');

    const response = await fetch("../../../data/recipes.json");
    const recipes = await response.json();
    document.getElementById('meal-input').innerHTML = `
      ${recipes.map(food => `${
        `<option value="${food.id}">${food.name}</option>`
      }`).join('')}
    `

    const calendar = new Calendar(document.querySelector('.calendar'));
    date = date = `${calendar.date}/${calendar.month+1}/${calendar.year}`;
    
    Progress(mealProg, 80)
    Progress(activityProg, 35)
    Progress(waterProg, 74)

    calendar.change(() => {
      date = date = `${calendar.date}/${calendar.month+1}/${calendar.year}`;
      Progress(mealProg, 90)
      Progress(activityProg, 40)
      Progress(waterProg, 50)
    })

    addMeal.addEventListener('click', e => {
      addMealForm.parentElement.classList.remove('hidden')
    })
    addAct.addEventListener('click', e => {
      addActForm.parentElement.classList.remove('hidden')
    })
    addWater.addEventListener('click', e => {
      addWaterForm.parentElement.classList.remove('hidden')
    })

    addMealForm.addEventListener('submit', ev => {
      ev.preventDefault()
      const {food} = Object.fromEntries(new FormData(addMealForm))

    })
    addActForm.addEventListener('submit', ev => {
      ev.preventDefault()
      const {activity, time} = Object.fromEntries(new FormData(addActForm))
      
    })
    addWaterForm.addEventListener('submit', ev => {
      ev.preventDefault()
      const {water} = Object.fromEntries(new FormData(addWaterForm))
      
    })

    window.addEventListener('click', ev => {
      if (ev.target == addWaterForm.parentElement || ev.target == addActForm.parentElement || ev.target == addMealForm.parentElement) {
        addWaterForm.parentElement.classList.add('hidden')
        addActForm.parentElement.classList.add('hidden')
        addMealForm.parentElement.classList.add('hidden')
      }
    })




  }
}

export default Plan;