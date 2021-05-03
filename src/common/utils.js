//用于封装一些工具方法
export function debounce(func, delay = 100) {//防抖函数
  let timer = null;//只作声明作用
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);//使用apply更有弹性(本案例直接调用func也可以)
    }, delay)
  }
}

// 对时间戳进行格式化
export function formatDate(date, fmt) {
  //1.匹配年并替换到fmt(格式化字符串)中
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  //2.匹配其他时间并相应替换
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}

//确保分时秒这三个单位都是两位数
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

//1.对于只有一位数的情况:需要在左边补一个0, len=1 （加1个0 => 加(2-len)个0）
//2.对于只有两位数的情况:不需要再补0,       len=2 （加0个0 => 加(2-len)个0）
