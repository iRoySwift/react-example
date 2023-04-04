/*
 * @Author: Roy
 * @Date: 2022-04-14 01:02:45
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-18 17:17:22
 * @Description: topo数据格式化
 */

import { sortedUniq, uniq } from 'lodash';
import { statusMap } from '../model/config';
import { iEdgeConfig, iGraphData, iNodeConfig } from './../typings/index';
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
    const groupId = item.model.compGroupId || 1;
    groupObj[groupId].push(item);
  });
  newTopo.combos = topoData.combos;
  if (isErrorData(topoData.nodes)) {
    calcCoodXY(groupObj);
  }
  topoData.edges.forEach((item) => {
    newTopo.edges.push(setEdgeStatus(item));
  });
  Object.keys(groupObj).forEach((item: any) => {
    groupObj[item].forEach((el: any) => {
      el.model.isSaved = !!el.instanceCode;
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
};

/**
 * 更新节点状态
 * @param topoData
 * @returns
 */
const setNodeStatus: (node: iNodeConfig) => iNodeConfig = (node: iNodeConfig) => {
  node.icon = {};
  node.style = {};
  node.icon.img = node.model.icon;
  node.style.stroke = statusMap[node.model!.status || 0];
  return node;
};

const setEdgeStatus: (edge: iEdgeConfig) => iEdgeConfig = (edge: iEdgeConfig) => {
  edge.iconColor = statusMap[edge!.status || 0];
  return edge;
};

export { formDataTransfer, setNodeStatus, setEdgeStatus };
