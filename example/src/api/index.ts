import axios from '@/utils/axios/index';

/** 获取test数据 */
export const getData = (params) => {
  return axios.get({ url: '/todos/1', params, isSys: true });
};

/** 保存通道信息 */
export const saveChannelExtend = (data) => {
  return axios.post({
    url: `/channel-extend/save`,
    isSys: true,
    data
  });
};
