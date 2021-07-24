<template>
  <!--首页外卖-->
  <section class="msite">
    <headertop :title="title">
      <span class="header_search"
            slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login"
            slot="right">
        <span class="header_login_text">登录 | 注册</span>
      </span>
    </headertop>
    <!--首页导航-->
    <nav class="msite_nav" >
      <div class="swiper-container" v-if="foodlistsArr.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
               v-for="(foodlists, index) in foodlistsArr"
               :key="index">
            <a href="javascript:"
               class="link_to_food"
               v-for="(foodlist, index) in foodlists "
               :key="index">
              <div class="food_container">
                <img :src="baseImageUrl + foodlist.image_url">
              </div>
              <span>{{foodlist.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img v-else src="./images/msite_back.svg" alt="back">
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </section>
</template>
<script>
import Swiper from 'swiper'
import { mapState } from 'vuex'
import headertop from '../../components/HeaderTop/headertop.vue'
import ShopList from '../../components/ShopList/shoplist.vue'
import 'swiper/swiper-bundle.min.css'

export default {
  name: 'home',
  data () {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com', // 图片基本前缀地址
      title: '小吴外卖'
    }
  },
  mounted () {
    // 读食物分类列表
    this.$store.dispatch('getfoodlists')
    // 读商家列表
    this.$store.dispatch('getshops')
  },
  computed: {
    ...mapState(['address', 'foodlists']),

    /*
    根据 foodlists 一维数组生成一个2维数组
    小数组中的元素个数最大是8
     */
    foodlistsArr () {
      const { foodlists } = this
      const arr = [] // 二维数组
      let tempArr = [] // 暂存8个数据的一维数组

      foodlists.forEach((c) => {
        // 一维数组先存8个
        tempArr.push(c)
        // 一维数组的长度数如果等于 8
        if (tempArr.length === 8) {
          // 先把一维数组存到二维数组中
          arr.push(tempArr)
          // 再把一维数组清空，用于存放新的数据
          tempArr = []
        }
      })
      // 返回新的二维数组
      return arr
    }
  },
  watch: {
    foodlists (value) {
      // 这个方法也可以
      // setTimeout(() => {
      //   // 头部下面的轮播图
      //   // eslint-disable-next-line no-new
      //   new Swiper('.swiper-container', {
      //     // 配置对象
      //     loop: true, // 循环模式选项
      //     // 如果需要分页器
      //     pagination: {
      //       el: '.swiper-pagination'
      //     }
      //   })
      // })

      // 界面更新就立即创建Swiper对象
      this.$nextTick(() => { // 一旦界面更新，立即调用
        // 头部下面的轮播图
        // eslint-disable-next-line no-new
        new Swiper('.swiper-container', {
          // 配置对象
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  components: { headertop, ShopList }
}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
@import '../../common/stylus/mixins.styl';

.msite { // 首页
  width: 100%;
  overflow: hidden;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
