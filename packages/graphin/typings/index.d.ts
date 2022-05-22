import { G6Event, ShapeOptions, IG6GraphEvent, EdgeConfig, NodeConfig, GraphData } from '@antv/g6-core/lib/index';
import { IShape, ModelConfig, UpdateType, Item } from '@antv/g6/lib/index';
import { IGraph, IGroup } from '@antv/g6-pc/lib/index';
import GGroup from '@antv/g-canvas/lib/group';
import PluginBase from './../src/plugins/base';

export interface ICommandExeData {
  itemType: 'combo' | 'node' | 'edge';
  model: any;
}

export interface CustomModelConfig extends NodeConfig {
  model?: any;
  [k: string]: any;
}

export enum iCursorType {
  'auto',
  'default',
  'pointer',
  'crosshair',
  'move',
  'not-allowed',
  'grab',
  'zoom-in',
  'zoom-out'
}

export { G6Event, IG6GraphEvent, IGraph, EdgeConfig, Item, GraphData, IShape, GGroup, NodeConfig, ModelConfig, ShapeOptions, UpdateType, IGroup, PluginBase };
