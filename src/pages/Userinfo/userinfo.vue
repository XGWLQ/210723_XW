<template>
  <div>
    <Headertop title="用户中心">
      <a href="javascript:"
         @click="$router.back()"
         slot="left"
         class="header_search"
         style="left: 3px;top: 39%;">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </Headertop>
    <div class="userinfo-number">
      <div class="test"> 努力开发中......</div>

    </div>

  </div>
</template>
<script>
import Headertop from '../../components/HeaderTop/headertop.vue'
export default {
  components: { Headertop }
}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
.header_search {
  left: 3px;
  top: 39%;

  >.iconfont {
    font-size: 25px;
    color: #fff;
  }
}

.userinfo-number {
  margin-top: 45px;

  .test {
    width: 100%;
    text-align: center;
    font-size: 35px;
    color: #316F54;
  }
}
</style>
