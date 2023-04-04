/*
 * @Author: Roy
 * @Date: 2022-05-08 19:21:31
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-11 18:18:42
 * @Description: 关闭按钮
 */
import { registerNode } from '@antv/g6-core';
import { IShape, ShapeOptions } from '../../../typings/graph';
import { shapeBase } from './shapeBase';

// 绘制node
const close: ShapeOptions = {
  // 自定义节点时的配置
  options: {},
  shapeType: 'circle',
  // 文本位置
  labelPosition: 'center',
  ShapeOptions: {},
  // @ts-ignore
  drawShape(cfg: NodeConfig, group: GGroup | any): IShape {
    const keyShape: IShape = group.addShape('circle', {
      class: 'close',
      attrs: {
        x: 0,
        y: 0,
        fill: '#F22635',
        r: 7
      }
    });
    group.addShape('text', {
      class: 'close',
      attrs: {
        x: 0,
        y: 0,
        fill: '#FFFFFF',
        text: '×',
        textBaseline: 'middle',
        textAlign: 'center',
        fontSize: 12,
        fontweight: 40
      }
    });
    return keyShape;
  }
};

const closeDef = { ...shapeBase, ...close };
registerNode('close', closeDef);
