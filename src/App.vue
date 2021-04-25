<template>
  <div id="app">
    <router-view></router-view>
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/maintabbar/MainTabBar'

  export default {
    name: "App",
    data() {
      return {}
    }, components: {
      MainTabBar
    }
  }
</script>

<style scoped>
  @import "./assets/css/base.css";

  #app {
  }
</style>
