<!-- 购物车商品组件 -->
<template>
  <div class="cart-list-item">
    <!--  商品勾选按钮  -->
    <check-button @click="switchChecked" :is-checked="product.checked" class="check-button"></check-button>

    <!--  商品图片  -->
    <div class="item-img">
      <img :src="product.image" alt="商品图片"/>
    </div>

    <div class="item-info">
      <!--    商品信息  -->
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">商品描述: {{ product.desc }}</div>

      <!--   商品价格及数量   -->
      <div class="info-bottom">
        <div class="item-price">¥{{ product.price }}</div>
        <div class="item-count">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: "CartListItem",

    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },

    components: {
      CheckButton
    },

    methods: {
      switchChecked() {//切换商品选中状态
        this.product.checked = !this.product.checked;
      }
    }
  }
</script>

<style scoped>
  .check-button{
    position: relative;
    margin: 55px 0 0 3px;
  }

  .cart-list-item {
    display: flex;
    border: rgba(204, 204, 204, .3) 2px solid;
    border-top: 0;
  }

  .item-info {
    flex: 1;
  }

  .item-title,
  .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px 0px 5px 7px;
  }

  .item-img >>> img {
    width: 90px;
    height: 110px;
    border-radius: 5px;
    object-fit: cover;
  }

  .item-info {
    font-size: 17px;
    position: relative;
    overflow: hidden;

    padding: 5px 10px;
    color: #333333;
  }

  .item-info .item-desc {
    font-size: 14px;
    margin-top: 15px;
    color: #666666;
  }

  .info-bottom {
    display: flex;
    position: absolute;
    bottom: 15px;
    left: 15px;
  }

  .item-price {
    width: 160px;
  }

  .item-count {
    flex: 1;
  }

  .item-price {
    color: #ff4500;
  }
</style>
