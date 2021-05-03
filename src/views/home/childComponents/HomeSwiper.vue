<!-- 首页轮播图 -->
<template>
  <div>

    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="bannerLoad">
        </a>
      </swiper-item>
    </swiper>

  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",

    props: {
      banners: {
        type: Array,
        default() {
          return [];
        }
      }
    },

    data() {
      return {
        isLoad: false
      }
    },

    components: {
      Swiper,
      SwiperItem
    },

    methods: {
      bannerLoad() {//只要一张轮播图加载完成时就发射事件(为了测高度)
        if (!this.isLoad) {
          this.$emit('bannerLoaded');
          this.isLoad = true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
