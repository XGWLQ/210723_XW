<template>
  <div id="app">
    <router-view />
    <!-- 底部按钮  v-show="$route.meta.isShow" 底部按钮的显示与隐藏 比如进入商家或者登录页面-->
    <FooterGuide v-show="$route.meta.isShow" />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import FooterGuide from './components/FooterGuide/footerguide.vue'
export default {
  name: 'App',
  mounted () {
    // this.$store.dispatch('getAddress')
    this.getAddress()
    this.getUserinfo()
  },
  methods: {
    ...mapActions(['getAddress', 'getUserinfo'])
  },
  components: { FooterGuide }
}
</script>
<style  lang="stylus" rel="stylesheet/stylus">
.app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f5f5f5;
}
</style>
