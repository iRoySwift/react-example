import { IG6GraphEvent, IGraph } from '@antv/g6';

const option: any = {
  getDefaultCfg() {
    return {
      multiple: true
    };
  },
  getEvents() {
    return {
      'node:click': 'onNodeClick',
      'canvas:click': 'onCanvasClick',
      'edge:mouseenter': 'onEdgeMouseenter',
      'edge:mouseleave': 'onEdgeMouseleave'
    };
  },
  onEdgeMouseenter(e: IG6GraphEvent) {
    this.setEdgesState(e);
  },
  onEdgeMouseleave(e: IG6GraphEvent) {
    this.resetEdgesState(e);
  },
  onNodeClick(e: IG6GraphEvent) {
    // const graph = this.graph;
    // const item = e.item;
    // if (item.hasState("active")) {
    //     graph.setItemState(item, "active", false);
    //     return;
    // }
    // // this 上即可取到配置，如果不允许多个 'active'，先取消其他节点的 'active' 状态
    // if (!this.multiple) {
    //     this.removeNodesState();
    // }
    // // 置点击的节点状态 'active' 为 true
    // graph.setItemState(item, "active", true);
  },
  onCanvasClick(e: IG6GraphEvent) {
    // shouldUpdate 可以由用户复写，返回 true 时取消所有节点的 'active' 状态，即将 'active' 状态置为 false
    // if (this.shouldUpdate(e)) {
    //     removeNodesState();
    // }
  },
  setEdgesState(e: IG6GraphEvent) {
    const { x, y } = e;
    const graph: IGraph = this.graph;
    const item = e.item;
    const { showClose } = item?.getModel();
    if (showClose) {
      item.update({
        showClose: true,
        x,
        y
      });
      graph.setItemState(item, 'active', true);
    }
  },
  resetEdgesState(e: IG6GraphEvent) {
    const graph: IGraph = this.graph;
    const item = e.item;
    const { showClose } = item?.getModel();
    if (showClose) {
      item.update({
        showClose: false
      });
      graph.findAllByState('edge', 'active').forEach((edge) => {
        graph.setItemState(edge, 'active', false);
      });
    }
  }
};
export default {
  type: 'removeEdge',
  option
};
