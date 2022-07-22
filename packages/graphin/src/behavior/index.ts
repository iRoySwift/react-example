import { each } from '@antv/util';
import { registerBehavior } from '@antv/g6-core';

import removeEdge from './remove-edge';
// import dragCombo from "./drag-combo";
// import moveNode from "./move-node";

import createEdge from './create-edge';
import removeNode from './remove-node';

const behaviors = {
  createEdge,
  removeNode,
  removeEdge
};
each(behaviors, (behavior, type: string) => {
  registerBehavior(type, behavior);
});
