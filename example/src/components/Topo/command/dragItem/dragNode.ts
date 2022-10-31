/*
 * @Author: Roy
 * @Date: 2022-08-11 15:38:20
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-16 15:41:39
 * @Description: 拖动节点 执行命令
 */

import { INode } from '@suning/uxcool-graphin';
import { ICmd } from '@suning/uxcool-graphin';
import { IG6GraphEvent } from '@suning/uxcool-graphin';
import { IGraph } from '@suning/uxcool-graphin/lib/interface/graph';

function dragNode(this: any, e: ICmd.ICommandEvent) {
  const graph: IGraph = this.graph;
  const { item, evt } = e;
  const { x, y } = evt as IG6GraphEvent;
  graph.updateItem(item as INode, { x, y } as any, false);
  return true;
}

export { dragNode };
