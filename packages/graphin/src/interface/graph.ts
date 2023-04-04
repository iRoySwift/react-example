/*
 * @Author: Roy
 * @Date: 2022-08-12 16:10:46
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-12 17:55:43
 * @Description: graph 接口类
 */

import { IEventForCanvas } from '../../typings/custom';
import { IG6Graph, INode, Item } from '../../typings/graph';
import Command from '../command';

export interface IGraph extends IG6Graph {
  cmd: Command;
  /**
   * getNodes getEdges getCombos
   * @param this
   * @returns Items
   */
  getItems: () => Item[];
  /**
   * get item
   * @param shape circle rect image text
   * @returns Item
   */
  getItem: (shape: any) => any | null;
  /**
   * get item by shape
   * @param shape
   * @returns item
   */
  getItemByShape: (shape: any) => INode | null;
  /**
   * 监听拖拽事件 获取canvas上对应坐标的元素
   * @param this graph
   * @param domEvent drop originalEvent
   * @returns shape
   */
  getEventForCanvas: (domEvent: DragEvent) => IEventForCanvas;
}
