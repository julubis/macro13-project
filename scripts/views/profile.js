import {checkEmailIsExist, getActiveUser, logout} from '../utils/auth.js';
import { loadPhoto, updatePersonalInfo, updatePassword } from '../utils/user.js';
let user;

function initForm(personForm, passForm) {
  const personalInfo = `
  <div class="form-control">
    <label for="name-value">Name</label>
    <input type="text" name="name" id="name-value" value="${user.name}" required>
  </div>
  <div class="form-control">
    <label for="email-value">Email</label>
    <input type="email" name="email" id="email-value" value="${user.email}" required>
  </div>
  <div class="form-control">
    <label for="weight-value">Weight (kg)</label>
    <input type="number" name="weight" id="weight-value" value="${user.weight}" required>
  </div>
  <div class="form-control">
    <label for="height-value">Height (cm)</label>
    <input type="number" name="height" id="height-value" step="0.1" value="${user.height}" required>
  </div>
  <div class="form-control">
    <label for="age-value">Age</label>
    <input type="number" name="age" id="age-value" step="1" value="${user.age}" required>
  </div>
  <div class="form-control">
    <label for="gender-value">Gender</label>
    <select name="gender" id="gender-value" required>
      <option value="male" ${user.gender === 'male' ? 'selected' : ''}>Male</option>
      <option value="female" ${user.gender === 'female' ? 'selected' : ''}>Female</option>
    </select>
  </div>
  <div class="form-control">
    <label for="activity-value">Activity Level</label>
    <select name="activityLevel" id="activity-value" required>
      <option value="1" ${user.activityLevel === 1 ? 'selected' : ''}>Sendetary</option>
      <option value="2" ${user.activityLevel === 2 ? 'selected' : ''}>Lightly active</option>
      <option value="3" ${user.activityLevel === 3 ? 'selected' : ''}>Moderately active</option>
      <option value="4" ${user.activityLevel === 4 ? 'selected' : ''}>Very active</option>
      <option value="5" ${user.activityLevel === 5 ? 'selected' : ''}>Extra active</option>
    </select>
  </div>
  `;

  const changePassword = `
  <div class="form-control">
    <label for="currentPassword">Current Password</label>
    <input type="password" name="currentPassword" id="currentPassword" required>
  </div>
  <div class="form-control">
    <label for="newPassword">New Password</label>
    <input type="password" name="newPassword" id="newPassword" required>
  </div>
  <div class="form-control">
    <label for="confirmPassword">Confirm Password</label>
    <input type="password" name="confirmPassword" id="confirmPassword" required>
  </div>
  `;
  personForm.innerHTML = personalInfo;
  passForm.innerHTML = changePassword
}

const Profile = {
  async render() {
    user = getActiveUser()
    if (!user) {
      window.location.href = '/#/login';
      return '';
    }
    document.querySelector('link#css-page').href = "styles/pages/profile.css";
    let response = await fetch("../../views/profile.html");
    return await response.text();
  },
  async afterRender() {
    document.querySelectorAll('header nav li>a').forEach(el => el.classList.remove('active'));
    const form1 = document.querySelector('form#personal-information');
    const form2 = document.querySelector('form#change-password');

    const personForm = document.querySelector('form#personal-information > .data');
    const passForm = document.querySelector('form#change-password > .data');
    const discardBtns = document.querySelectorAll('.action-form button[type="button"]');
    const signOutBtn = document.getElementById('sign-out');
    initForm(personForm, passForm)

    form1.addEventListener('submit', ev => {
      ev.preventDefault();
      const formData = new FormData(form1);
      const { name, email, gender, weight, height, age, activityLevel } = Object.fromEntries(formData);
      try {
        if (user.email !== email) {
          checkEmailIsExist(email);
        }
      } catch (e) {
        alert(e)
      }
      user = { ...user, name, email, gender, weight, height, age, activityLevel } 
      updatePersonalInfo(user)
      alert('Personal info updated successuly');
    })
    form2.addEventListener('submit', ev => {
      ev.preventDefault();
      const formData = new FormData(form2);
      const { currentPassword, newPassword, confirmPassword } = Object.fromEntries(formData);
      if (currentPassword !== user.password) {
        alert('Password wrong')
        return
      }
      if (newPassword !== confirmPassword) {
        alert('New password and confirm password not same')
        return
      }
      user.password = newPassword
      updatePassword(user);
      alert('Password updated successuly');
    })
    discardBtns.forEach(btn => {
      btn.addEventListener('click', ev => initForm(personForm, passForm))
    })
    signOutBtn.addEventListener('click', ev => {
      logout()
    })

    const photo = document.querySelector('.photo > img')
    loadPhoto(photo)
    const photoFile = document.querySelector('.photo input');
    photoFile.addEventListener('change', () => {
      const [file] = photoFile.files;
      if (file) {
        const photoUrl = URL.createObjectURL(file);
        photo.src = photoUrl;
        caches.open('photo-profile')
          .then(cache => {
            cache.put(`${user.email}`, new Response(file));
          });
      }
    })
  }
}

export default Profile;