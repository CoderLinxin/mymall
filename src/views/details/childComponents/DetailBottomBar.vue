<!-- 底部导航栏 -->
<template>
  <div class="detail-bottom-bar">
    <!--  客服  -->
    <div class="customer-service">
      <div class="icon"></div>
      <div>客服</div>
    </div>

    <!--  店铺  -->
    <div class="shop">
      <div class="icon"></div>
      <div>店铺</div>
    </div>

    <!--  收藏  -->
    <div class="collect">
      <div class="icon"></div>
      <div>收藏</div>
    </div>

    <!--  添加购物车  -->
    <div class="add-cart" @click="addToCart">加入购物车</div>

    <!--  购买商品  -->
    <div class="buy">购买</div>
  </div>
</template>

<script>

  export default {
    name: "DetailBottomBar",

    methods:{
      addToCart(){//点击添加到购物车
        this.$emit('addToCart');//发送事件给详情页
      }
    }
  };
</script>

<style scoped>
  .detail-bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;

    display: flex;

    height: 49px;
    width: 100vw;

    font-size: 13px;
    text-align: center;
    font-weight: 600;
  }

  .customer-service, .shop, .collect {
    background-color: #fff;
    width: 44px;
    line-height: 19px;
  }

  .icon {
    background-image: url('~assets/img/detail/detail_bottom.png');
    background-repeat: no-repeat;
    background-position-x: 8px;
    background-size: 28px 180px;

    height: 30px;
    overflow: hidden;
  }

  .customer-service .icon {
    background-position-y: -59px;
  }

  .shop .icon {
    background-position-y: -113px;
  }

  .collect .icon {
    background-position-y: 6px;
  }

  .add-cart, .buy {
    font-size: 16px;
    line-height: 49px;
  }

  .add-cart {
    flex: 1;
    background-color: rgb(254, 229, 23);
  }

  .buy {
    width: 75px;
    color: #fff;

    background-color: rgb(255, 100, 154);
  }
</style>
