import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Signup from "../views/Signup";
import ChangePwd from "../views/ChangePwd";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/changepwd',
    name: 'ChangePwd',
    component: ChangePwd
  },
  {
    path: '/selectskills',
    name: 'SelectSkills',
    component: ChangePwd
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
