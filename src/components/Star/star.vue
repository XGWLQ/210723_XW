<template>
  <div class="star "
       :class="'star-' + size">
    <span class="star-item"
          v-for="(sc,index) in starClass"
          :class="sc"
          :key="index"></span>
  </div>
</template>
<script>
// 星星类名常量
const START_ON = 'on'
const START_HAIF = 'half'
const START_OFF = 'off'
export default {

  // 评分和星星的大小
  props: {
    score: Number,
    size: Number
  },
  computed: {
    /*
      思路：starArr:用来存放星星 类名的数 长度是 5
        1、判断score的整数是多少（向下取整）？ 一个整数是一个 星 on
        2、判断score的小数如果大于0.5是一个半星 (总分数 - 整数 >= 0.5)？ 一个整数是一个 半星 haif
        1、判断score的放到数组中的长度减去 5 是多少？ 有几个值就是几个空星 off
    */
    starClass () {
      const { score } = this
      const starArr = []
      let int = Math.floor(score)
      for (let i = 0; i < int; i++) {
        starArr.push(START_ON)
      }
      if (score * 10 - int * 10 >= 5) {
        starArr.push(START_HAIF)
      }
      while (starArr.length < 5) {
        starArr.push(START_OFF)
      }
      return starArr
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl';

.star { // 2x图 3x图
  float: left;
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/star48_on');
      }

      &.half {
        bg-image('./images/star48_half');
      }

      &.off {
        bg-image('./images/star48_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/star36_on');
      }

      &.half {
        bg-image('./images/star36_half');
      }

      &.off {
        bg-image('./images/star36_off');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('./images/star24_on');
      }

      &.half {
        bg-image('./images/star24_half');
      }

      &.off {
        bg-image('./images/star24_off');
      }
    }
  }
}</style>
