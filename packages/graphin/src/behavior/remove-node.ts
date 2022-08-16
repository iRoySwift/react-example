/*
 * @Author: Roy
 * @Date: 2022-05-07 16:16:57
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-12 16:45:58
 * @Description: 删除节点
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
      'node:click': 'onClick',
      'node:mouseenter': 'onMouseenter',
      'node:mouseleave': 'onMouseleave'
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
    if (evt.target && evt.target.get('name') == 'close-btn') {
      graph.cmd.executeCommand('removeItem', {
        itemType: 'node',
        evt,
        item
      });
    }
  },
  resetState(e: IG6GraphEvent) {
    const self = this as any;
    const graph: IGraph = self.graph;
    const item = e.item;
    item && graph.setItemState(item, 'close-active', false);
  },
  createCloseIcon(e: IG6GraphEvent) {
    const self = this as any;
    const graph: IGraph = self.graph;
    const item = e.item;
    item && graph.setItemState(item, 'close-active', true);
  }
};
