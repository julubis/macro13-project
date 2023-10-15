const Profile = {
  async render() {
    document.querySelector('link#css-page').href = "styles/pages/profile.css";
    let response = await fetch("../../views/profile.html");
    return await response.text();
  },
  async afterRender() {
  }
}

export default Profile;