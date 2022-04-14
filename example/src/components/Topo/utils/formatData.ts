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
type iTopo = {
  edges: any[];
  nodes: any[];
  combos: any[];
};
type iGroupType = {
  [key: number]: any[];
};

export const formDataTransfer = (topoData: any, _: any, compTypes: any) => {
  const newTopo: iTopo = { edges: [], nodes: [], combos: [] };
  let arr = compTypes.map((item: any) => item.compGroupId);
  const group: number[] = sortedUniq(uniq(arr));
  const groupObj: iGroupType = {};
  group.forEach((item: number) => {
    groupObj[item] = [];
  });
  topoData.nodes.forEach((item: any) => {
    const groupId = item.model.groupId || 1;
    groupObj[groupId].push(item);
  });
  newTopo.edges = topoData.edges;
  newTopo.combos = topoData.combos;
  let nodesObj = calcCoodXY(groupObj);
  Object.keys(nodesObj).forEach((item: any) => {
    nodesObj[item].forEach((el: any) => {
      newTopo.nodes.push(el);
    });
  });
  return sefDefaultConfig(newTopo);
};

const calcCoodXY = (groupObj: { [key: number]: any[] }) => {
  Object.keys(groupObj).forEach((key: any) => {
    groupObj[key].forEach((el, i) => {
      el.x = key * 200;
      el.y = i * 150;
    });
  });
  return groupObj;
};

export const sefDefaultConfig = (topoData: any) => {
  topoData.edges.forEach((edge: any) => {
    // edge.type = 'cubic';
    edge.style = {
      endArrow: true
    };
    edge.style.stroke = '#CCC';
    // edge.style.endArrow.fill = '#F6BD16';
    edge.style.lineWidth = 2;
  });
  // nodes
  topoData.nodes.forEach(
    (node: {
      model: { compType: any; img: any };
      linkPoints: { top: boolean; right: boolean; bottom: boolean; left: boolean; size: number };
      icon: {
        /* whether show the icon, false by default */
        show: boolean;
        // img: "https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg",
        width: number;
        height: number;
        fill: string;
        img: any;
      };
      size: number[];
      style: {
        fill: string;
        // stroke: '#d3dbe1',
        stroke: string;
        lineWidth: number;
      };
    }) => {
      node.linkPoints = {
        top: false,
        right: true,
        bottom: false,
        left: true,
        size: 5
        /* linkPoints' size, 8 by default */
        /* linkPoints' style */
        //   fill: '#ccc',
        //   stroke: '#333',
        //   lineWidth: 2,
      };
      node.icon = {
        /* whether show the icon, false by default */
        show: false,
        // img: "https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg",
        width: 60,
        height: 60,
        fill: '#d3dbe1',
        img: node.model.img
      };
      node.size = [90];
      node.style = {
        fill: '#fff',
        // stroke: '#d3dbe1',
        stroke: '#33cc33',
        lineWidth: 5
      };
    }
  );
  return topoData;
};

export default {};
