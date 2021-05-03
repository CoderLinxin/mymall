/* 用于封装一些home(主页)相关的网络请求 */

import {request} from './request'

//获取multidata接口的数据
export function getHomeMultidata() {

  return request({
    url: '/home/multidata'
  });

}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type: type,
      page: page
    }
  });
}
