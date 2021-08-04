/*
包含n个用于直接更新状态的方法的对象模块
 */
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODLISTS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD,
  DECREMENT_FOOD,
  CLEARCART,
  RECEIVE_SEARCH_SHOPS
} from './constType'

export default {
  [RECEIVE_ADDRESS] (state, { address }) {
    state.address = address
  },
  [RECEIVE_FOODLISTS] (state, { foodlists }) {
    state.foodlists = foodlists
  },
  [RECEIVE_SHOPS] (state, { shops }) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, { userinfo }) {
    state.userinfo = userinfo
  },
  [RESET_USER_INFO] (state) {
    state.userinfo = {}
  },
  // 直接存到状态中
  [RECEIVE_GOODS] (state, { goods }) {
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state, { ratings }) {
    state.ratings = ratings
  },
  [RECEIVE_INFO] (state, { info }) {
    state.info = info
  },
  // 订单按钮的添加和删除
  [INCREMENT_FOOD] (state, { food }) {
    /*
    1、让新增的数据也有数据绑定
    参数：对象、属性名(字符串)、属性值
    vue.set()
    */
    if (!food.count) {
      Vue.set(food, 'count', 1)
      // 将food 添加到cartFood中 不用多添加 因为引用指向的都是同一个
      state.cartFood.push(food)
    } else {
      food.count++
    }
  },
  [DECREMENT_FOOD] (state, { food }) {
    if (food.count) {
      food.count--
      // 如果该商品的数量为0 移除购物车订单
      if (food.count === 0) {
        state.cartFood.splice(state.cartFood.indexOf(food), 1)
      }
    }
  },

  // 购物车车的清空
  [CLEARCART] (state) {
    // 把food中的count清0
    state.cartFood.forEach(food => { food.count = 0 })
    // 清空购物车
    state.cartFood = []
  },

  // 商品查询数组
  [RECEIVE_SEARCH_SHOPS] (state, { searchShops }) {
    state.searchShops = searchShops
  }
}
