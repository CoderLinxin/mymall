import {createStore} from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  currentIndex: 0,//用于同步(两个)中部导航栏的分类索引
  imageLoaded: true,//标记页面中图片的加载状态
  positions: [0, 0, 0],//用于分别保存中部导航了栏目三个分类的位置(y轴)
  goodsList: [],//用户存储用户添加在购物车中的商品列表信息}
};

export default createStore({
  state,

  mutations,

  actions,

  getters,
  
  modules: {}
})
