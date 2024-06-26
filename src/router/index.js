import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'
import HomeView from '../views/HomeView.vue'
import Calc from '../views/Calculator.vue'
import Lista from '../views/Lista.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/calc',
    name: 'calc-page',
    component: Calc,
    beforeEnter: AuthGuard
  },
  {
    path: '/lista',
    name: 'calc-view',
    component: Lista,
    beforeEnter: AuthGuard
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
