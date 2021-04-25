<template>
  <!-- 顶部导航栏同样分三个部分来划分 -->
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  }

  .left, .right { /* 顶部导航栏左右部分设置固定宽度 */
    width: 60px;
  }

  .center { /* 顶部导航栏中间部分自动适应 */
    flex: 1;
  }
</style>
