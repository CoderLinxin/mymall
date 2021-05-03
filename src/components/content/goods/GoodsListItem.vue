<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage()" alt="" @load="imageLoaded">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",

    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      },
      isDetail: {//标记是否是详情页的图片
        type: Boolean,
        default: false
      }
    },

    methods: {
      imageLoaded() {//图片加载完成后的回调
        this.$bus.$emit('imageOnLoaded');//发布一个事件到事件总线上
      },

      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid);//切换网址
      },

      showImage() {//根据isDetail判断是否是详情页返回对应数据(无法用||来进行短路运算,因为会直接报错而不是返回undefined)
        if (this.isDetail)
          return this.goodsItem.image;
        else
          return this.goodsItem.show.img;
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px; /* 为了不覆盖右边的伪元素 */
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute; /* 伪元素最好开启定位 */
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
