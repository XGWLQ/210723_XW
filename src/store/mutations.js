/*
包含n个用于直接更新状态的方法的对象模块
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_FOODLISTS,
  RECEIVE_SHOPS
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
  }
}
