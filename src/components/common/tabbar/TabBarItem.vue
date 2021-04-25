<template>
  <!-- 绑定点击事件 -->
  <div class="tab-bar-item" @click="itemClick">
    <!--  建议动态属性等写在父标签上,防止写在插槽上而当插槽被替换后丢失这些属性  -->
    <div v-show="!isActive">
      <slot name="item-icon"></slot>
    </div>

    <div v-show="isActive">
      <slot name="item-icon-active"></slot>
    </div>

    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",

    data() {
      return {}
    },

    computed: {
      isActive() {//计算属性isActive用于动态计算当前状态
        return this.$route.path == this.path;
      },
      activeStyle() {//设置活跃时的颜色
        return this.isActive ? {color: this.activeColor} : {}
      }
    },

    props: {
      path: String,
      activeColor: {//可以自定义传入颜色
        type: String,
        default: 'red'
      }
    },

    methods: {
      itemClick() {
        if (this.$route.path != this.path) {
          this.$router.push(this.path);//设置路由跳转
        }
      }
    }
  }
</script>

<style scoped>

  .tab-bar-item {

    list-style: none;
    flex: 1; /* flex属性加在(flex布局的容器中的)项目上用于决定项目是否随之容器的放缩而放缩(无视宽高的设置) */
    text-align: center;

    font-size: 14px;

  }

  /*注意scoped对slot插入的元素不起作用*/
  .tab-bar-item /deep/ img { /* 深度穿透让slot插入的元素样式起作用 */

    width: 24px;
    height: 24px;

    margin-top: 3px;
    margin-bottom: 3px;

    vertical-align: middle; /* 消除图片底部空白缝隙 */

  }

</style>
