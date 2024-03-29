/*
 * @Author: Roy
 * @Date: 2022-04-13 18:05:34
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-11 18:12:50
 * @Description: 请填写简介
 */
import getNodeStyle from '../configs/nodeStyle';

const defaultWidth = 284;
const defaultHeight = 150;

const options = {
  /**
   * 绘制 Combo 中的图形。不需要为默认的 label 增加图形，父类方法会自动增加 label
   * @param  {Object} cfg Combo 的配置项
   * @param  {G.Group} group 图形分组，Combo 中的图形对象的容器
   * @return {G.Shape} 返回一个绘制的图形作为 keyShape，通过 combo.get('keyShape') 可以获取。
   * 关于 keyShape 可参考文档 核心概念-节点/边/Combo-图形 Shape 与 keyShape
   */
  draw: function (
    cfg: { style: { width: any; height: any } },
    group: {
      addShape: (
        arg0: string,
        arg1: {
          attrs:
            | {
                x: number;
                y: number;
                width: number;
                height: number;
                fill: string;
                stroke: string;
                lineWidth: number;
                radius: number;
              }
            | {
                x: number;
                y: number;
                width: number;
                height: number;
                fill: string;
                stroke: string;
                lineWidth: number;
                radius: number;
              }
            | {
                x: number;
                y: number;
                r: number;
                stroke: string;
                fill: string;
                lineWidth: number;
                zIndex: number;
              };
          draggable: boolean;
          name: string;
        }
      ) => void;
    }
  ) {
    // Get the shape style, where the style.r corresponds to the R in the Illustration of Built-in Rect Combo
    const config = getNodeStyle('default');

    // 容器自适应
    const width = Math.max(cfg?.style?.width || 0, defaultWidth);
    const height = Math.max(cfg?.style?.height || 0, defaultHeight);
    // Add a circle shape as keyShape which is the same as the extended 'circle' type Combo
    const keyShape = group.addShape('rect', {
      attrs: {
        x: -(cfg?.style?.width || 0) / 2,
        y: -(cfg?.style?.height || 0) / 2 - 30,
        width: width,
        height: height + 30,
        fill: config.backgoundColor,
        stroke: config.borderColor,
        lineWidth: config.lineWidth,
        radius: config.radius
      },
      draggable: true,
      name: 'combo-keyShape'
    });

    // header
    group.addShape('rect', {
      attrs: {
        x: -(cfg?.style?.width || 0) / 2,
        y: -(cfg?.style?.height || 0) / 2 - 30,
        width,
        height: 30,
        fill: '#FFF',
        stroke: config.borderColor,
        lineWidth: config.lineWidth,
        radius: config.radius
      },
      draggable: true,
      name: 'combo-header-keyShape'
    });
    // 原点 0 0
    group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        r: 6,
        stroke: 'red',
        fill: '#fff',
        lineWidth: 6,
        zIndex: 999
      },
      draggable: false,
      name: '0-contanier'
    });
    return keyShape;
  },
  /**
   * 绘制后的附加操作，默认没有任何操作
   * @param  {Object} cfg Combo 的配置项
   * @param  {G.Group} group 图形分组，Combo 中的图形对象的容器
   */
  afterDraw(cfg: any, group: any) {},

  /**
   *
   * @param cfg 配置项
   * @param item 实例
   */
  update(
    cfg: any,
    item: {
      get: (arg0: string) => any;
      getBBox: () => any;
      getContainer: () => any;
    }
  ) {
    const keyShape = item.get('keyShape');
    const getItemBBox = item.getBBox();
    const group = item.getContainer();
    const rect = group.find((ele: { get: (arg0: string) => string }) => ele.get('name') === 'combo-keyShape');
    const rectHeader = group.find((ele: { get: (arg0: string) => string }) => ele.get('name') === 'combo-header-keyShape');
    rect.attr({
      x: 0,
      y: 0,
      width: getItemBBox.width,
      height: getItemBBox.height
    });
    rectHeader.attr({
      x: 0,
      y: 0,
      width: getItemBBox.width,
      height: 30
    });
  },

  /**
   * 更新节点后的操作，新增的图形需要在这里控制其更新逻辑
   * @override
   * @param  {Object} cfg 节点的配置项
   * @param  {Combo} combo 节点
   */
  afterUpdate: (cfg: any, combo: any) => {},
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
   * @param  {Object} value 状态值
   * @param  {Combo} combo 节点
   */
  setState: (name: any, value: any, combo: any) => {}
};
export default {
  type: 'combo',
  name: 'region',
  options,
  extendShapeType: 'rect'
};
