// //将Toast封装成Vue的一个插件
// import PopupConstructor from './Toast'//组件构造器
// import {createVNode, render,createApp} from 'vue';
//
// // const obj = function ( options) {//执行install方法来进行插件的初始化
// //   const container = document.createElement('div')
// //   //创建虚拟节点
// //   const vm = createVNode(
// //     Toast,
// //     options,
// //   )
// //   //渲染虚拟节点
// //   render(vm, container);
// //   document.body.appendChild(container);
// // }
// //
// // export default {
// //   //组件祖册
// //   install(App, options) {
// //     // App.config.globalProperties.$toast = obj;
// //     // console.log(App.config.globalProperties.$toast);
// //   }
// // }
// // export default obj;//导出插件对象
//
// let $inst
// // 创建挂载实例
// let createMount = (opts) => {
//   const mountNode = document.createElement('div')
//   document.body.appendChild(mountNode)
//
//   const app = createApp(PopupConstructor, {
//     ...opts, modelValue: true,
//     remove() {
//       app.unmount(mountNode)
//       document.body.removeChild(mountNode)
//     }
//   })
//   return app.mount(mountNode)
// }
//
// function V3Popup(options = {}) {
//   options.id = options.id || 'v3popup_' + generateId()
//   $inst = createMount(options)
//
//   return $inst
// }
//
// V3Popup.install = app => {
//   app.component('v3-popup', PopupConstructor)
//   app.config.globalProperties.$v3popup = V3Popup
//   // app.provide('v3popup', V3Popup)
// }
//
// export default V3Popup
