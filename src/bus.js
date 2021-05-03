//事件总线
import mitt from "mitt";

const bus = {};
const emitter = mitt();

bus.$on = emitter.on;//用于订阅事件总线上的事件
bus.$off = emitter.off;//用于取消订阅
bus.$emit = emitter.emit;//用于发布事件到事件总线上

export default bus;
