import { BaseGlobal as Global } from '@antv/g6-core';
import { deepMix } from '@antv/util';
import { Item, ModelConfig, ShapeOptions, UpdateType } from '../../../typings';

export const shapeBase: ShapeOptions = {
  // 默认样式及配置
  options: {
    labelCfg: {
      style: {
        fontFamily: Global.windowFontFamily
      }
    },
    descriptionCfg: {
      style: {
        fontFamily: Global.windowFontFamily
      }
    }
  },
  itemType: '', // node, edge, combo 等
  /**
   * 形状的类型，例如 circle，ellipse，polyline...
   */
  type: '',
  // eslint-disable-next-line no-unused-vars
  getCustomConfig(cfg: ModelConfig): ModelConfig {
    return {};
  },
  getOptions(cfg: ModelConfig, updateType?: UpdateType): ModelConfig {
    if (updateType === 'move' || updateType?.includes('bbox')) {
      return {};
    }
    return deepMix({}, this.options, this.getCustomConfig!(cfg) || {}, cfg);
  },
  /**
   * 更新节点，包含文本
   * @override
   * @param  {Object} cfg 节点/边的配置项
   * @param  {G6.Item} item 节点/边
   */
  update(cfg: ModelConfig, item: Item, updateType?: UpdateType) {
    (this as any).updateShapeStyle(cfg, item, updateType);
  }
};
