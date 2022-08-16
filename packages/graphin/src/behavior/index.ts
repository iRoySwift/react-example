/*
 * @Author: Roy
 * @Date: 2022-04-13 18:05:34
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-11 18:01:20
 * @Description: behavior: ;
 */
import { each } from '@antv/util';
import { registerBehavior } from '@antv/g6-core';
import setCursor from './set-cursor';
import removeEdge from './remove-edge';
// import dragCombo from "./drag-combo";
import dragNode from './drag-node';

import createEdge from './create-edge';
import removeNode from './remove-node';

const behaviors = {
  createEdge,
  removeNode,
  removeEdge,
  setCursor,
  dragNode
};
each(behaviors, (behavior, type: string) => {
  registerBehavior(type, behavior);
});
