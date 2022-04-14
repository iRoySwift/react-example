import G6, { BehaviorOption, GraphOptions } from '@antv/g6';
import Utils from '../utils/index';
import defaultComponent from '../shape/index';
// import defaultBehaviour from "./behavior/index";
// import defaultPlugin from "./plugins/index";
import { PluginBase } from '@antv/g6-plugin';

const _initComponent = Symbol('_initComponent');
// const _initBehaviour = Symbol("_initBehaviour");
// const _initPlugin = Symbol("_initPlugin");

function addUtilMethods(list: any) {
  return function (target: any): void {
    Object.assign(target.prototype, list);
  };
}
export interface RegisterFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (name: string, options: { [key: string]: any }, extendName?: string): void;
}

@addUtilMethods(Utils)
class Graph extends G6.Graph {
  static registerNode: RegisterFunction = (nodeName, options, extendedNodeName) => {
    G6.registerNode(nodeName, options, extendedNodeName);
  };

  static registerEdge: RegisterFunction = (edgeName, options, extendedEdgeName) => {
    G6.registerEdge(edgeName, options, extendedEdgeName);
  };

  static registerCombo: RegisterFunction = (comboName, options, extendedComboName) => {
    G6.registerCombo(comboName, options, extendedComboName);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static registerBehavior(behaviorName: string, behavior: any) {
    G6.registerBehavior(behaviorName, behavior);
  }
  constructor(cfg: GraphOptions) {
    super(cfg);
    // this[_initBehaviour]();
    this[_initComponent]();
    // this[_initPlugin]();
  }
  // 初始化组件
  [_initComponent] = (): void => {
    defaultComponent.forEach((item: any) => {
      this.registerComponent(item.type, item, item.extendShapeType);
    });
  };

  // [_initBehaviour]() {
  //   defaultBehaviour.forEach((item) => {
  //     this.registerBehavior(item.type, item.option);
  //   });
  // }

  // [_initPlugin]() {
  //   Object.keys(defaultPlugin).forEach((plugin) => {
  //     let obj = new defaultPlugin[plugin]();
  //     this.addPlugin(obj);
  //   });
  // }

  /**
   * 全局注册组建
   * @param type{String} 必须为字符串，为G6原生支持的几种类型
   * @param item {Object} 组件对象，参照内置提供的写
   * @param extendShapeType {String} 继承的类型名称
   */
  registerComponent = (type: 'node' | 'edge' | 'combo', item: any, extendShapeType?: string | undefined): void => {
    switch (type) {
      case 'node':
        G6.registerNode(item.name, item.options, extendShapeType);
        break;
      case 'edge':
        G6.registerEdge(item.name, item.options, extendShapeType);
        break;
      case 'combo':
        G6.registerCombo(item.name, item.options, extendShapeType);
        break;
      default:
        throw new Error(`type[${type}] is illegal!`);
    }
  };

  /**
   * 全局注册行为
   * @param name behaviors 名称
   * @param behavior BehaviorOption
   */
  registerBehavior = (name: string, behavior: BehaviorOption): any => {
    G6.registerBehavior(name, behavior);
  };
  addPlugin(plugin: PluginBase): void {
    super.addPlugin(plugin);
  }
}
export default Graph;
