/*
包含n个用于间接更新状态的方法的对象模块
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODLISTS,
  RECEIVE_SHOPS
} from './constType'

import {
  reqAddress,
  reqFoodLists,
  reqShops
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
  }
}
