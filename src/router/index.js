import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import firebase from 'firebase'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]})

router.replace({ path: "/login" })

router.beforeEach((to, from, next) => {
  
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    let user = firebase.auth().currentUser
    
    if(user){
      next()
    }
    else{
      next({name: "Login"})
    }
  } else {
    next()
  }
})

export default router
