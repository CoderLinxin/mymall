<!-- 购物车列表组件 -->
<template>
  <div class="cart-list">
    <scroll class="wrapper" ref="scroll">
      <cart-list-item v-for="(item,index) in getGoodList"
                      :key="index" :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import CartListItem from './CartListItem'

  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",

    components: {
      Scroll,
      CartListItem
    },

    computed: {
      ...mapGetters([
        'getGoodList'
      ])
    },

    activated() {//DOM发生变化需要重新计算滚动区域(由于页面有缓存因此直接在activated中调用refresh即可)
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100vh - 44px - 49px - 40px);/* 减去顶部和底部导航栏和汇总栏高度 */
  }

  .wrapper {
    height: 100%;
    overflow: hidden;
  }
</style>
