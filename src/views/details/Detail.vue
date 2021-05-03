<!-- 详情页视图 -->
<template>
  <div class="detail">
    <!--  详情页导航栏  -->
    <detail-nav class="detail-nav" @titleClick="titleClick" ref="detailNav"></detail-nav>

    <!--  滚动区域  -->
    <scroll class="wrapper" ref="scroll" @scroll="scroll" :probe-type="2">
      <!--  轮播图  -->
      <detail-swiper :top-images="topImages"/>

      <!--  商品基础信息  -->
      <detail-base-info :goods="goods"></detail-base-info>

      <!--  店铺基础信息  -->
      <detail-shop-info :shop="shop"></detail-shop-info>

      <!--   商品图片相关信息   -->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoaded"></detail-goods-info>

      <!--   商品参数信息   -->
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>

      <!--   商品评论   -->
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>

      <!--   商品推荐   -->
      <good-list :goods="recommendList" :is-detail="true" ref="recommends"></good-list>
    </scroll>

    <!--  底部导航栏  -->
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>

    <!--  回到顶部按钮  -->
    <back-top @click="moveTop" v-show="backTopShow"></back-top>

    <!--  弹窗  -->
    <toast ref="toast"></toast>
  </div>
</template>

<script>
  //引入滚动组件
  import Scroll from 'components/common/scroll/Scroll'

  //引入页面模块
  import DetailNav from "./childComponents/DetailNav";
  import DetailSwiper from "./childComponents/DetailSwiper";
  import DetailBaseInfo from './childComponents/DetailBaseInfo'
  import DetailShopInfo from './childComponents/DetailShopInfo'
  import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
  import DetailParamInfo from './childComponents/DetailParamInfo'
  import DetailCommentInfo from './childComponents/DetailCommentInfo'
  import DetailBottomBar from './childComponents/DetailBottomBar'

  import GoodList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  //引入网络请求模块
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'

  //引入混入对象
  import {imageListenerMixin, backTopMixin} from "common/mixin";

  //引入常量
  import {AADDCART} from 'common/constant'

  import Toast from 'components/common/toast/Toast'

  import {mapActions} from 'vuex'

  export default {
    name: "detail",

    data() {
      return {
        iid: '',
        topImages: [],//用于保存轮播图图片
        goods: {},//保存商品信息
        shop: {},//店铺信息
        detailInfo: {},//商品图片相关信息
        paramInfo: {},//商品参数
        commentInfo: {},//评论信息
        recommendList: [],//推荐列表
        elementOffsetTop: [0],//导航栏对应元素的offsetTop属性
        currentIndex: 0//记录当前详情页导航栏的currentIndex
      }
    },

    mixins: [imageListenerMixin, backTopMixin],//混如对象用于处理事件总线的订阅

    components: {
      DetailParamInfo,
      DetailGoodsInfo,
      Scroll,
      DetailNav,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodList,
      BackTop,
      Toast
    },

    created() {
      this.iid = this.$route.params.iid;
      //通过动态路由获取对应参数发送网络请求

      //获取详情页数据
      this.getDetail();

      //获取推荐页数据
      this.getRecommend();

    },

    unmounted() {//详情页销毁后取消订阅事件(离开详情页就不需要监听详情页图片的加载)
      this.$bus.$off("imageOnLoaded", this.imageListener);
    },

    methods: {
      ...mapActions({//对actions进行映射
        addCart: AADDCART
      }),

      imageLoaded() {
        //最后一张图片加载完调用refesh(如果出现bug就改用防抖函数监听所有图片加载)
        this.$refs.scroll.refresh();

        //最后一张图片加载完成获取相应元素的offsetTop属性
        this.elementOffsetTop.push(-this.$refs.params.$el.offsetTop);
        this.elementOffsetTop.push(-this.$refs.comment.$el.offsetTop);
        this.elementOffsetTop.push(-this.$refs.recommends.$el.offsetTop);
      },

      getDetail() {
        getDetail(this.iid).then(result => {
          //请求的数据
          const data = result.result;

          //获取轮播图图片
          this.topImages = data.itemInfo.topImages;

          //获取详情页商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

          //获取店铺信息
          this.shop = new Shop(data.shopInfo);

          //获取商品图片相关信息
          this.detailInfo = data.detailInfo;

          //获取商品参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

          // 获取评论数据
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0] || {};
          }
        })
      },

      getRecommend() {
        getRecommend().then(result => {
          this.recommendList = result.data.list;
        });
      },

      titleClick(index) {
        //点击对应导航跳转到对应位置
        this.$refs.scroll.scrollTo(this.elementOffsetTop[index], 200);
      },

      scroll(position) {//获取滚动时的position
        //根据滚动距离来设置对应currentIndex
        for (let i = this.elementOffsetTop.length - 1; i >= 0; i--) {
          if (-position.y >= -this.elementOffsetTop[i]) {//进行从右到左的单向判断(正确结果会造成阻塞)
            if (this.currentIndex != i) {//避免赋值语句多次调用
              this.currentIndex = i;
              this.$refs.detailNav.currentIndex = this.currentIndex;
            }
            break;//为了防止上面if条件句突破正确结果的阻塞需要在这里break
          }
        }

        //调用混入对象的方法(实现回到顶部功能)
        this.backTopScroll(position);
      },

      addToCart() {//点击添加到购物车
        //1.获取购物车中需要展示的商品信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;//iid作为商品的唯一标识必须进行存储

        //2.将商品信息加入购物车
        this.addCart(product).then((result) => {
          this.$refs.toast.show('加入购物车成功');
        });//直接调用映射好的action
      }
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 999;

    background-color: #fff;
    height: 100vh;
  }

  .wrapper {
    position: relative;

    height: calc(100% - 44px - 49px); /* 减去顶部和底部导航栏 */
    overflow: hidden;
  }
</style>
