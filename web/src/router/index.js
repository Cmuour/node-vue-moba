import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      {path: '/', component: ()=> import('@/views/Home.vue')},
      {path: '/articles/:id', component: ()=> import('@/views/Articles.vue'), props: true},
    ]
  },
  {
    path: '/heroes/:id', component: ()=> import('@/views/Hero.vue'), props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
