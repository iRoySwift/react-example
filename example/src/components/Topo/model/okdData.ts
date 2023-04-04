/*
 * @Author: Roy
 * @Date: 2022-07-22 17:43:35
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-25 09:24:03
 * @Description: 模拟数据
 */
import { iGraphData } from '../typings';

export const TopoData: iGraphData = {
  combos: [],
  nodes: [
    { id: '925e3b2a-7e6a-40c8-ad23-1f73b64513b8', serviceId: '150', x: null, y: 0, label: '11233', instanceCode: '1', resourceType: 'k8s', model: { modelId: 8, modelCode: 'redis', modelName: 'Redis', status: '2', tooltip: { 部署模式: '标准版', 服务实例编码: 'redis_aliyun-4rojv8kr', 规格: '2C1G', 版本号: '5.0' }, icon: '/icon/redis.svg', compGroupId: 4 }, createType: 'IMPORT' },
    { id: '016c39e7-642a-4927-a7a2-464a2c11f9f4', serviceId: '170', x: 200, y: 0, label: 'DNS_KKKKK1111', instanceCode: 'DNS_KKKKK1111000', resourceType: 'other', model: { modelId: 2, modelCode: 'dns', modelName: 'DNS', status: '2', tooltip: { 部署模式: '标准版', 服务实例编码: 'redis_aliyun-4rojv8kr', 规格: '2C1G', 版本号: '5.0' }, icon: '/icon/dns.svg', compGroupId: 1 }, createType: 'IMPORT' },
    { id: '2481a892-b954-41a2-9ed2-f00ccdffcaf8', serviceId: '179', x: 600, y: 0, label: 'wqw', instanceCode: 'xxljob-0lynqgi0', resourceType: 'other', model: { modelId: 6, modelCode: 'xxljob', modelName: 'xxl-job', status: '2', tooltip: { 部署模式: '标准版', 服务实例编码: 'redis_aliyun-4rojv8kr', 规格: '2C1G', 版本号: '5.0' }, icon: '/icon/xxljob.svg', compGroupId: 3 }, createType: 'IMPORT' },
    { id: '532ef430-811e-4e70-8428-b0dc1c8989d0', serviceId: '193', x: 400, y: 0, label: 'ss', instanceCode: 'a', resourceType: 'k8s', model: { modelId: 3, modelCode: 'tomcat', modelName: 'Tomcat', status: '2', tooltip: { 部署模式: '标准版', 服务实例编码: 'redis_aliyun-4rojv8kr', 规格: '2C1G', 版本号: '5.0' }, icon: '/icon/tomcat.svg', compGroupId: 2 }, createType: 'IMPORT' },
    { id: '9ed46bcb-6487-4c13-ab5b-6b6300d81ae4', serviceId: '209', x: 200, y: 150, label: '221', instanceCode: '312', resourceType: 'other', model: { modelId: 1, modelCode: 'lb', modelName: 'LB', status: '2', tooltip: { 部署模式: '标准版', 服务实例编码: 'redis_aliyun-4rojv8kr', 规格: '2C1G', 版本号: '5.0' }, icon: '/icon/lb.svg', compGroupId: 1 }, createType: 'IMPORT' }
  ],
  edges: []
};

export const submit = {
  combos: [],
  nodes: [
    {
      id: 'a9b8c262-e427-4916-a96a-439433167bf5',
      x: 116,
      y: -78.75,
      modelCode: 'mysql',
      comboId: null
    }
  ],
  edges: [{ id: '2cc653bc-4d03-43fd-990c-16b251f61838', source: '8cc653bc-4d03-43fd-990c-16b251f61838', target: 'a9b8c262-e427-4916-a96a-439433167bf5' }]
};
