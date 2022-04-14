// @ts-nocheck
// import { isDebuggerStatement } from 'typescript';
import { arrayJsonRepeatFilter } from './common.js';
import { isCache, isDb, isApp, isWeb, isNet, isStrategy, isCommon, isCustomization, isData } from './serviceTypeCheck';

//判断服务类型
const fn = {
  isApp, //app
  isWeb, //web
  isNet, //网络服务
  isStrategy, //策略
  isDb,
  isCache
};

// 判断链接方向
const directFn = {
  source: sourceServiceList,
  target: targetServiceList
};
const GroupCompList = ['DNS', 'LB', 'NginxKVM', 'App'];
const compPosition = {
  ALBExtranet: -2,
  ALBIntranet: -1,
  DNS: 0,
  LB: 1,
  NginxKVM: 2,
  App: 3,
  DBCacheData: 4,
  CommonService: 5
};
//拓扑图的起始点,左上角
let serviceBox = {
  width: 180,
  height: 120
};

const isGroupComp = (compType: string) => {
  return GroupCompList.includes(compType) || isApp(compType) || isStrategy(compType);
};

const isDBCacheData = (compType: string) => {
  return isDb(compType) || isCache(compType) || isData(compType);
};
const serviceSort = {
  NginxKVM: 3,
  LB: 2,
  DNS: 1
};
function formDataTransfer(components: any[], links: any[], editor: { guid: () => any }) {
  //第一步:分组
  const nodes = [];
  const groupList = divideGroups(components, links);
  nodes.push(...calcGroupCoordXY(groupList, editor));

  let noGroupList = components.filter((c: { type: any }) => !isGroupComp(c.type));
  nodes.push(...calcNoGroupCoordXY(noGroupList, editor));
  // 策略
  const strategyList = components.filter((c: { type: string }) => isStrategy(c.type));
  nodes.push(...strategyList);
  return nodes;
}

/**
 * 计算组件坐标
 * @param {连向组的服务} groupList
 * @param {所有连线} links
 * @param {*} editor
 * @returns
 */
function calcGroupCoordXY(groupList: any[], editor: { guid: () => any }) {
  //拓扑图的起始点,左上角
  const nodes: any[] = [];
  let groupRow = 0;
  groupList.forEach((group: { nodes: any[]; rows: number }, i: any) => {
    const groupId = editor.guid();

    group.nodes.forEach((node: { type: keyof typeof compPosition; uuid: any }) => {
      // 查找第几个组件
      const curIndex = (isApp(node.type) ? 3 : compPosition[node.type]) || 0;
      // 查找当前类型服务有几个
      const curServiceList = group.nodes.filter((item: { type: any }) => item.type === node.type);
      const curRow = curServiceList.findIndex((item: { uuid: any }) => item.uuid === node.uuid);

      let coordX = curIndex * serviceBox.width;
      let coordY = (curRow + groupRow + i) * serviceBox.height;
      nodes.push({
        ...node,
        groupId: isGroupComp(node.type) ? groupId : null,
        coordX,
        coordY
      });
    });
    groupRow += group.rows;
  });

  return nodes;
}

/**
 * 计算非组内服务坐标
 * @param {过滤组内服务} noGroupList
 * @param {*} editor
 * @returns
 */
function calcNoGroupCoordXY(noGroupList: any[], editor: any) {
  const nodes: any[] = [];
  const curDataServiceList = noGroupList.filter((item: { type: any }) => isDBCacheData(item.type));
  noGroupList.forEach((node: { type: keyof typeof compPosition; uuid: any }) => {
    // 查找第几个组件
    const curIndex = (isDBCacheData(node.type) ? 4 : compPosition[node.type]) || 0;
    // 查找当前类型服务有几个
    const curServiceList = noGroupList.filter((item: { type: any }) => {
      return item.type === node.type && !isDBCacheData(item.type);
    });

    let curRow = curServiceList.findIndex((item: { uuid: any }) => item.uuid === node.uuid);
    if (isDBCacheData(node.type)) {
      curRow = curDataServiceList.findIndex((item: { uuid: any }) => item.uuid === node.uuid);
    }
    let coordX = curIndex * serviceBox.width;
    let coordY = curRow * serviceBox.height;
    nodes.push({
      ...node,
      groupId: null,
      coordX,
      coordY
    });
  });

  return nodes;
}

/**
 * 按连线分组
 * @param {所有组件} components
 * @param {所有连线} links
 * @returns
 */
function divideGroups(components: any[], links: any) {
  // 筛选出集群中的服务
  let groupComp = components.filter((c: { type: any }) => isGroupComp(c.type));
  // let groupComp = components;
  //找到组的中心
  const groups = groupComp
    .filter((c: { type: string }) => isApp(c.type))
    .map((c: { groupId: any; type: any }) => {
      let nodes = [c, ...allConnectServiceList(c, groupComp, links, 'source')];
      const notLinkNodes = groupComp.filter((n: { type: string; groupId: any }) => (isNet(n.type) || isWeb(n.type)) && n.groupId && n.groupId === c.groupId && n.type !== c.type);
      // notLinkNodes 未关联的服务添加到nodes里面会导致重复服务， kvm迁移docker
      // nodes = [...new Set([...nodes, ...notLinkNodes])];
      nodes = arrayJsonRepeatFilter([...nodes, ...notLinkNodes], 'uuid');
      //有没接网络的Suengin,行数+1
      const noNetWeb = nodes.filter((n) => isWeb(n.type) && !sourceServiceList(n, groupComp, links).length);
      // 计算组内最大行数
      const dnsList = nodes.filter((n) => n.type === 'DNS');
      const lbList = nodes.filter((n) => n.type === 'LB');
      const maxRow = Math.max(dnsList.length, lbList.length);
      return {
        nodes,
        rows: maxRow + noNetWeb.length || 1,
        cols: new Set(nodes.map((n) => n.type)).size
      };
    });
  return groups;
}
//找出服务的所有上游/下游服务-穿透查找
function allConnectServiceList(component: any, components: any, links: any, direct: keyof typeof directFn) {
  const allList = [];
  const serviceList = directFn[direct](component, components, links);
  allList.push(...serviceList);
  //当前的服务集合
  let curServiceList = [...serviceList];
  while (curServiceList.length) {
    let list: any[] = [];
    curServiceList.forEach((s) => {
      list.push(...directFn[direct](s, components, links));
    });
    curServiceList = [...list];
    allList.push(...curServiceList);
  }
  return allList;
}
/**
 * 获取服务的上游服务-直属上游
 * @param {*} component
 * @param {*} components
 * @param {*} links
 */
function sourceServiceList(component: { uuid: any; nodeId: any }, components: any[], links: any[]) {
  let list = [];
  const fromUuids = links.filter((l: { to: any }) => [component.uuid, component.nodeId].includes(l.to)).map((l: { from: any }) => l.from);
  list = components.filter((c: { uuid: any; nodeId: any }) => fromUuids.includes(c.uuid) || fromUuids.includes(c.nodeId));
  return list;
}

//获取服务的下游服务-直属下游
function targetServiceList(component: { uuid: any; nodeId: any }, components: any[], links: any[]) {
  let list = [];
  const toUuids = links.filter((l: { from: any }) => [component.uuid, component.nodeId].includes(l.from)).map((l: { to: any }) => l.to);
  list = components.filter((c: { uuid: any; nodeId: any }) => toUuids.includes(c.uuid) || toUuids.includes(c.nodeId));
  return list;
}
export default formDataTransfer;
