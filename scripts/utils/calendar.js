const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
class Calendar {
  /**@param {HTMLElement} context  */
  constructor(context) {
    this.day;
    this.date;
    this.month;
    this.year;
    this.handler;
    this.context = context;
    this._init();
  }
  _init() {
    const now = new Date()
    this.date = now.getDate();
    this.month = now.getMonth();
    this.year = now.getFullYear();
    const prevBtn = this.context.querySelector('#prev')
    const nextBtn = this.context.querySelector('#next')
    prevBtn.addEventListener('click', ev => this._prev())
    nextBtn.addEventListener('click', ev => this._next())
    this.render();
  }
  _prev() {
    if (this.month === 0) {
      this.month = 11;
      this.year--;
      this.render();
      return;
    }
    this.month--;
    this.render();
  }
  _next() {
    if (this.month === 11) {
      this.month = 0
      this.year++;
      this.render();
      return;
    }
    this.month++;
    this.render();
  }
  addEvent() {
    const buttons = this.context.querySelectorAll('button.date-btn')
    buttons.forEach(btn => {
      btn.classList.remove('active')
      btn.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'))
        btn.classList.add('active');
      })
    })
  }
  render() {
    this.context.querySelector('.header p').textContent = `${months[this.month]} ${this.year}`;
    const dateElement = this.context.querySelector('.calendar .date');
    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    const firstDay = new Date(this.year, this.month, 1).getDay();
    const today = new Date().setHours(0, 0, 0, 0);
    let dateString = ''
    for (let i = 0; i <= daysInMonth + firstDay; i++) {
      if (i - firstDay >= 0 && i - firstDay < daysInMonth) {
        dateString += `<button class="date-btn active ${today === new Date(`${this.year}-${this.month+1}-${i-firstDay + 1}`).setHours(0,0,0,0) ? ' today': ''}" date-number="${i-firstDay + 1}" ${today < new Date(`${this.year}-${this.month+1}-${i-firstDay + 1}`).setHours(0,0,0,0) ? 'disabled': ''}>${i-firstDay + 1}</button>`;
        continue;
      }
      dateString += '<span></span>';
    }
    dateElement.innerHTML = dateString;
    this.addEvent();
  }
  
  start() {
    console.log(this.day, this.month, this.year)
  }
  change(handler) {
    this.handler = handler;
  }
}

export default Calendar;

// const date = new Date(2023, 9, 1)
// const daysInMonth = new Date(2023, 9, 0).getDate();
// const test = Array.from({length: 3}, (_, index) => 31 - index)
// console.log(date.getDay())

// const calendar = new Calendar(9);
// calendar.coba()
// calendar.change(() => {
//   calendar.start()
// })