/*
包含n个用于直接更新状态的方法的对象模块
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODLISTS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO
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
  }
}
