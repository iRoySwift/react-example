/*
 * @Author: Roy
 * @Date: 2022-04-13 23:06:05
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-12 11:51:09
 * @Description: js 通用方法
 */
/**
 * child extend parent
 * @param Child child
 * @param Parent parent
 */
function extend(Child, Parent) {
  // 只继承与原型实现函数继承的抽象
  // 基于原型的继承中，若所有protetype都指向一个相同的对象，父对象就会子对象的影响_proto_连接原型
  var F = function () {}; //函数F用来打破连锁关系
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  Child.uber = Parent.prototype; //提供子类型访问父类型元素的方式uber指向父类型
}

/**
 * 数组去重
 * @param {*} arr
 * @param {*} key
 */
function arrayJsonRepeatFilter(arr, key) {
  const obj = {};
  return arr.reduce((total, item) => {
    // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
    obj[item[key]] ? '' : (obj[item[key]] = true && total.push(item));
    return total;
  }, []);
}

/**
 * 函数防抖
 */
function debounce(fn, delay) {
  let timer: NodeJS.Timeout | undefined = undefined;
  delay = delay || 1000;
  return function (this: any, ...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 函数节流
 */
function throttle(fn, delay) {
  let lastTime;
  let timer;
  delay = delay || 1000;
  return function (this: any, ...args) {
    // 记录当前函数触发的时间
    const nowTime = Date.now();
    if (lastTime && nowTime - lastTime < delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // 记录上一次函数触发的时间
        lastTime = nowTime;
        // 修正this指向问题
        fn.apply(this, args);
      }, delay);
    } else {
      lastTime = nowTime;
      fn.apply(this, args);
    }
  };
}

// 文件下载
function exportFile(data, filename) {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 模板下载URL
function downloadUrl(url) {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;
  document.body.appendChild(iframe);
  iframe.onload = function () {
    setTimeout(() => {
      document.body.removeChild(iframe);
    });
  };
}

// json 转formdata
function jsonToFormdata(json) {
  const formData = new FormData();
  Object.keys(json).forEach((item) => {
    formData.append(item, json[item]);
  });
  return formData;
}

export { extend, arrayJsonRepeatFilter, debounce, throttle, exportFile, downloadUrl, jsonToFormdata };
