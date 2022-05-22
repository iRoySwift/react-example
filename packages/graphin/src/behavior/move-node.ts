// @ts-nocheck
import { IG6GraphEvent, IGraph } from '@antv/g6';

const option = {
  getDefaultCfg() {
    return {
      multiple: true
    };
  },
  getEvents() {
    return {
      'node:dragstart': 'onDragstart',
      'node:drag': 'onDrag',
      'node:dragend': 'onDragEnd'
    };
  },
  onDragstart(evt: IG6GraphEvent) {
    this.addBlock(evt);
  },
  onDrag(evt: IG6GraphEvent) {
    this.updateBlock(evt);
  },
  onDragEnd(evt: IG6GraphEvent) {
    const item = evt.item;
    const graph: IGraph = this.graph;
    const { comboId } = item?.getModel();
    const combo = graph.findById(comboId as string);

    this.removeBlock(evt);
    this.update(evt);
    if (combo && combo.getModel().type == 'app') {
      graph.emit(
        'combo:dragstart',
        Object.assign(evt, {
          item: combo
        })
      );
    }
  },
  addBlock(evt: IG6GraphEvent) {
    const item = evt.item;
    const { width, height, x, y } = item.getBBox();
    const graph: IGraph = this.graph;
    const group = graph.getGroup();
    group.addShape('rect', {
      zIndex: 999,
      name: 'block',
      attrs: {
        x,
        y,
        width: width,
        height: height,
        fill: '#6ca0d1',
        opacity: 0.5,
        stroke: '#CED4D9',
        lineWidth: 2,
        radius: 5,
        lineDash: [20, 5]
      }
    });
  },
  updateBlock(evt: IG6GraphEvent) {
    const { x, y } = evt;
    const graph: IGraph = this.graph;
    const group = graph.getGroup();
    const rect = group.find((element) => element.get('name') === 'block');
    rect.attr({
      x,
      y
    });
  },
  removeBlock(evt: IG6GraphEvent) {
    const graph: IGraph = this.graph;
    const group = graph.getGroup();
    const rect = group.find((element) => element.get('name') === 'block');
    rect.remove();
  },
  update(evt) {
    const { x, y, item } = evt;
    const graph: IGraph = this.graph;
    item.update({
      x,
      y
    });
    graph.refresh();
  }
};
export default {
  type: 'moveNode',
  option
};
