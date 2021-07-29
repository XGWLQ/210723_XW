/* eslint-disable no-tabs */
/*
  路由器对象模块
*/

import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由组件
import Home from '../pages/Home/home.vue'
import Order from '../pages/Order/order.vue'
import Search from '../pages/Search/search.vue'
import Profile from '../pages/Profile/profile.vue'
import Login from '../pages/Login/login.vue'
import Userinfo from '../pages/Userinfo/userinfo.vue'
// 声明使用插件
Vue.use(VueRouter)

// 抛出路由路径
export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        isShow: true
      }
    }, {
      path: '/order',
      component: Order,
      meta: {
        isShow: true
      }
    }, {
      path: '/search',
      component: Search,
      meta: {
        isShow: true
      }
    }, {
      path: '/profile',
      component: Profile,
      meta: {
        isShow: true
      }
    }, {
      path: '/',
      redirect: '/home'
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/userinfo',
      component: Userinfo
    }
  ]
})
