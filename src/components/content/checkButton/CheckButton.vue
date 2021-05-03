<!-- 商品勾选按钮 -->
<template>
  <div :class="{'check-button':true,'active':isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",

    props: {
      isChecked: {//标记商品是否被选中
        type: Boolean,
        default() {
          return false;
        }
      }
    }
  }
</script>

<style scoped>
  .check-button {
    height: 16px;
    width: 16px;

    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check-button img{
    position: relative;
    bottom: 2px;
  }

  .active {
    background-color: red;
  }
</style>
