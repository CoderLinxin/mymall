//封装一些关于详情页的网络请求
import {request} from './request'

//获取详情页数据
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

//获取推荐页数据
export function getRecommend() {
  return request({
    url: "/recommend"
  }).catch(err => err);
}

//详情页的商品信息相关数据（整合成一个对象）
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice//此价格用于记录加入购物车的商品价格(用户挑选特定规格特定价格的功能待完善)
  }
}

//详情页商店信息相关数据（整合成一个对象）
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

//详情页商品参数相关数据（整合成一个对象）
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
