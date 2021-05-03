<!-- 页面中部导航栏 -->
<template>

  <div class="middle-tab-bar">
    <div v-for="(item ,index) in titles "
         class="middle-tab-bar-item"
         @click="itemClick(index)"
         :class="{active:$store.state.currentIndex==index}"
         :key="index">
      <span>{{item}}</span>
    </div>
  </div>

</template>

<script>
  import {CHANGEINDEX} from 'common/constant'

  export default {
    name: "MiddleTabBar",

    props: {
      titles: {//分类标题
        type: Array,
        default() {
          return [];
        }
      },
      scrollPosition: {//记录页面的滚动位置
        type: Number,
        default: 0
      }
    },

    methods: {
      itemClick(index) {
        //切换类型后保存上一次切换的位置
        const preIndex = this.$store.state.currentIndex;
        this.$bus.$emit('savePosition', preIndex);

        this.$store.commit(CHANGEINDEX, index);//更新currentIndex
        this.$emit('switchGoods');//发送事件准备切换类别展示
      }
    }
  }
</script>

<style scoped>
  .middle-tab-bar {
    display: flex;

    text-align: center;
    font-size: 15px;
    line-height: 40px;

    height: 40px;
    background-color: #fff;
  }

  .middle-tab-bar-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
