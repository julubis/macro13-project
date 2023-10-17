import { getActiveUser, checkEmailIsExist } from "./auth.js";

const updatePersonalInfo = ({ name, email, gender, weight, height, age, activityLevel }) => {
  let user = JSON.parse(localStorage.getItem('user'));
  let users = JSON.parse(localStorage.getItem('users'));
  activityLevel = +activityLevel;

  localStorage.setItem('user', JSON.stringify({...user, name, email, gender, weight, height, age, activityLevel}));
  const index = users.findIndex(user => user.email === email);
  users[index] = {...user, name, email, gender, weight, height, age, activityLevel};
  localStorage.setItem('users', JSON.stringify(users));
}

const updatePassword = ({password, email}) => {
  let user = JSON.parse(localStorage.getItem('user'));
  let users = JSON.parse(localStorage.getItem('users'));

  localStorage.setItem('user', JSON.stringify({...user, password}));
  const index = users.findIndex(user => user.email === email);
  users[index] = {...user, password};
  localStorage.setItem('users', JSON.stringify(users));
}

const loadPhoto = (imgElement) => {
  const user = getActiveUser()
  if (!user) {
    return;
  }
  caches.open('photo-profile')
      .then(cache => {
        cache.match(`${user.email}`).then(resp => {
          if (resp) {
            resp.blob().then(blob => {
              imgElement.src = URL.createObjectURL(blob)
            })
          }
        })
      })
}

export {updatePersonalInfo, updatePassword, loadPhoto};