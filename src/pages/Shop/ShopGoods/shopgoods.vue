<template>
  <div>
    <div class="goods"
         v-if="goods">
      <!-- 左边导航 -->
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item"
              v-for="(item,index) in goods"
              :key="index"
              :class="{current:(index === numIndex)}"
              @click="rigthScroll(index)">
            <span class="text bottom-border-1px">
              <img class="icon"
                   v-if="item.icon"
                   v-lazy="item.icon">
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <!-- 右边页面 -->
      <div class="foods-wrapper"
           ref="foodsWrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook"
              v-for="(item,index) in goods"
              :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px"
                  v-for="(food,key) in item.foods"
                  :key="key">
                <div class="icon"
                     @click="showFood(food)">
                  <img width="57"
                       height="57"
                       v-lazy="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old"
                          v-if="food.oldPrice">{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food='food' />
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 购物车 -->
      <ShopCart/>
    </div>
    <Food :food="food"
          ref="food" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Bscroll from '@better-scroll/core'
import CartControl from '../../../components/CartControl/cartcontrol.vue'
import Food from '../../../components/Food/food.vue'
import ShopCart from '../../../components/ShopCart/shopcart.vue'
export default {
  data () {
    return {
      // 初始化右边滚动距离顶部位置
      scrollY: 0,
      // 右边每个item距离顶部位置的集合
      tops: [],

      // 食物列表
      food: {}
    }
  },
  mounted () {
    // 异步获取数据，传一个方法过去，有数据只有就调用
    this.$store.dispatch('getShopGoods', () => { // 数据更新后执行
      this.$nextTick(() => { // 列表更新后显示执行
        this._initScroll()
        this._initTops()
      })
    })
  },
  methods: {
    // 初始化移动
    _initScroll () {
      // eslint-disable-next-line no-new
      new Bscroll('.menu-wrapper', {
        click: true, // 允许点击
        probeType: 3 // 因惯性滑动不会触发
      })
      this.foodsWrapper = new Bscroll('.foods-wrapper', {
        click: true, // 允许点击
        probeType: 2 // 因惯性滑动不会触发
      })
      this.foodsWrapper.on('scroll', (res) => {
        /*
        Math.round : 四舍五入
        Math.abs: 取绝对值
        */
        this.scrollY = Math.round(Math.abs(res.y))
      })
      // 监视滑动结束
      this.foodsWrapper.on('scrollEnd', (res) => {
        /*
        结束时在监听一次值 probeType: 2时，好用
        */
        this.scrollY = Math.round(Math.abs(res.y))
      })
    },
    // 页面每一个模块的高
    _initTops () {
      const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook')
      // 定义一个 tempHeight 暂时存放每一个模块的高
      let tempHeight = 0
      // 第一个的模块的起始位置先存放进去
      this.tops.push(tempHeight)

      for (let i = 0; i < lis.length; i++) {
        // 拿到每一个模块的高,在放到数组中
        tempHeight += lis[i].offsetHeight
        this.tops.push(tempHeight)
      }
    },
    // 点击左边组建，右边模块移动到对应位置
    rigthScroll (index) {
      // 找到数组中对应位置的top值 ，然后滚动到对应的位置
      this.foodsWrapper.scrollTo(0, -(this.tops[index]), 300)
    },
    // 显示Food 食物小卡片的方法
    showFood (food) {
      // 设置是
      this.food = food
      // 拿到子组件定义的方法 refs
      this.$refs.food.showFood()
    }
  },
  computed: {
    ...mapState(['goods']),
    // 滑动商品是选中左边的那个菜单
    numIndex () {
      /*
      拿到当前的高和下一个的高，然后判断滚动的 scrollY
      是否在这个范围内，就返回 i 也就是这个区域的索引值 如果在就给他加上这个 current 类名
      */
      const { tops, scrollY } = this
      // for (let i = 0; i < tops.length; i++) {
      //   // scrollY大于等于当前高度或者小于下一个的高度
      //   if (scrollY >= tops[i] && scrollY < tops[i + 1]) {
      //     return i
      //   }
      // }
      // return 0
      // eslint-disable-next-line no-const-assign
      return tops.findIndex((top, index) => {
        return scrollY >= top && scrollY < tops[index + 1]
      })
    }
  },
  components: {
    CartControl, Food, ShopCart
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '../../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 195px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      color: #AFB4B4;
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        color: #000;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 3px;
        }
      }
    }
  }
}
</style>
