/*
 * @Author: Roy
 * @Date: 2022-07-28 10:17:04
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-17 17:09:10
 * @Description: 添加连线
 */
import { ICmd } from '@suning/uxcool-graphin';
import { IGraph } from '@suning/uxcool-graphin/lib/interface/graph';
import Edge from '../../shape/Edge';

function addEdge(this: any, e: ICmd.ICommandEvent) {
  const graph: IGraph = this.graph;
  const { model } = e;
  const edge = new Edge({ graph, model });
  return edge.addEdge();
}

export { addEdge };
