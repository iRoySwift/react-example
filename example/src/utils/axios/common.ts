import errorCode from './errorCode';
import { service } from './service';
import { saveAs } from 'file-saver';

/**
 * 验证是否为blob格式
 * @param data
 * @returns
 */
export async function blobValidate(data) {
  try {
    const text = await data.text();
    JSON.parse(text);
    return false;
  } catch (error) {
    return true;
  }
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = '';
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + '=';
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== 'undefined') {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + '=';
            result += subPart + encodeURIComponent(value[key]) + '&';
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&';
      }
    }
  }
  return result;
}

// 通用下载方法
export function download(url, params, filename) {
  //   downloadLoadingInstance = ElLoading.service({ text: '正在下载数据，请稍候', background: 'rgba(0, 0, 0, 0.7)' });
  alert({ text: '正在下载数据，请稍候', background: 'rgba(0, 0, 0, 0.7)' });
  return service
    .post(url, params, {
      transformRequest: [
        (params) => {
          return tansParams(params);
        }
      ],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob'
    })
    .then(async (data: any) => {
      const isBlob = await blobValidate(data);
      if (isBlob) {
        const blob = new Blob([data]);
        saveAs(blob, filename);
      } else {
        const resText = await data.text();
        const rspObj = JSON.parse(resText);
        const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default'];
        alert(errMsg);
      }
      // downloadLoadingInstance.close();
    })
    .catch(() => {
      alert('下载文件出现错误，请联系管理员！');
      // downloadLoadingInstance.close();
    });
}
