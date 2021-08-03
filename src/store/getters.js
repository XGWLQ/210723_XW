/*
包含n个基于state的getter计算属性方法的对象模块
 */

export default {
  // 订单总数量
  allCount (state) {
    return state.cartFood.reduce((preTotal, food) => { return preTotal + food.count }, 0)
  },
  // 订单总价钱
  allPrice (state) {
    return state.cartFood.reduce((prePrive, food) => { return prePrive + food.count * food.price }, 0)
  }
}
