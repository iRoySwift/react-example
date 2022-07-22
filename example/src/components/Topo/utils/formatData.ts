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
import { iGraphData, iNodeConfig } from './../typings/index';
type iGroupType = {
  [key: string | number]: any[];
};

const isErrorData = (nodes: iNodeConfig[]) => {
  return nodes.some((item) => (!item.x || !item.y) && item.y !== 0);
};

const formDataTransfer: (topoData: iGraphData, _: any, compTypes: any) => iGraphData = (topoData, _, compTypes) => {
  const newTopo: iGraphData = { edges: [], nodes: [], combos: [] };
  let arr = compTypes.map((item: any) => item.compGroupId);
  const group: number[] = sortedUniq(uniq(arr));
  const groupObj: iGroupType = {};
  group.forEach((item: string | number) => {
    groupObj[item] = [];
  });
  topoData.nodes?.forEach((item: iNodeConfig) => {
    const groupId = item.model.groupId || 1;
    groupObj[groupId] = groupObj[groupId] || [];
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
      newTopo.nodes?.push(setNodeStatus(el));
    });
  });
  return newTopo;
};

/**
 * 计算节点位置
 * @param groupObj
 * @returns
 */
const calcCoodXY = (groupObj: iGroupType) => {
  Object.keys(groupObj).forEach((key: any) => {
    groupObj[key].forEach((el: iNodeConfig, i) => {
      el.x = key * 200;
      el.y = i * 150;
    });
  });
  return groupObj;
};

/**
 * 更新节点状态
 * @param topoData
 * @returns
 */
const setNodeStatus: (node: iNodeConfig) => iNodeConfig = (node: iNodeConfig) => {
  const status: { [key: string]: string } = {
    0: '#DDDDDD', //'未配置',
    1: '#3F52B4', //'部署中',
    2: '#7DC856', //'部署成功',
    3: '#FF093E', //'部署失败',
    4: '#7DC856' //'已录入'
  };

  node.icon = {};
  node.style = {};
  node.icon.img = node.model.img;
  node.style.stroke = status[node.model!.status || 0];
  return node;
};

export { formDataTransfer, setNodeStatus };
