import G6, { GraphOptions } from '@antv/g6';
import Util from '../util/index';
import Command from './../command/index';
import { PluginBase } from '@antv/g6-plugin';

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
class Graph extends G6.Graph {
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
    (this as any).modifyCSS(graphContainer, style);
  }
}
export default Graph;
