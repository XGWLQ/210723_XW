/*
包含n个用于间接更新状态的方法的对象模块
 */
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
  DECREMENT_FOOD, CLEARCART,
  RECEIVE_SEARCH_SHOPS
} from './constType'

// ajax获取数据的方法
import {
  reqAddress,
  reqFoodLists,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqSearchShops
} from '../api'

export default {
  // 异步获取地址
  async getAddress ({ commit, state }) {
    // 拼接经纬度
    let geohash = state.latitude + ',' + state.longitude
    // 发送异步ajax请求
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      // 提交结果 mutation commit({常量}，{参数})
      const address = result.data
      commit(RECEIVE_ADDRESS, { address })
    }
  },

  // 异步获取食物分类列表
  async getfoodlists ({ commit }) {
    // 发送异步ajax请求
    const result = await reqFoodLists()
    if (result.code === 0) {
      // 提交结果 commit({常量}，{参数})
      const foodlists = result.data
      commit(RECEIVE_FOODLISTS, { foodlists })
    }
  },
  // 异步获取商家列表
  async getshops ({ commit, state }) {
    // 拼接经纬度
    let { longitude, latitude } = state
    // 发送异步ajax请求
    const result = await reqShops({ longitude, latitude })

    if (result.code === 0) {
      // 提交结果 commit({常量}，{参数})
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },
  // 同步获取用户信息
  syncUserinfo ({ commit }, userinfo) {
    commit(RECEIVE_USER_INFO, { userinfo })
  },
  // 异步获取用户信息 页面刷新保存有用户登录状态
  async getUserinfo ({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userinfo = result.data
      commit(RECEIVE_USER_INFO, { userinfo })
    }
  },
  // 退出登录
  async logout ({ commit }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
  // 异步获取商家信息
  async getShopInfo ({ commit }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, { info })
    }
  },
  // 异步获取商家评价列表
  async getShopRatings ({ commit }, callBack) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, { ratings })
      // 参数调用 穿过来的是一个方法直接调用
      callBack && callBack()
    }
  },
  // 异步获取商家商品列表
  async getShopGoods ({ commit }, callBack) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, { goods })
      // 参数调用 穿过来的是一个方法直接调用
      callBack && callBack()
    }
  },
  // 用于商品列表食物的增加和减少
  updataFood ({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(INCREMENT_FOOD, { food })
    } else {
      commit(DECREMENT_FOOD, { food })
    }
  },
  // 清空购物车
  clearCart ({ commit }) {
    commit(CLEARCART)
  },
  //
  // // 异步获取地址
  async searchShops ({ commit, state }, {keyword}) {
    // 拼接经纬度
    let geohash = state.latitude + ',' + state.longitude
    // 发送异步ajax请求
    const result = await reqSearchShops(geohash, keyword)
    if (result.code === 0) {
      // 提交结果 mutation commit({常量}，{参数})
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, { searchShops })
    }
  }
  // 异步获取商家商品列表
  // async searchShops ({ commit, state }, keyword) {
  //   const geohash = state.latitude + ',' + state.longitude
  //   const result = await reqSearchShops(geohash, keyword)
  //   if (result.code === 0) {
  //     const searchShops = result.data
  //     commit(RECEIVE_SEARCH_SHOPS, { searchShops })
  //   }
  // }
}
