<!-- 封装scroll滚动模块 -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";

  import {ACHANGEIMAGESTATE, CHANGEPOSITION} from 'common/constant'

  export default {
    name: "Scroll",

    data() {
      return {scroll: null}
    },

    props: {
      probeType: {
        type: Number,
        default: 0
      },
      isPullUp: {//是否需要监听上拉加载更多功能
        type: Boolean,
        default: false
      },
    },

    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,//设置为true才能进行委派点击事件(才能点击图片(主要针对移动端))
        pullUpLoad: this.isPullUp,
      });

      if (this.probeType) {
        this.scroll.on('scroll', (position) => {//监听滚动事件
          this.$emit('scroll', position);//发送位置给父组件
        });
      }

      if (this.isPullUp)//根据需求绑定上拉加载事件
        this.scroll.on('pullingUp', () => {
          this.$emit('moveToBase');
        });

      this.scroll.on('touchEnd', () => {//手指离开屏幕时触发
        this.$bus.$on("savePosition", (preIndex) => {
          //保存上一次切换类别的位置信息
          this.$store.commit(CHANGEPOSITION, {'index': preIndex, 'position': -this.scroll.y});
        });
      });
    },

    methods: {
      moveTop(time) {//页面滚动到顶部(调用scroll的scrollTo方法)
        this.scroll && this.scroll.scrollTo(0, 0, time)
      },

      finishPullUp() {
        this.scroll && this.scroll.finishPullUp();//结束本次上拉加载更多
      },

      refresh() {
        this.scroll && this.scroll.refresh();//重新计算滚动区域大小
        this.$store.dispatch(ACHANGEIMAGESTATE, true);//图片加载完成后更新状态
      },

      scrollTo(y, time) {
        this.scroll.scrollTo(0, y, time)
      }
    },
  }
</script>

<style scoped>
</style>
