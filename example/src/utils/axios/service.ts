import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Recordable, config } from './config';
import qs from 'qs';
import errorCode from './errorCode';
import { getRefreshToken, getToken, removeToken, setToken } from './auth';

const { base_url, sys_base_url, request_timeout, result_code } = config;

// 需要忽略的提示。忽略后，自动 Promise.reject('error')
const ignoreMsgs = [
  '无效的刷新令牌', // 刷新令牌被删除时，不用提示
  '刷新令牌已过期' // 使用刷新令牌，刷新获取新的访问令牌时，结果因为过期失败，此时需要忽略。否则，会导致继续 401，无法跳转到登出界面
];
// 是否显示重新登录
export const isRelogin = { show: false };
// Axios 无感知刷新令牌，参考 https://www.dashingdog.cn/article/11 与 https://segmentfault.com/a/1190000020210980 实现
// 请求队列
let requestList: any[] = [];
// 是否正在刷新中
let isRefreshToken = false;
// 请求白名单，无须token的接口
const whiteList: string[] = ['/login', '/refresh-token'];

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: base_url,
  // 超时
  timeout: request_timeout,
  withCredentials: false // 禁用 Cookie 等信息
});

const requestOnFulfilled = (config: InternalAxiosRequestConfig) => {
  console.log('🚀 ~ file: service.ts:34 ~ requestOnFulfilled ~ config:', config);
  // 是否需要设置 token
  let isToken = (config!.headers || {}).isToken === false;
  whiteList.some((v) => {
    if (config.url) {
      config.url.indexOf(v) > -1;
      return (isToken = false);
    }
  });
  if (getToken() && !isToken) {
    (config as Recordable).headers.Authorization = 'Bearer ' + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  const params = config.params || {};
  const data = config.data || false;
  if (
    config.method?.toUpperCase() === 'POST' &&
    (config.headers as AxiosRequestHeaders)['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    config.data = qs.stringify(data);
  }
  // get参数编码
  if (config.method?.toUpperCase() === 'GET' && params) {
    let url = config.url + '?';
    for (const propName of Object.keys(params)) {
      const value = params[propName];
      if (value !== void 0 && value !== null && typeof value !== 'undefined') {
        if (typeof value === 'object') {
          for (const val of Object.keys(value)) {
            const params = propName + '[' + val + ']';
            const subPart = encodeURIComponent(params) + '=';
            url += subPart + encodeURIComponent(value[val]) + '&';
          }
        } else {
          url += `${propName}=${encodeURIComponent(value)}&`;
        }
      }
    }
    // 给 get 请求加上时间戳参数，避免从缓存中拿数据
    // const now = new Date().getTime()
    // params = params.substring(0, url.length - 1) + `?_t=${now}`
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  console.log('🚀 ~ file: service.ts:76 ~ requestOnFulfilled ~ config:', config);
  return config;
};
const requestOnRejected = (error: AxiosError) => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
};
const refreshToken = async () => {
  return await axios.post(base_url + '/system/auth/refresh-token?refreshToken=' + getRefreshToken());
};
const handleAuthorized = () => {
  if (!isRelogin.show) {
    isRelogin.show = true;
    removeToken();
    isRelogin.show = false;
    // 干掉token后再走一次路由让它过router.beforeEach的校验
    window.location.reload();
  }
  return Promise.reject('登录超时,请重新登录!');
};

const responseOnFulfilled = async (response: AxiosResponse<any>) => {
  const { data } = response;
  const config = response.config;
  if (!data) {
    // 返回“[HTTP]请求没有返回值”;
    throw new Error();
  }
  // 未设置状态码则默认成功状态
  const code = data.code || result_code;
  // 二进制数据则直接返回
  if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
    return response.data;
  }
  // 获取错误信息
  const msg = data.msg || errorCode[code] || errorCode['default'];
  if (ignoreMsgs.indexOf(msg) !== -1) {
    // 如果是忽略的错误码，直接返回 msg 异常
    return Promise.reject(msg);
  } else if (code === 401) {
    if (!isRefreshToken) {
      isRefreshToken = true;
      // 1. 如果获取不到刷新令牌，则只能执行登出操作
      if (!getRefreshToken()) {
        return handleAuthorized();
      }
      // 2. 进行刷新访问令牌
      try {
        const refreshTokenRes = await refreshToken();
        // 2.1 刷新成功，则回放队列的请求 + 当前请求
        setToken((await refreshTokenRes).data.data);
        config.headers!.Authorization = 'Bearer ' + getToken();
        requestList.forEach((cb: any) => {
          cb();
        });
        requestList = [];
        return service(config);
      } catch (e) {
        // 为什么需要 catch 异常呢？刷新失败时，请求因为 Promise.reject 触发异常。
        // 2.2 刷新失败，只回放队列的请求
        requestList.forEach((cb: any) => {
          cb();
        });
        // 提示是否要登出。即不回放当前请求！不然会形成递归
        return handleAuthorized();
      } finally {
        requestList = [];
        isRefreshToken = false;
      }
    } else {
      // 添加到队列，等待刷新获取到新的令牌
      return new Promise((resolve) => {
        requestList.push(() => {
          config.headers!.Authorization = 'Bearer ' + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
          resolve(service(config));
        });
      });
    }
  } else if (code === 500) {
    console.log(msg);
    return Promise.reject(new Error(msg));
  } else if (code !== 200) {
    if (msg === '无效的刷新令牌') {
      // hard coding：忽略这个提示，直接登出
      console.log(msg);
    } else {
      console.log(msg);
    }
    return Promise.reject('error');
  } else {
    return data;
  }
};

const responseOnRejected = (error: AxiosError) => {
  let { message } = error;
  if (message === 'Network Error') {
    message = '后端接口连接异常';
  } else if (message.includes('timeout')) {
    message = '系统接口请求超时';
  } else if (message.includes('Request failed with status code')) {
    message = '系统接口' + message.substr(message.length - 3) + '异常';
  }
  return Promise.reject(error);
};
// 请求拦截
service.interceptors.request.use(requestOnFulfilled, requestOnRejected);
// 响应拦截器
service.interceptors.response.use(responseOnFulfilled, responseOnRejected);

// 创建axios实例
const sysService: AxiosInstance = axios.create({
  baseURL: sys_base_url, // api 的 base_url
  timeout: request_timeout, // 请求超时时间
  withCredentials: false // 禁用 Cookie 等信息
});

// request拦截器
sysService.interceptors.request.use(requestOnFulfilled, requestOnRejected);

// response 拦截器
sysService.interceptors.response.use(responseOnFulfilled, responseOnRejected);

export { service, sysService };
