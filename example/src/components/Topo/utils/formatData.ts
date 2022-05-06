// 网络：
// 负载均衡、域名
// 运行时：
// Tomcat、Node.js、Python
// 基础组件：
// xxl-job
// 数据库：
// MySQL、Redis
// 自定义：
// xxxxx

import { sortedUniq, uniq } from 'lodash';
import { iGraphData, iGroupType, iNodeConfig } from '../typings';

const isErrorData = (nodes: iNodeConfig[]) => {
  return nodes.some((item) => (!item.x || !item.y) && item.y != 0);
};

export const formDataTransfer: (topoData: iGraphData, _: any, compTypes: any) => iGraphData = (topoData, _, compTypes) => {
  const newTopo: iGraphData = { edges: [], nodes: [], combos: [] };
  let arr = compTypes.map((item: any) => item.compGroupId);
  const group: number[] = sortedUniq(uniq(arr));
  const groupObj: iGroupType = {};
  group.forEach((item: string | number) => {
    groupObj[item] = [];
  });
  topoData.nodes?.forEach((item: iNodeConfig) => {
    const groupId = item.model.groupId || 1;
    groupObj[groupId].push(item);
  });
  newTopo.edges = topoData.edges;
  newTopo.combos = topoData.combos;
  newTopo.nodes = [];
  let nodesObj = groupObj;
  if (isErrorData(topoData.nodes)) {
    nodesObj = calcCoodXY(groupObj);
  }
  Object.keys(nodesObj).forEach((item: any) => {
    nodesObj[item].forEach((el: any) => {
      newTopo.nodes?.push(el);
    });
  });
  return sefDefaultConfig(newTopo);
};

const calcCoodXY = (groupObj: iGroupType) => {
  Object.keys(groupObj).forEach((key: any) => {
    groupObj[key].forEach((el: iNodeConfig, i) => {
      el.x = key * 200;
      el.y = i * 150;
    });
  });
  return groupObj;
};

export const sefDefaultConfig: (topoData: iGraphData) => iGraphData = (topoData: iGraphData) => {
  topoData.nodes?.forEach((node: iNodeConfig) => {
    node.icon = {
      show: true,
      // img: "https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg",
      width: 60,
      height: 60,
      fill: '#d3dbe1',
      img: node.model.img
    };
  });
  return topoData;
};
