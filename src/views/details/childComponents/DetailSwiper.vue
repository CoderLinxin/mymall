<!-- 详情页轮播图组件 -->
<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt="" @load="detailImageLoad">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",

    props: {
      topImages: {//接收父组件传来的轮播图片
        type: Array,
        default() {
          return [];
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },

    methods:{
      detailImageLoad(){//图片加载完成后调用
        this.$bus.$emit('detailBannerOnLoad');//发布事件到事件总线上
      }
    }
  }
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>
