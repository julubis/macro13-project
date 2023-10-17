import { register, checkEmailIsExist, getActiveUser } from '../utils/auth.js';

let page;
let ilustration;
const user = {
  name: '',
  email: '',
  password: '',
  gender: '',
  age: 25,
  height: 160,
  weight: 55,
  activityLevel: 0
}
function initPage(element) {
  const page0 = `<div id="acc-page">
    <button id="btn-back" type="button" class="hidden">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>        
    </button>
    <h2 class="text-medium text-3">Welcome</h2>
    <p class="text-normal text-5">Please enter your details to register here!</p>
    <div class="form-control">
      <label for="email-input" class="text-medium text-5">Name</label>
      <div class="relative">
        <i class="fa fa-user"></i>
        <input type="text" name="name" id="name-input" value="${user.name}" required>
      </div>
    </div>
    <div class="form-control">
      <label for="email-input" class="text-medium text-5">Email</label>
      <div class="relative">
        <i class="fa fa-envelope"></i>
        <input type="email" name="email" id="email-input" value="${user.email}" required>
      </div>
    </div>
    <div class="form-control">
      <label for="password-input" class="text-medium text-5">Password</label>
      <div class="relative">
        <i class="fa fa-lock"></i>
        <input type="password" name="password" id="password-input" value="${user.password}" required>
      </div>
    </div>
    <div class="form-control-2">
      <input type="checkbox" value="" id="remember">
      <label for="remember" class="text-medium text-6">Remember me</label>
    </div>
    <button type="submit" class="btn text-medium">Sign Up</button>
    <p class="small text-normal text-6">Do you have an account? <a href="/#/login">Sign In</a></p>
  </div>`;
  const page1 = `<div id="gender-page">
    <button id="btn-back" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>        
    </button>
    <h2 class="text-medium text-3">What's your gender?</h2>
    <p class="text-normal text-5">This is used to set up recommendation just for you</p>
    <div class="wrapper">
      <input type="radio" name="gender" id="male" value="male" class="hidden" ${user.gender === 'male' ? 'checked': ''} required>
      <label class="option" for="male">
        <img src="../assets/male.png" alt="male">
        <p>Male</p>
      </label>
      <input type="radio" name="gender" id="female" value="female" class="hidden" ${user.gender === 'female' ? 'checked': ''} required>
      <label class="option" for="female">
        <img src="../assets/female.png" alt="female">
        <p>Female</p>
      </label>
    </div>
    <button type="submit" class="btn text-medium">Next</button>
  </div>`;
  const page2 = `<div id="age-page">
    <button id="btn-back" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>        
    </button>
    <h2 class="text-medium text-3">How old are you?</h2>
    <p class="text-normal text-5">This is used to set up recommendation just for you</p>
    <div class="form-control">
      <input type="number" name="age" id="age-input" placeholder="25" max="80" value="${user.age}" required>
    </div>
    <button type="submit" class="btn text-medium">Next</button>
  </div>`;
  const page3 = `<div id="tall-page">
    <button id="btn-back" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>        
    </button>
    <h2 class="text-medium text-3">How tall are you?</h2>
    <p class="text-normal text-5">This is used to set up recommendation just for you</p>
    <div class="form-control">
      <input type="number" name="height" id="height-input" placeholder="160" value="${user.height}" required>
      <p>cm</p>
    </div>
    <button type="submit" class="btn text-medium">Next</button>
  </div>`;
  const page4 = `<div id="weight-page">
    <button id="btn-back" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>        
    </button>
    <h2 class="text-medium text-3">What's your current weight?</h2>
    <p class="text-normal text-5">This is used to set up recommendation just for you</p>
    <div class="form-control">
      <input type="number" name="weight" id="weight-input" placeholder="55" value="${user.weight}" required>
      <p>kg</p>
    </div>
    <button type="submit" class="btn text-medium">Next</button>
  </div>`;
  const page5 = `<div id="activity-page">
    <button id="btn-back" type="button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>        
    </button>
    <h2 class="text-medium text-3">What's your activity level?</h2>
    <p class="text-normal text-5">This is used to set up recommendation just for you</p>
    <input type="radio" name="activityLevel" id="sedentary" value="1" class="hidden" ${user.activityLevel === 1 ? 'checked': ''} required>
    <label class="option" for="sedentary">
      <p>Sedentary</p>
    </label>
    <input type="radio" name="activityLevel" id="lightly" value="2" class="hidden" ${user.activityLevel === 2 ? 'checked': ''} required>
    <label class="option" for="lightly">
      <p>Lightly active</p>
    </label>
    <input type="radio" name="activityLevel" id="moderately" value="3" class="hidden" ${user.activityLevel === 3 ? 'checked': ''} required>
    <label class="option" for="moderately">
      <p>Moderately active</p>
    </label>
    <input type="radio" name="activityLevel" id="very" value="4" class="hidden" ${user.activityLevel === 4 ? 'checked': ''} required>
    <label class="option" for="very">
      <p>Very active</p>
    </label>
    <input type="radio" name="activityLevel" id="extra" value="5" class="hidden" ${user.activityLevel === 5 ? 'checked': ''} required>
    <label class="option" for="extra">
      <p>Extra active</p>
    </label>
    <button type="submit" class="btn text-medium">Finish</button>
  </div>`;
  if (page === 0) {
    ilustration.src = 'assets/ilustration-1.svg'
    element.innerHTML = page0;
  } else if (page === 1) {
    ilustration.src = 'assets/ilustration-2.svg'
    element.innerHTML = page1;
  } else if (page === 2) {
    ilustration.src = 'assets/ilustration-4.svg'
    element.innerHTML = page2;
  } else if (page === 3) {
    ilustration.src = 'assets/ilustration-3.svg'
    element.innerHTML = page3;
  } else if (page === 4) {
    ilustration.src = 'assets/ilustration-1.svg'
    element.innerHTML = page4;
  } else if (page === 5) {
    ilustration.src = 'assets/ilustration-5.svg'
    element.innerHTML = page5;
  }
  document.getElementById('btn-back').addEventListener('click', ev => {
    ev.preventDefault()
    page--;
    initPage(element)
  })
}

const Register = {
  async render() {
    if (getActiveUser()) {
      window.location.href = '/#/home';
      return '';
    } 

    document.querySelector('link#css-page').href = "styles/pages/register.css";
    let response = await fetch("../../views/register.html");
    return await response.text();
  },
  async afterRender() {
    page = 0
    ilustration = document.getElementById("ilustration")
    const form = document.querySelector('form')
    initPage(form)
    
    form.addEventListener('submit', (ev) => {
      ev.preventDefault()
      const formData = new FormData(form);
      const { name, email, password, gender, weight, height, age, activityLevel } = Object.fromEntries(formData);
      if (page === 0) {
        user.name = name;
        user.email = email;
        user.password = password;
        try {
          checkEmailIsExist(email);
        } catch (err) {
          alert(err);
          return;
        }
      } else if (page === 1) {
        user.gender = gender;
      } else if (page === 2) {
        user.age = age;
      } else if (page === 3) {
        user.height = height;
      } else if (page === 4) {
        user.weight = weight;
      } else if (page === 5) {
        user.activityLevel = +activityLevel;
        register(user);
        window.location.href = '/#/login'
        return
      }

      page++;
      initPage(form);
    })
  }
}

export default Register;