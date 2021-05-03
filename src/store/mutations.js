import {
  CHANGEINDEX,
  CHANGEIMAGESTATE,
  CHANGEPOSITION,
  CHANGECHECKED,
  ADDGOODSCOUNT,
  ADDTOCART,
} from 'common/constant'

export default {
  [CHANGEINDEX](state, index) {//更新currentIndex
    state.currentIndex = index;
  },

  [CHANGEIMAGESTATE](state, isLoad) {//更新imageLoaded的状态
    state.imageLoaded = isLoad;
  },

  [CHANGECHECKED](state, isTotalChecked) {//切换所有商品的checked属性
    state.goodsList.map((item) => item.checked = isTotalChecked);
  },

  [CHANGEPOSITION](state, payload) {//更新positions中的位置信息
    state.positions[payload.index] = payload.position;
  },

  [ADDGOODSCOUNT](state, sameProduct) {//相同商品数量加一
    sameProduct.count++;
  },

  [ADDTOCART](state, product) {//添加新商品到购物车
    product.count = 1;//初始化新商品数量为1
    product.checked = true;//购物车中默认选中该商品
    state.goodsList.push(product);//将新商品加入购物车商品列表
  }
};
