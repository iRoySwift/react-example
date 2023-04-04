import { IGraph } from '@suning/uxcool-graphin/lib/interface/graph';
import { setEdgeStatus } from '../utils/formatData';

/*
 * @Author: Roy
 * @Date: 2022-08-17 15:23:52
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-19 16:37:55
 * @Description: edge model
 */
export default class Edge {
  cmd: any;
  model: any;
  graph: IGraph;

  constructor(args) {
    this.model = args.model;
    this.graph = args.graph;
    this.init();
  }
  init() {
    // 显示编辑按钮
    this.model = {
      ...this.model,
      isEdit: true,
      status: 0,
      isSaved: false
    };
  }
  addEdge() {
    const model = Object.assign(setEdgeStatus(this.model));
    return this.graph.addItem('edge', model, true);
  }
}
