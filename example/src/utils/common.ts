/**
 * 数组去重
 * @param {*} arr
 * @param {*} key
 */
export function arrayJsonRepeatFilter(arr, key) {
  const obj = {};
  return arr.reduce((total, item) => {
    // eslint-disable-next-line no-unused-expressions
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    obj[item[key]] ? '' : (obj[item[key]] = true && total.push(item));
    return total;
  }, []);
}

/**
 * 函数防抖
 */
export function debounce(fn, delay) {
  // @ts-ignore
  let timer: NodeJS.Timeout = null;
  delay = delay || 1000;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 函数节流
 */
export function throttle(fn, delay) {
  let lastTime;
  let timer;
  delay = delay || 1000;
  return (...args) => {
    // 记录当前函数触发的时间
    const nowTime = Date.now();
    if (lastTime && nowTime - lastTime < delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // 记录上一次函数触发的时间
        lastTime = nowTime;
        // 修正this指向问题
        // @ts-ignore
        fn.apply(this, args);
      }, delay);
    } else {
      lastTime = nowTime;
      // @ts-ignore
      fn.apply(this, args);
    }
  };
}

// 文件下载
export function exportFile(data, filename) {
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
export function downloadUrl(url) {
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

// 下载图片
export function downImage(url) {
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.target = '_blank';
  link.setAttribute('download', 'down');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// json 转formdata
export function jsonToFormdata(json) {
  const formData = new FormData();
  Object.keys(json).forEach((item) => {
    formData.append(item, json[item]);
  });
  return formData;
}
