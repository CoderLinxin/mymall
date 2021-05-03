import {
  CHANGEIMAGESTATE,
  ADDGOODSCOUNT,
  ADDTOCART,
  ACHANGEIMAGESTATE,
  AADDCART
} from 'common/constant'

export default {
  [ACHANGEIMAGESTATE](context, payload) {//异步更新imageLoaded的状态
    context.commit(CHANGEIMAGESTATE, payload);
  },

  [AADDCART](context, product) {//更新购物车中的商品列表信息
    return new Promise((resolve, reject) => {
      //1.判断加入购物车的商品是否是同一个商品
      const sameProduct = context.state.goodsList.find(item => item.iid === product.iid);//返回购物车中的那个相同的商品

      //2.更新购物车数据
      if (sameProduct) {//购物车中有此商品
        context.commit(ADDGOODSCOUNT, sameProduct);//更新购物车中相同商品的数量
        resolve('商品数量加一');
      } else {//购物车中无此商品
        context.commit(ADDTOCART, product);//添加新商品到购物车中
        resolve('成功添加商品到购物车');
      }
    })
  }
}
