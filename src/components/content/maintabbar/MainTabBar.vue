<template>
  <tab-bar>

    <tab-bar-item path="/home" activeColor="red">
      <template v-slot:item-icon>
        <img src="~assets/img/TabBarImg/home.svg" alt="首页">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/TabBarImg/home_active.svg" alt="首页">
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>

    <tab-bar-item path="/category" activeColor="red">
      <template v-slot:item-icon>
        <img src="~assets/img/TabBarImg/category.svg" alt="分类">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/TabBarImg/category_active.svg" alt="分类">
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>

    <tab-bar-item path="/cart" activeColor="red">
      <template v-slot:item-icon>
        <img src="~assets/img/TabBarImg/shopcart.svg" alt="购物车">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/TabBarImg/shopcart_active.svg" alt="购物车">
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>

    <tab-bar-item path="/profile" activeColor="red">
      <template v-slot:item-icon>
        <img src="~assets/img/TabBarImg/profile.svg" alt="我的">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/TabBarImg/profile_active.svg" alt="我的">
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>

  </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem' //由于需要在当前组件中引用，直接在当前组件中注册即可(如果只在TabBar组件中注册,无法在当前组件中引用TabBarItem标签)

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
