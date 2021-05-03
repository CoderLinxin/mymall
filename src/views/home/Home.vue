<template>
  <div class="home">
    <!--  顶部导航栏  -->
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>

    <!--  用于实现吸顶效果的中部导航栏(需要在适当时候隐藏显示)  -->
    <middle-tab-bar
      :titles="['流行','新款','精选']"
      class="middle-tab-bar1"
      @switchGoods="swicthGoods"
      v-show="fakeTop"></middle-tab-bar>

    <!--  滚动区域  -->
    <scroll class="wrapper" ref="scroll"
            @scroll="scroll"
            :probe-type="3"
            :is-pull-up="true"
            @moveToBase="loadMore">
      <!--  轮播图  -->
      <home-swiper :banners="banners"
                   class="home-swiper"
                   @bannerLoaded="bannerLoaded"></home-swiper>

      <!--  首页推荐栏  -->
      <home-recommend :recommends="recommends"></home-recommend>

      <!--  本周流行  -->
      <week-popular></week-popular>

      <!--  中部导航栏  -->
      <middle-tab-bar
        :titles="['流行','新款','精选']"
        class="middle-tab-bar2"
        @switchGoods="swicthGoods"
        ref="middleTabBar"></middle-tab-bar>

      <!--  商品列表  -->
      <goods-list :goods="goods[type].list" class="good-list"></goods-list>
    </scroll>

    <!--  回到顶部按钮  -->
    <back-top @click="moveTop" v-show="backTopShow"></back-top>
  </div>
</template>

<script>
  //引入视图组件
  import HomeSwiper from './childComponents/HomeSwiper'
  import HomeRecommend from "./childComponents/HomeRecommend";
  import WeekPopular from "./childComponents/WeekPopular";

  //引入公用组件
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from "components/common/scroll/Scroll";

  import MiddleTabBar from "components/content/middleTabBar/MiddleTabBar";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from 'components/content/backTop/BackTop'

  //引入网络请求API
  import {getHomeMultidata, getHomeGoods} from 'network/home'

  //引入工具方法
  import {debounce} from 'common/utils'

  //引入一些常量
  import {ACHANGEIMAGESTATE} from 'common/constant'

  //引入混入对象
  import {imageListenerMixin,backTopMixin} from "common/mixin";

  export default {
    name: "Home",

    data() {
      return {
        banners: [],//轮播图
        recommends: [],//推荐
        goods: {//商品数据
          'pop': {page: 0, list: []},//由于记录有多页,可以记录需要向服务端请求哪一页数据
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        type: 'pop',//商品类型
        offsetTop: 0,//记录中部导航栏的offsetTop
        fakeTop: false,//标记伪吸顶元素是否显示
      }
    },

    mixins: [imageListenerMixin,backTopMixin],//混如对象用于处理事件总线的订阅

    components: {
      HomeSwiper,
      HomeRecommend,
      WeekPopular,
      NavBar,
      Scroll,
      MiddleTabBar,
      GoodsList,
      BackTop,
    },

    created() {//创建组件前获取必要数据
      //请求数据
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },

    deactivated() {//home不处于活跃状态取消订阅事件(离开首页就不需要监听首页图片的加载)
      this.$bus.$off("imageOnLoaded", this.imageListener);
    },

    methods: {
      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {//methods的方法
        getHomeMultidata().then(result => {//引入的方法
          this.banners = result.data.banner.list;
          this.recommends = result.data.recommend.list;
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1;//请求下一页数据
        return getHomeGoods(type, page).then(result => {
          this.goods[type].list.push(...result.data.list);
          this.goods[type].page++;//更新页码
        })
      },

      loadMore() {//加载更多资源
        if (this.$store.state.imageLoaded) {
          this.getHomeGoods(this.type).then(() => {
            this.imageLoaded = false;
            this.$refs.scroll.refresh();//重新计算滚动区域大小
            this.$refs.scroll.finishPullUp();//完成上拉加载
            this.$store.dispatch(ACHANGEIMAGESTATE, false);//更改图片加载状态(等待图片加载完成,防止出现上拉加载多次)
          });
        } else {
          setTimeout(() => {
            this.$store.dispatch(ACHANGEIMAGESTATE, true);//防止出现数据请求不到无法调用refresh,图片加载状态改不回来的情况
          }, 500);
        }
      },

      /**
       * 事件监听方法
       * @param index
       */
      swicthGoods() {//切换商品
        //根据index获得对应的goods对象的key
        this.type = Object.keys(this.goods)
          [this.$store.state.currentIndex];

        //更新当前类别位置(scrollTo移动是相对于(0,0)而不是当前位置)
        const offsetY = this.$store.state.positions[this.$store.state.currentIndex];
        if (offsetY >= 0)//注意切换前后的页面大小差距过大会导致出现一些问题(待解决)
          this.$refs.scroll.scrollTo(-offsetY, 0);
        else
          this.$refs.scroll.scrollTo(+offsetY, 0);
      },

      scroll(position) {//监听better-scroll的滚动
        //根据滚动决定是否显示隐藏中部导航栏实现伪吸顶
        this.fakeTop = -position.y > this.offsetTop - 44;

        //调用混入对象的方法(实现回到顶部功能)
        this.backTopScroll(position);
      },

      bannerLoaded() {//轮播图加载成功后调用
        //由于只需要获取一次offsetTop高度,因此该赋值只需要执行一次
        //为了获取到准确数据必须等轮播图(页面中加载最慢)加载完成后再初始化
        this.offsetTop = this.$refs.middleTabBar.$el.offsetTop;
      }
    },
  }
</script>

<style scoped>
  .home {
    height: 100vh; /* 高度设置为视口高度的100% */
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .middle-tab-bar1 {
    position: fixed;
    width: 100%;
    z-index: 1;
  }

  .wrapper {
    height: calc(100% - 93px); /* 减去顶部和底部导航栏的自适应的高度 */
    overflow: hidden;
  }
</style>
