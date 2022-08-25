/*
 * @Author: Roy
 * @Date: 2022-07-28 10:16:49
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-12 15:13:32
 * @Description: 添加node
 */

import { ICmd } from '@suning/uxcool-graphin';

function addNode(e: ICmd.ICommandEvent) {
  const { model } = e;
  //@ts-ignore
  const self = this as any;
  return self.graph.addItem('node', model, self.queue);
}

export { addNode };
