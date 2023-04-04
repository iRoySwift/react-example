/*
 * @Author: Roy
 * @Date: 2022-04-13 18:05:34
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-18 15:51:48
 * @Description: Graph class
 */
import G6 from '@antv/g6';
import { IGraph } from './../interface/graph';
import Util from './../util';
import { IEventForCanvas } from './../../typings/custom';
import { PluginBase, GraphOptions, INode } from './../../typings/graph';
import Command from './../command/index';

/**
 * 注册util
 * @param list
 * @returns
 */
function addUtilMethods(list: any) {
  return function (target: any): void {
    Object.assign(target.prototype, list);
  };
}
export interface RegisterFunction {
  // eslint-disable-next-line no-unused-vars
  (name: string, options: { [key: string]: any }, extendName?: string): void;
}

@addUtilMethods(Util)
class Graph extends G6.Graph implements IGraph {
  public cmd: any;
  static registerNode: RegisterFunction = (nodeName, options, extendedNodeName) => {
    G6.registerNode(nodeName, options, extendedNodeName);
  };

  static registerEdge: RegisterFunction = (edgeName, options, extendedEdgeName) => {
    G6.registerEdge(edgeName, options, extendedEdgeName);
  };

  static registerCombo: RegisterFunction = (comboName, options, extendedComboName) => {
    G6.registerCombo(comboName, options, extendedComboName);
  };
  static registerBehavior(behaviorName: string, behavior: any) {
    G6.registerBehavior(behaviorName, behavior);
  }
  constructor(cfg: GraphOptions) {
    super(cfg);
    this.cmd = new Command(this);
  }

  /**
   * 注册插件
   * @param plugin
   */
  public addPlugin(plugin: PluginBase): void {
    super.addPlugin(plugin);
  }
  /**
   * 删除插件
   * @param plugin
   */
  public removePlugin(plugin: PluginBase): void {
    super.removePlugin(plugin);
  }
  /**
   * 将页面坐标转成视口坐标
   * @param clientX 页面 x 坐标
   * @param clientY 页面 y 坐标
   */
  public getPointByClient(clientX: number, clientY: number) {
    return super.getPointByClient(clientX, clientY);
  }
  /**
   * set cantainer css
   * @param  {object} style container dom css
   */
  public css(style: any) {
    const graphContainer = super.get('canvas').get('el');
    Util.modifyCSS(graphContainer, style);
  }
  /**
   * getNodes getEdges getCombos
   * @param this
   * @returns Items
   */
  public getItems() {
    const itemMap = this.get('itemMap');
    const rst: any[] = [];
    Util.each(itemMap, (item: { getType: () => any }) => {
      if (item.getType()) {
        rst.push(item);
      }
    });
    return rst;
  }

  /**
   * get item
   * @param shape circle rect image text
   * @returns Item
   */
  public getItem(shape: any) {
    const itemMap = this.get('itemMap');
    let item = null;
    Util.each(itemMap, (el: { get: (arg0: string) => any }) => {
      let group = el.get('group');
      if (group.contain(shape)) {
        item = el;
      }
    });
    return item;
  }

  /**
   * get item by shape
   * @param shape
   * @returns item
   */
  public getItemByShape(shape: any): INode | null {
    if (!shape) return null;
    return this!.getItem(shape);
  }

  /**
   * 监听拖拽事件 获取canvas上对应坐标的元素
   * @param this graph
   * @param domEvent drop originalEvent
   * @returns shape
   */
  public getEventForCanvas(domEvent: DragEvent): IEventForCanvas {
    const clientX = domEvent.clientX;
    const clientY = domEvent.clientY;
    const canvas = this.get('canvas');
    const point = this.getPointByClient(clientX, clientY);
    const canvasPoint = this.getCanvasByPoint(point.x, point.y);
    const shape = canvas.getShape(canvasPoint.x, canvasPoint.y, domEvent);
    const item = this.getItemByShape(shape);
    const pixelRatio = this.getZoom();
    return {
      item,
      shape,
      x: point.x,
      y: point.y,
      domX: canvasPoint.x / pixelRatio,
      domY: canvasPoint.y / pixelRatio,
      domEvent
    };
  }
}
export default Graph;
