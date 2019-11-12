import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

const routes = [
  {path: '/login',name:'Login',component: ()=> import('@/views/Login.vue'), meta:{ isPublic: true }},
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main.vue'),
    children:[
      //  分类管理页面
      { path: '/categories/create', name: 'CategortCreate', component: () => import('@/views/CategortEdit.vue') },
      { path: '/categories/edit/:id', name: 'CategortEdit', component: () => import('@/views/CategortEdit.vue'), props: true },
      { path: '/categories/list', name: 'CategortList', component: () => import('@/views/CategortList.vue') },
      //  装备管理页面
      { path: '/item/create', name: 'ItemCreate', component: () => import('@/views/ItemEdit.vue') },
      { path: '/item/edit/:id', name: 'ItemEdit', component: () => import('@/views/ItemEdit.vue'), props: true },
      { path: '/item/list', name: 'ItemList', component: () => import('@/views/ItemList.vue') },
      //  英雄管理页面
      { path: '/heroes/create', name: 'HeroCreate', component: () => import('@/views/HeroEdit.vue') },
      { path: '/heroes/edit/:id', name: 'HeroEdit', component: () => import('@/views/HeroEdit.vue'), props: true },
      { path: '/heroes/list', name: 'HeroList', component: () => import('@/views/HeroList.vue') },
      //  文章管理页面
      { path: '/articles/create', name: 'ArticleCreate', component: () => import('@/views/ArticleEdit.vue') },
      { path: '/articles/edit/:id', name: 'ArticleEdit', component: () => import('@/views/ArticleEdit.vue'), props: true },
      { path: '/articles/list', name: 'ArticleList', component: () => import('@/views/ArticleList.vue') },
      //  广告管理页面
      { path: '/ads/create', name: 'AdsCreate', component: () => import('@/views/AdEdit.vue') },
      { path: '/ads/edit/:id', name: 'AdsEdit', component: () => import('@/views/AdEdit.vue'), props: true },
      { path: '/ads/list', name: 'AdsList', component: () => import('@/views/AdList.vue') },
      //  用户管理页面
      { path: '/admin_user/create', name: 'AdminUserCreate', component: () => import('@/views/AdminUserEdit.vue') },
      { path: '/admin_user/edit/:id', name: 'AdminUserEdit', component: () => import('@/views/AdminUserEdit.vue'), props: true },
      { path: '/admin_user/list', name: 'AdminUserList', component: () => import('@/views/AdminUserList.vue') }
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
})

export default router
