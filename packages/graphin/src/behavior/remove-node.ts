import { iCursorType, IG6GraphEvent, IGraph } from '../../typings/index';

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

    this.setCursor(e, 'default');
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
  },
  setCursor(e: IG6GraphEvent, type: keyof typeof iCursorType) {
    const self = this as any;
    const graph: IGraph = self.graph;
    const item = e.item;
    item &&
      graph.updateItem(item, {
        attrs: {
          cursor: type
        }
      });
  }
};
