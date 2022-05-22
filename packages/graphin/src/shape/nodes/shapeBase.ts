import { BaseGlobal as Global } from '@antv/g6-core';
import { deepMix } from '@antv/util';
import { ModelConfig, ShapeOptions, UpdateType } from '../../../typings';

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
  getCustomConfig(cfg: ModelConfig): ModelConfig {
    return {};
  },
  getOptions(cfg: ModelConfig, updateType?: UpdateType): ModelConfig {
    if (updateType === 'move' || updateType?.includes('bbox')) {
      return {};
    }
    return deepMix({}, this.options, this.getCustomConfig!(cfg) || {}, cfg);
  }
};
