import { config } from './config';
import { service, sysService } from './service';

const { default_headers } = config;

const request = (option: any) => {
  const { url, method, params, data, headersType, responseType, isSys } = option;
  let targetService;
  if (isSys) {
    targetService = sysService;
  } else {
    targetService = service;
  }
  console.log('🚀 ~ file: index.ts:25 ~ request ~ signal:', params);
  return targetService({
    url: url,
    method,
    params,
    data,
    responseType: responseType,
    signal: params?.signal,
    headers: {
      'Content-Type': headersType || default_headers
    }
  });
};

const aixos = {
  get: async <T = any>(option: any) => {
    console.log('🚀 ~ file: index.ts:57 ~ aixos.option:', option);

    const res = await request({ method: 'GET', ...option });
    return res.data as unknown as T;
  },
  post: async <T = any>(option: any) => {
    const res = await request({ method: 'POST', ...option });
    return res.data as unknown as T;
  },
  postOriginal: async (option: any) => {
    const res = await request({ method: 'POST', ...option });
    return res;
  },
  delete: async <T = any>(option: any) => {
    const res = await request({ method: 'DELETE', ...option });
    return res.data as unknown as T;
  },
  put: async <T = any>(option: any) => {
    const res = await request({ method: 'PUT', ...option });
    return res.data as unknown as T;
  },
  download: async <T = any>(option: any) => {
    const res = await request({ method: 'GET', responseType: 'blob', ...option });
    return res as unknown as Promise<T>;
  },
  upload: async <T = any>(option: any) => {
    option.headersType = 'multipart/form-data';
    const res = await request({ method: 'POST', ...option });
    return res as unknown as Promise<T>;
  }
};

export default aixos;
