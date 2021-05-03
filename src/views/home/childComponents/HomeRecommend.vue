<!-- 首页推荐模块 -->
<template>
  <div class="recommend">

    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>

  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props: {
      recommends: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;

    text-align: center;
    font-size: 15px;

    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;

  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item a {
    display: inline-block;
  }

  .recommend-item img {
    width: 85%;
    margin-bottom: 12px;
  }
</style>
