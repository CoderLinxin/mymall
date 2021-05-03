<!-- 详情页导航栏 -->
<template>
  <div>
    <Nav>
      <!--   左侧返回按钮   -->
      <template v-slot:left>
        <div @click="backClick">
          <img src="~assets/img/common/back.svg" alt="" class="back">
        </div>
      </template>

      <!--   详情页标题   -->
      <template v-slot:center>
        <div class="detail-nav">
          <div v-for="(item,index) in titles"
               class="title"
               @click="titleClick(index)"
               :class="{active:currentIndex === index}"
          >{{item}}
          </div>
        </div>
      </template>
    </Nav>
  </div>
</template>

<script>
  import Nav from 'components/common/navbar/NavBar'

  export default {
    name: "detailNav",
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },

    components: {
      Nav
    },

    methods: {
      titleClick(index) {
        this.currentIndex = index;

        //发送事件给detail组件
        this.$emit('titleClick',index);
      },

      backClick() {
        this.$router.back();//返回
      }
    }
  }
</script>

<style scoped>
  .detail-nav {
    display: flex;
    font-size: 14px;
  }

  .title {
    flex: 1;
  }

  .active {
    color: var(--color-tint);
  }

  .back {
    vertical-align: middle;
  }
</style>
