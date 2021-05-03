<!-- 商品列表模块 -->
<template>
  <div class="goods">
    <!--  遍历展示商品  -->
    <goods-list-item v-for="(item,index) in goods"
                     :goods-item="item"
                     class="goods-item"
                     :key="index" :isDetail="isDetail"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from 'components/content/goods/GoodsListItem'

  export default {
    name: "GoodsList",

    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      },
      isDetail: {//标记是否是详情页的图片
        type: Boolean,
        default: false
      }
    },

    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods {
    padding: 0 5px 0 5px;

    column-count: 2;
    column-gap: 10px;
  }

  .goods .goods-item {
    break-inside: avoid;
  }
</style>
