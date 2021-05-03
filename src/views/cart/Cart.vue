<template>
  <div>
    <!--  顶部导航栏  -->
    <nav-bar class="cart-nav-bar">
      <template v-slot:center>
        <div>购物车（{{getGoodsListLength}}）</div>
      </template>
    </nav-bar>

    <!--  购物车商品列表  -->
    <cart-list></cart-list>

    <!--  底部汇总  -->
    <cart-bottom-bar @toCalculate="toCalculate"></cart-bottom-bar>

    <!--  弹窗  -->
    <toast ref="toast"></toast>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childComponents/CartList'
  import CartBottomBar from './childComponents/CartBottomBar'

  import {mapGetters} from 'vuex'

  import Toast from 'components/common/toast/Toast'

  export default {
    name: "Cart",

    components: {
      NavBar,
      CartList,
      CartBottomBar,
      Toast
    },

    computed: {
      ...mapGetters([
        'getGoodsListLength'
      ])
    },

    methods: {
      toCalculate(isEmpty) {
        if (!isEmpty) {//判断是否选中商品再结算
          this.$refs.toast.show('未选中商品');
        }
      }
    }
  }
</script>

<style scoped>
  .cart-nav-bar {
    color: #fff;
    background-color: var(--color-tint);
    font-size: 18px;
  }
</style>
