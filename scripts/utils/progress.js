class Progress {
  constructor(context, radius) {
    this.percent = 0;
    this.context = context;
    this.radius = radius
  }
  _init() {
    this.context.innerHTML = `

    `
  }
  _add(step) {
    this.percent++;
    if(this.percent <= this.percent) {
      setTimeout(this._add(step), 10);
    }
  }
  _render() {
    
  }
  show(percent) {
    this.percent = 0
    this.percent++
  }
}