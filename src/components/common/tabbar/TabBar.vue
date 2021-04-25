<template>
  <div id="TabBar">

    <!--  表示整个导航栏外面套一层标签用于设置一些属性  -->
    <div class="tab-bar">
      <slot></slot>
    </div>

  </div>
</template>

<script>
  export default {
    name: "TabBar",
  }
</script>

<style scoped>
  .tab-bar {

    display: flex; /* 弹性盒子布局(加在容器上)(可以自由控制子元素的排列方式(列或行)) */
    background-color: #f6f6f6;
    height: 49px;

    position: fixed; /* 采用固定定位(相对于浏览器窗口) */
    left: 0;
    right: 0;
    bottom: 0;

    box-shadow: 0 -2px 1px rgba(100, 100, 100, .15);

  }
</style>
