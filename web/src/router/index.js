import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    meta:{ keepAlive: true },
    children:[
      {path: '/', component: ()=> import('@/views/Home.vue'), meta:{ keepAlive: true }},
      {path: '/articles/:id', component: ()=> import('@/views/Articles.vue'), props: true,meta:{ keepAlive: false }},
    ]
  },
  {
    path: '/heroes/:id', component: ()=> import('@/views/Hero.vue'), props: true,meta:{ keepAlive: false }
  }
]

const router = new VueRouter({
  routes
})

export default router
