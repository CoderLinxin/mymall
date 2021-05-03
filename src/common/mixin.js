import {debounce} from 'common/utils'

//监听图片加载的混入对象：可以被多个组件共享
export const imageListenerMixin = {
  data() {
    return {
      imageListener: null//监听图片加载的回调
    }
  },

  mounted() {//在组件挂载前订阅事件
    this.imageListener = () => {//在事件总线上订阅事件
      refresh();//图片加载完成重新计算滚动区域
    };
    const refresh = debounce(this.$refs.scroll.refresh, 100);//防抖调用
    this.$bus.$on('imageOnLoaded', this.imageListener);//取消imageOnLoaded的对应callback的回调
  }
};

//回到顶部图标的混入对象
export const backTopMixin = {
  data() {
    return {
      backTopShow: false,//决定返回顶部图标是否显示
    }
  },

  methods: {
    moveTop() {//回到顶部
      this.$refs.scroll.moveTop(1000);
    },

    //需要监听better-scroll的滚动
    backTopScroll(position) {
      //决定是否隐藏和显示‘向上加载’更多图标
      this.backTopShow = -position.y > 1000;//因为y为负值所以要取反
    }
  }
}
