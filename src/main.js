import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bus from './bus' //引入事件总线模块
// import VueLazyLad from 'vue-lazyload'//图片懒加载
import FastClick from 'fastclick'//解决移动端延迟300ms点击问题

FastClick.attach(document.body);

import toast from 'components/common/toast'//引入toast插件(会自动查找该目录下的index.js)

const app = createApp(App);

// app.use(toast,111);//使用use方法安装插件会自动调用导入对象toast的install方法

app.config.globalProperties.$bus = bus;//总线对象挂载到全局
// app.use(VueLazyLad, {
//   loading: require('./assets/img/common/placeholder.png')
// });
app.use(store).use(router).mount('#app');
