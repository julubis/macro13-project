if (!localStorage.getItem('users')) {
  localStorage.setItem('users', '[]')
};

const getActiveUser = () => {
  let user = localStorage.getItem('user');
  if (!user) {
    return
  }
  user = JSON.parse(user);
  return user;
}

/**
 * @param {string} name
 * @param {string} email
 * @param {string} password
*/

const checkEmailIsExist = (email) => {
  let users = JSON.parse(localStorage.getItem('users'));
  let user = users.filter(user => user.email === email)
  if (user.length) {
    throw "Email already registered";
  } 
}

const register = ({name, email, password, gender, age, height, weight, activityLevel}) => {
  let users = JSON.parse(localStorage.getItem('users'));
  users.push({name, email, password, gender, age, height, weight, activityLevel})
  localStorage.setItem('users', JSON.stringify(users))
  window.location.href = '/#/login'
}

/**
 * @param {string} email
 * @param {string} password
*/
const login = (email, password) => {
  let users = JSON.parse(localStorage.getItem('users'));
  let user = users.filter(user => user.email === email && user.password === password)
  if (!user.length) {
    throw "Email or password wrong"
  } 
  localStorage.setItem('user', JSON.stringify(user[0]))
  window.location.href = '/#/home'
}

const logout = () => {
  localStorage.removeItem('user')
  window.location.href = '/#/login'
}

export {login, register, logout, getActiveUser, checkEmailIsExist}