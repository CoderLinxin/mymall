<!-- 弹窗组件 -->
<template>
  <div class="toast" v-show="isShow">{{message}}</div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: '',
        isShow: false,
      }
    },

    methods: {
      show(message, duration = 2000) {//显示弹窗
        console.log(555);
        this.message = message;
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;//关闭弹窗
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;

    padding: 10px;

    color: white;

    opacity: 1;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, .7);
  }
</style>
