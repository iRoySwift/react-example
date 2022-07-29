import { IG6GraphEvent, IGraph } from '../../typings/index';

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
  onClick(e: IG6GraphEvent) {
    const self = this as any;
    const graph = self.graph;
    const item = e.item;
    if (e.target && e.target.get('name') == 'close-btn') {
      graph.cmd.executeCommand('removeItem', {
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
