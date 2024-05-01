import Vue from 'vue'
import VueRouter from 'vue-router'
// import Manege from '../views/Manege.vue'

// 导入 Vue Router 库
Vue.use(VueRouter)

// 定义路由配置
const routes = [
  {
    // 路径
    path: '/',
    name: 'home',
    // 对应的组件
    component: () => import('../views/Manege.vue'),
    //重定向
    redirect: "/home",
    //子路由
    children: [
      { path: 'home', name: "Home", component: () => import('../views/Home.vue') },
      { path: 'storelist', name: "StoreList", component: () => import('../views/StoreList.vue') },
      { path: 'employee', name: "Employee", component: () => import('../views/Employee.vue') },
      { path: 'storelist/edit?storeId=:id', name: "Edit", component: () => import('../views/StoreEdit.vue') ,props: true},
      { path: 'storelist/addstore', name: "AddStore", component: () => import('../views/AddStore.vue'),props: true}
    ]
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

// 创建 VueRouter 实例
const router = new VueRouter({
  // 路由模式,使用 'history' 模式可以去掉 URL 中的 '#' 符号
  mode: 'history',
  // 基础 URL,用于指定应用的基本 URL 路径，可以根据环境变量设置
  base: process.env.BASE_URL,
  // 路由配置
  routes
})

export default router
