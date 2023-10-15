const Plan = {
  async render() {
    document.querySelector('link#css-page').href = "styles/pages/plan.css";
    let response = await fetch("../../views/plan.html");
    return await response.text();
  },
  async afterRender() {
    document.querySelectorAll('header nav li>a').forEach(el => el.classList.remove('active'));
    document.querySelector('header nav li>a.plan').classList.add('active')
  }
}

export default Plan;

/*
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class Calendar {
  constructor(element) {
    this.day;
    this.month;
    this.year;
    this.element = element;
  }
  nextMonth() {
    this.day = 1;
    if (this.month < 12) {
      this.month++;
    } else {
      this.month = 1;
      this.year++
    }
  }
  prevMonth() {
    if (this.month > 1) {
      this.month--;
    } else {
      this.month = 12;
      this.year--;
    }
  }

}

function createCalendar(year, month) {
  const date = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = date.getDay();

  console.log(daysInMonth, firstDay, date.toLocaleDateString('id-ID', {day: "2-digit", month: "2-digit", "year": "numeric"}));
}

// createCalendar(2023, 10);
const arr = [1,2,3,4,5,6,7,8,9]
arr.unshift(0,1,2,3,4)
console.log(arr)

*/