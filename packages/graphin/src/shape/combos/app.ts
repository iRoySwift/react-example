import getNodeStyle from '../configs/nodeStyle';

const defaultWidth = 284;
const defaultHeight = 150;
const padding = 10;

const options = {
  /**
   * 绘制 Combo 中的图形。不需要为默认的 label 增加图形，父类方法会自动增加 label
   * @param  {Object} cfg 配置项
   * @param  {G.combo} group 容器
   * @return {G.Shape} 返回一个绘制的图形作为 keyShape，通过 combo.get('keyShape') 可以获取。
   * 关于 keyShape 可参考文档 核心概念-节点/边/Combo-图形 Shape 与 keyShape
   */
  draw: function (
    cfg: { style: { width: number; height: number } },
    group: {
      addShape: (
        arg0: string,
        arg1: {
          attrs: {
            x: number;
            y: number;
            width: any;
            height: any;
            fill: string;
            stroke: string;
            lineWidth: number;
            radius: number;
          };
          draggable: boolean;
          name: string;
        }
      ) => any;
    }
  ) {
    // Get the shape style, where the style.r corresponds to the R in the Illustration of Built-in Rect Combo
    const config = getNodeStyle('default');
    // 容器自适应
    const width = cfg?.style?.width || 0;
    const height = cfg?.style?.height || 0;
    // Add a circle shape as keyShape which is the same as the extended 'circle' type Combo
    const keyShape = group.addShape('rect', {
      attrs: {
        x: -width / 2,
        y: -height / 2,
        width,
        height,
        fill: 'transparent',
        stroke: 'transparent',
        lineWidth: config.lineWidth,
        radius: config.radius
      },
      draggable: false,
      name: 'combo-keyShape'
    });
    return keyShape;
  },
  /**
   * 绘制后的附加操作，默认没有任何操作
   * @param  {Object} cfg 配置项
   * @param  {G.Group} group 容器
   */
  afterDraw: (cfg: any, group: any) => {},

  /**
   *
   * @param cfg 配置项
   * @param item 实例
   */
  update(cfg: { style: { width: number; height: number } }, item: { getContainer: () => any }) {
    const width = cfg?.style?.width || 0;
    const height = cfg?.style?.height || 0;
    const group = item.getContainer();
    const rect = group.find((ele: { get: (arg0: string) => string }) => ele.get('name') === 'combo-keyShape');
    rect.attr({
      x: -width / 2,
      y: -height / 2,
      width: width,
      height: height
    });
  },
  /**
   * 更新节点后的操作，新增的图形需要在这里控制其更新逻辑
   * @override
   * @param  {Object} cfg 配置项
   * @param  {Combo} item 实例
   */
  afterUpdate: (cfg: any, item: any) => {},
  /**
   * 是否允许更新。
   * @param type 元素类型，'node' 或 'edge'
   */
  shouldUpdate(type: any) {
    return true;
  },
  /**
   * 响应 Combo 的状态变化。
   * 在需要使用动画来响应状态变化时需要被复写，其他样式的响应参见下文提及的 [配置状态样式] 文档
   * @param  {String} name 状态名称
   * @param  {Object} value 状态是否可用，为 true 时可用，否则不可用
   * @param  {item} item 实例
   */
  setState: (name: any, value: any, item: any) => {}
};
export default {
  type: 'combo',
  name: 'app',
  options,
  extendShapeType: 'rect'
};
