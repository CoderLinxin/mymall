<!-- 购物车底部汇总栏目 -->
<template>
  <div class="cart-bottom-bar">
    <!-- 全选按钮 -->
    <div class="left">
      <check-button :class="{'check-button':true}"
                    :isChecked="isTotalChecked"
                    @click="totalClick"></check-button>
      <div>全选</div>
    </div>

    <!--  合计  -->
    <div class="center">
      <div>合计:</div>
      <div>￥{{getTotal}}</div>
    </div>

    <!--  去计算  -->
    <div class="right" @click="toCalculate">去计算({{getCheckedLength}})</div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import {
    CHANGECHECKED,
  } from 'common/constant'

  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",

    components: {
      CheckButton
    },

    computed: {
      ...mapGetters([
        'getGoodList'
      ]),

      getTotal() {//计算总价
        return this.getGoodList
          .filter(item => item.checked)
          .reduce((preValue, item) => {
            return preValue + item.count * item.price;
          }, 0).toFixed(2);
      },

      getCheckedLength() {//计算商品的数量
        return this.getGoodList.filter(item => item.checked).reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
      },

      isTotalChecked() {
        return (Boolean)(this.getGoodList.length) //处理默认购物车中无数据情况
          && this.getGoodList.filter(item => item.checked).length
          === this.getGoodList.length;
      }
    },

    methods: {
      totalClick() {//切换全选功能
        this.$store.commit(CHANGECHECKED, !this.isTotalChecked);
      },

      toCalculate() {//点击了结算按钮
        const isEmpty = !!this.getGoodList.filter(item => item.checked).length;//判断购物车是否有选中的商品
        this.$emit('toCalculate',isEmpty);
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 999;

    height: 40px;

    font-size: 10px;

    background-color: rgb(230, 230, 230);
  }

  .left, .center, .right {
    display: flex;
  }

  .left {
    width: 80px;
  }

  .center {
    flex: 1;
  }

  .check-button {
    margin: 0 8px 0 8px;
  }

  .right {
    display: inline-block;

    width: 80px;
    height: 40px;

    text-align: center;
    line-height: 40px;
    color: white;

    background-color: orangered;
  }


</style>
