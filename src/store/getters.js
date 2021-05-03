export default {
  getGoodsListLength(state) {//获取购物车中商品的数量
    let count = 0, i = 0;
    while (i < state.goodsList.length) {
      count += state.goodsList[i].count;
      i++;
    }
    return count;
  },

  getGoodList(state) {//获取购物车中的商品列表
    return state.goodsList;
  }

}
