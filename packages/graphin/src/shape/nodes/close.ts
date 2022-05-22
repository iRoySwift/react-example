import { deepMix, isArray, each, mix, isBoolean, isPlainObject, clone } from '@antv/util';
import { registerNode, Item, ShapeStyle, ShapeOptions, BaseGlobal as Global, UpdateType, ModelConfig } from '@antv/g6-core';
import { CustomModelConfig, GGroup, IG6GraphEvent, IShape, NodeConfig } from '../../../typings/index';
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
