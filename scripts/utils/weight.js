if (!localStorage.getItem('weights')) {
  localStorage.setItem('weights', '[]');
};

const addWeight = (weight, date, {email}) => {
  let change;
  const weights = JSON.parse(localStorage.getItem('weights'));
  for (let i = 0; i < weights.length; i++) {
    if (weights[i].email === email && weights[i].date === date) {
      weights[i] = {email, date, weight}
      change = true
    }
  }
  if (!change) {
    weights.push({email, date, weight})
  }
  localStorage.setItem('weights', JSON.stringify(weights))
}

const initAddWeight = ({email, weight}) => {
  const now = new Date().toLocaleDateString('id-ID');
  const weights = JSON.parse(localStorage.getItem('weights'));
  const exist = weights.filter(data => data.email === email && data.date === now);
  if (!exist.length) {
    weights.push({email, weight: Number(weight), date: now});
    localStorage.setItem('weights', JSON.stringify(weights));
  }
}

const getAllWeight = ({email}) => {
  let weights = JSON.parse(localStorage.getItem('weights'));
  weights = weights.filter(data => data.email === email);
  return weights;
} 

const getWeekWeight = (dates, {email}) => {
  const weekWeight = []
  const weights = JSON.parse(localStorage.getItem('weights'));
  for (const date of dates) {
    const w = weights.filter(data => data.date === date && data.email === email)
    if (!w[0]) {
      weekWeight.push(null);
      continue;
    }
    weekWeight.push(w[0].weight);
  }
  return weekWeight;
}

export {initAddWeight, addWeight, getWeekWeight, getAllWeight}