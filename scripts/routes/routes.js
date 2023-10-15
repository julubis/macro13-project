import Landing from "../views/landing.js";
import Login from "../views/login.js";
import Register from "../views/register.js";
import Home from "../views/home.js";
import Food from "../views/food.js";
import Plan from "../views/plan.js";
import News from "../views/news.js";
// import FoodDetail from "../views/detail.js"
import Profile from "../views/profile.js"

const routes = {
  '/': Landing,
  '/login': Login,
  '/register': Register,
  '/home': Home,
  '/food': Food,
  '/plan': Plan,
  '/news': News,
  '/profile': Profile
}

export default routes;