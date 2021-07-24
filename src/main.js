/*
  入口文件
*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 创建vm
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 使用上路由
  store // 使用上vuex 使用：this.$store.dispatch('action', payload)
  // components: { App }, // 映射组件标签
  // template: '<App/>' // 指定需要渲染到页面的模板
})
