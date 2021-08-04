/* eslint-disable no-tabs */
/*
  路由器对象模块
*/

import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login/login.vue'
import Userinfo from '../pages/Userinfo/userinfo.vue'
import Shop from '../pages/Shop/shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/shopgoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/shopinfo.vue'
import ShopRating from '../pages/Shop/ShopRating/Shoprating.vue'
// 引入路由组件
// import Home from '../pages/Home/home.vue'
// import Order from '../pages/Order/order.vue'
// import Search from '../pages/Search/search.vue'
// import Profile from '../pages/Profile/profile.vue'
// 路由懒加载
const Home = () => import('../pages/Home/home.vue')
const Order = () => import('../pages/Order/order.vue')
const Search = () => import('../pages/Search/search.vue')
const Profile = () => import('../pages/Profile/profile.vue')
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
    },
    // 商家列表的路由
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        }, {
          path: '/shop/info',
          component: ShopInfo
        }, {
          path: '/shop/rating',
          component: ShopRating
        }, {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    }
  ]
})
