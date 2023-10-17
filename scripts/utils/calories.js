/*
- Untuk laki-laki: 66,5 + (13,75 x berat badan dalam kilogram) + (5,003 x tinggi badan dalam cm) – (6,75 x usia)
- Untuk wanita: 655,1 + (9,563 x berat badan dalam kilogram) + (1,850 x tinggi badan dalam cm) – (4,676 x usia)
- Hasil perhitungan BMR kemudian dikalikan dengan angka aktivitas harian rata-rata. Ini berkisar antara 1,2 – 1,9 tergantung dari seberapa tinggi aktivitas harian seseorang. Semakin jarang seseorang melakukan aktivitas fisik, semakin rendah pula angka aktivitas hariannya.
*/

/*
- Sedentary: If you get minimal or no exercise, multiply your BMR by 1.2.
- Lightly active: If you exercise lightly one to three days a week, multiply your BMR by 1.375.
- Moderately active: If you exercise moderately three to five days a week, multiply your BMR by 1.55.
- Very active: If you engage in hard exercise six to seven days a week, multiply your BMR by 1.725.
- Extra active: If you engage in very hard exercise six to seven days a week or have a physical job, multiply your BMR by 1.9.
*/

/*
To lose weight
To lose weight, you must be in a calorie deficit. This means you’re either eating fewer calories than your body needs, burning additional calories, or a combination of both.
For sustainable weight loss, an ideal calorie deficit will be around 10–20% fewer calories than your total daily energy expenditure (TDEE).

To maintain weight
If you’re looking to maintain your weight, you’ll want to ensure your calorie intake matches your calorie expenditure.

To gain weight
If you want to gain weight, you need to be in a calorie surplus. This means that you’re either eating more calories than your body needs, expending fewer calories, or a combination of both. As in the case of a calorie deficit, you’ll want to do this slowly to ensure it’s healthy and sustainable. A mild calorie surplus of around 10–20% will allow for slow, gradual weight gain.
*/

const countBMI = ({weight, height}) => {
  const bmi = weight / (height / 100) ** 2
  return bmi.toFixed(1)
}

const totalCalorie = ({weight, height, age, gender, activityLevel}) => {
  let total;
  if (gender === 'male') {
    total = 66.5 + 13.75 * weight + 5.003 * height - 6.75 * age 
  } else {
    total = 65.51 + 9.563 * weight + 1.85 * height - 4.676 * age 
  }

  switch (activityLevel) {
    case 1:
      total *= 1.2;
      break;
    case 2:
      total *= 1.375;
      break;
    case 3:
      total *= 1.55;
      break;
    case 4:
      total *= 1.725;
      break;
    case 5:
      total *= 1.9;
      break;
  }

  return Math.round(total);
}

// < 18.5
// 18.5 - 22.9
// 23 - 29.9
// > 30

const totalCalorieToBurn = (totalCalorie, scoreBMI) => {
  if (scoreBMI < 18.5) {
    totalCalorie -= totalCalorie * 0.2;
  } else if (scoreBMI < 21) {
    totalCalorie -= totalCalorie * 0.1;
  } else if (scoreBMI > 22.9 && scoreBMI <= 29.9) {
    totalCalorie += totalCalorie * 0.1;
  } else {
    totalCalorie += totalCalorie * 0.2;
  }
  return totalCalorie;
}