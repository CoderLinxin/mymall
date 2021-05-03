<template>
  <div id="app">
    <!--  视图部分  -->
    <router-view v-slot="{ Component }">
      <!--   注意详情页组件需要重新创建(重新请求数据)   -->
      <keep-alive exclude="detail">
        <component :is="Component"/>
      </keep-alive>
    </router-view>

    <!--  底部导航栏  -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/maintabbar/MainTabBar'

  export default {
    name: "App",

    components: {
      MainTabBar
    }
  }
</script>

<style scoped>
  @import "./assets/css/base.css";

  #app {

  }
</style>
