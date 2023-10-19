import {getActiveUser} from '../utils/auth.js';
import { totalCalorie } from '../utils/calories.js'
import { addWeight, getAllWeight, getWeekWeight, initAddWeight } from '../utils/weight.js'
import Calendar from '../utils/calendar.js';
import greeting from '../utils/greeting.js';
let user;
let chart;
let date;
let dateWeek;
let journalList;

function loadChart() {
  const data = getWeekWeight(dateWeek, user)
  chart.data.datasets[0].data = data;
  chart.update();
}

const Home = {
  async render() {
    user = getActiveUser()
    if (!user) {
      window.location.href = '/#/login';
      return '';
    }

    document.querySelector('link#css-page').href = "styles/pages/home.css";
    let response = await fetch("../../views/home.html");
    return await response.text();
  },
  async afterRender() {
    document.querySelectorAll('header nav li>a').forEach(el => el.classList.remove('active'));
    document.querySelector('header nav li>a.home').classList.add('active');

    document.getElementById('username').textContent = user.name;
    document.getElementById('greeting').textContent = greeting();
    journalList = document.getElementById('journal-list')
    
    initAddWeight(user);
    journalList.innerHTML = `
    ${getAllWeight(user).map(data => `
    <div class="card">
          <p>${data.weight} kg</p>
          <p>${data.date}</p>
        </div>
    `).join('')}
    `
    const calendar = new Calendar(document.querySelector('.calendar'));
    dateWeek = calendar.getDateInWeeks();
    date = `${calendar.date}/${calendar.month+1}/${calendar.year}`
    calendar.change(() => {
      date = `${calendar.date}/${calendar.month+1}/${calendar.year}`
      if (String(dateWeek) !== String(calendar.getDateInWeeks())) {
        dateWeek = calendar.getDateInWeeks();
        loadChart();
      }
      
    })

    const target = document.getElementById('target-goal');
    target.textContent = `${totalCalorie(user)} kcal`

    const stroke = document.getElementById('stroke-progress')
    let i = 0
    
    const ctx = document.getElementById('chart');
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
          label: 'Body Weight (Kg)',
          data: [],
          borderWidth: 2,
          borderColor: '#10b981',
          backgroundColor: '#ecfdf5',
          radius: 4,
          lineTension: 0.4
        }]
      },
      options: {
        plugins: {
          legend: {
              labels: {
                  font: {
                      size: 14,
                      family: "'Poppins', san-serif"
                  }
              }
          }
        },
        scales: {
          y: {
            ticks: {
              stepSize: 1
            },
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
    loadChart();


    const modal = document.querySelector('.modal');
    document.querySelector('.header-journal button').addEventListener('click', () => {
      modal.classList.remove('hidden')
    })
    window.addEventListener('click', ev => {
      if (ev.target == modal) {
        modal.classList.add('hidden')
      }
    })

    const addWeightForm = document.querySelector('form#add-weight-form')
    addWeightForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const {weight} = Object.fromEntries(new FormData(addWeightForm));
      addWeight(weight, date, user);
      modal.classList.add('hidden');
      loadChart();
      journalList.innerHTML = `
        ${getAllWeight(user).map(data => `
        <div class="card">
              <p>${data.weight} kg</p>
              <p>${data.date}</p>
            </div>
        `).join('')}`
    })
  }
}

export default Home;


/*

const ctx = document.getElementById('chart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [{
      label: 'Body Weight (Kg)',
      data: [68.4, 68.2, 67.8, 67.6, 67.6, 67.4],
      borderWidth: 2,
      borderColor: '#10b981',
      backgroundColor: '#ecfdf5',
      radius: 4,
      lineTension: 0.4
    }]
  },
  options: {
    plugins: {
      legend: {
          labels: {
              // This more specific font property overrides the global property
              font: {
                  size: 14,
                  family: "'Poppins', san-serif"
              }
          }
      }
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1
        },
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }
});



const calendar = document.querySelector('.calendar .date')
// calendar.innerHTML = ""

*/