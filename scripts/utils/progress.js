/**@param {HTMLElement} ctx */
const Progress = (ctx, percent) => {
  const progress = ctx.querySelector('svg .run');
  const text = ctx.querySelector('p');
  if (percent > 100) {
    percent = 100;
  }
  let i = 0;

  progress.style.strokeDashoffset = '439.6px';
  const si = setInterval(() => {
    progress.style.strokeDashoffset = `${439.6 * ((100 - i)/100)}px`;
    text.textContent = `${i}%`;
    i++;
    if (i > percent) {
      clearInterval(si);
    }
  }, 10)

}

export default Progress;