/*
 * @Author: Roy
 * @Date: 2022-08-11 16:28:23
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-12 11:45:14
 * @Description: 声明
 */
import G6 from '@antv/g6';
import { G6Event, ShapeOptions, IG6GraphEvent, EdgeConfig, NodeConfig, GraphData, IShape, ModelConfig, UpdateType, Item, IGraph as IG6Graph, IGroup, INode, ICombo } from '@antv/g6-pc/lib/index';
import GGroup from '@antv/g-canvas/lib/group';
import { Point } from '@antv/g-base/esm/types';
import { ShapeStyle } from '@antv/g6-core/lib/types/index';
import { PluginBase } from '@antv/g6-plugin';
import { GraphOptions } from '@antv/g6/lib/index';

export { PluginBase, GGroup, G6 };
export type { G6Event, IG6GraphEvent, ShapeStyle, EdgeConfig, GraphOptions, Point, Item, GraphData, IShape, NodeConfig, ModelConfig, ShapeOptions, UpdateType, IGroup, IG6Graph, INode, ICombo };
