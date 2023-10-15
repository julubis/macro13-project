const checkActiveUser = () => {
  let user = localStorage.getItem('user');
  if (!user) {
    window.location.href = '/#/login'
    return
  }
  user = JSON.parse(user);
  return user;
}

const logout = () => {
  window.location.href = '/#/login'
}
