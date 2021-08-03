<template>
  <div style="overflow: hidden">
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
      <div class="wrapper">
        <ul>
          <li class="content">content元素就是滚动元素，它是wrapper的唯一子元素</li>
          <li class="content">content元素就是滚动元素，它是wrapper的唯一子元素</li>
          <li class="content">content元素就是滚动元素，它是wrapper的唯一子元素</li>
          <li class="content">content元素就是滚动元素，它是wrapper的唯一子元素</li>
          <li class="content">content元素就是滚动元素，它是wrapper的唯一子元素</li>
          <li class="content">content元素就是滚动元素，它是wrapper的唯一子元素</li>
        </ul>
        <!-- 这里可以放一些其它的 DOM，但是会被忽略，且不会影响content部分滚动 -->
      </div>

    </div>

  </div>
</template>
<script>
import Bscroll from '@better-scroll/core'
import Headertop from '../../components/HeaderTop/headertop.vue'
export default {
  mounted () {
    // this.$nextTick(() => {
    // eslint-disable-next-line no-new
    new Bscroll('.wrapper')
    // })
  },
  components: { Headertop }
}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl';
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

  .wrapper {
    height: 100px;
    overflow: hidden;
    background: #333;

    .content {
      background-color: #DBCECE;
      height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 3px 0;
    }
  }
}
</style>
