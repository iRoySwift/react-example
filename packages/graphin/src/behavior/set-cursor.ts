import { iCursorType, IG6GraphEvent } from '../../typings/index';

export default {
  getDefaultCfg() {
    return {
      multiple: true
    };
  },
  getEvents() {
    return {
      'canvas:mousemove': 'onCanvasMousemove'
      // 'node:mouseleave': 'onNodeMouseleave',
      // 'edge:mousemove': 'onEdgeMousemove',
      // 'edge:mouseleave': 'onEdgeMouseleave'
    };
  },
  onCanvasMousemove() {
    this.setCursor('default');
  },
  onNodeMouseleave(e: IG6GraphEvent) {
    console.log(e, 'onNodeMouseleave');
    this.setCursor('default');
  },
  onEdgeMousemove(e: IG6GraphEvent) {
    console.log(e, 'onEdgeMousemove');
    this.setCursor('pointer');
  },
  onEdgeMouseleave(e: IG6GraphEvent) {
    console.log(e, 'onEdgeMouseleave');
    this.setCursor('default');
  },
  /**
   * set cursor style
   * @param type
   */
  setCursor(type: keyof typeof iCursorType) {
    const self = this as any;
    const graph = self.graph;
    graph.css({
      cursor: type
    });
  }
};
