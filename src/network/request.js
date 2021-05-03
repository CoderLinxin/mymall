//引入axios框架
import axios from 'axios';

//导出封装的request对象
export function request(config) {

  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',//后续可能会改
    timeout: 5000,
  });

  //请求发送前进行拦截
  instance.interceptors.request.use(
    config => config,
    error => error
  );

  //服务器响应成功后进行拦截
  instance.interceptors.response.use(
    result => result.data,
    error => error
  );

  return instance(config);

};




