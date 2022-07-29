import { each } from '@antv/util';
import { registerBehavior } from '@antv/g6-core';
import setCursor from './set-cursor';
import removeEdge from './remove-edge';
// import dragCombo from "./drag-combo";
// import moveNode from "./move-node";

import createEdge from './create-edge';
import removeNode from './remove-node';

const behaviors = {
  createEdge,
  removeNode,
  removeEdge,
  setCursor
};
each(behaviors, (behavior, type: string) => {
  registerBehavior(type, behavior);
});
