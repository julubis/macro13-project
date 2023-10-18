import {getActiveUser} from '../utils/auth.js';
import Calendar from '../utils/calendar.js';
import greeting from '../utils/greeting.js';
let user

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
    document.querySelector('header nav li>a.home').classList.add('active')

    document.getElementById('username').textContent = user.name
    document.getElementById('greeting').textContent = greeting()

    const calendar = new Calendar(document.querySelector('.calendar'))

    const stroke = document.getElementById('stroke-progress')
    let i = 0
    // setInterval(() => {
    //   if (i == 100) {
    //     i = 0
    //   }
    //   stroke.style.strokeDashoffset = 439.6 * (100 - i)/100
    //   i++
    // }, 10)
    
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