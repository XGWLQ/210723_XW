<template>
  <div class="footer_guide">
    <router-link class="guide_item "
                 :class="{on: $route.path==='/home'}"
                 to="/home"><span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      外卖
    </router-link>
    <router-link class="guide_item"
                 to="/search"
                 :class="{on: $route.path==='/search'}">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      搜索
    </router-link>
    <router-link class="guide_item"
                 to="/order"
                 :class="{on: $route.path==='/order'}">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      订单
    </router-link>
    <router-link class="guide_item"
                 to="/profile"
                 :class="{on: $route.path==='/profile'}">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      我的
    </router-link>
  </div>
</template>
<script>
export default {}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl';

.footer_guide { // footer
  top-border-1px(#e4e4e4);
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 50px;
  display: flex;

  .guide_item {
    display: flex;
    font-size: 12px;
    flex: 1;
    text-align: center;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    color: #999999;

    &.on {
      color: #02a774;
    }

    span {
      margin-top: 2px;
      margin-bottom: 2px;

      .iconfont {
        font-size: 22px;
      }
    }
  }
}
</style>
