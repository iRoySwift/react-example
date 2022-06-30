import G6, { GraphOptions } from '@antv/g6';
import Utils from '../utils/index';
import Command from './../command/index';
import { PluginBase } from '@antv/g6-plugin';

function addUtilMethods(list: any) {
  return function (target: any): void {
    Object.assign(target.prototype, list);
  };
}
export interface RegisterFunction {
  // eslint-disable-next-line no-unused-vars
  (name: string, options: { [key: string]: any }, extendName?: string): void;
}

@addUtilMethods(Utils)
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
    // this[_initComponent]();
    this.cmd = new Command(this);
  }
  // 初始化组件
  // [_initComponent] = (): void => {
  //   defaultComponent.forEach((item: any) => {
  //     this.registerComponent(item.type, item, item.extendShapeType);
  //   });
  // };

  /**
   * 全局注册组建
   * @param type{String} 必须为字符串，为G6原生支持的几种类型
   * @param item {Object} 组件对象，参照内置提供的写
   * @param extendShapeType {String} 继承的类型名称
   */
  // registerComponent = (type: 'node' | 'edge' | 'combo', item: any, extendShapeType?: string | undefined): void => {
  //   switch (type) {
  //     case 'node':
  //       G6.registerNode(item.name, item.options, extendShapeType);
  //       break;
  //     case 'edge':
  //       G6.registerEdge(item.name, item.options, extendShapeType);
  //       break;
  //     case 'combo':
  //       G6.registerCombo(item.name, item.options, extendShapeType);
  //       break;
  //     default:
  //       throw new Error(`type[${type}] is illegal!`);
  //   }
  // };

  public addPlugin(plugin: PluginBase): void {
    super.addPlugin(plugin);
  }
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
}
export default Graph;
