/*
 * @Author: Roy
 * @Date: 2022-07-29 16:40:50
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-12 14:39:46
 * @Description: 设置鼠标
 */
import { iCursorType } from '../../typings/custom';

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
  onNodeMouseleave() {
    this.setCursor('default');
  },
  onEdgeMousemove() {
    this.setCursor('pointer');
  },
  onEdgeMouseleave() {
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
