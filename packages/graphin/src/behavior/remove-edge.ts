/*
 * @Author: Roy
 * @Date: 2022-07-20 10:13:48
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-12 16:43:59
 * @Description: 删除 edge
 */

import { IG6GraphEvent, Item } from '../../typings/graph';
import { IGraph } from '../interface/graph';

export default {
  getDefaultCfg() {
    return {
      multiple: true
    };
  },
  getEvents() {
    return {
      'edge:click': 'onClick',
      'edge:mouseenter': 'onMouseenter',
      'edge:mouseleave': 'onMouseleave'
    };
  },
  onMouseenter(e: IG6GraphEvent) {
    this.createCloseIcon(e);
  },
  onMouseleave(e: IG6GraphEvent) {
    this.resetState(e);
  },
  onClick(evt: IG6GraphEvent) {
    const self = this as any;
    const graph: IGraph = self.graph;
    const item = evt.item as Item;
    if (evt.target && evt.target.get('isClosePoint')) {
      graph.cmd.executeCommand('removeItem', {
        itemType: 'edge',
        evt,
        item
      });
    }
  },
  resetState(e: IG6GraphEvent) {
    const self = this as any;
    const graph: IGraph = self.graph;
    const item = e.item;
    item && graph.setItemState(item, 'hover', false);
  },
  createCloseIcon(e: IG6GraphEvent) {
    const self = this as any;
    const graph: IGraph = self.graph;
    const item = e.item;
    item && graph.setItemState(item, 'hover', true);
  }
};
