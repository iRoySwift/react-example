/*
 * @Author: Roy
 * @Date: 2022-07-27 11:44:10
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-12 11:39:16
 * @Description: 删除连线
 */
import { ICmd } from '@suning/uxcool-graphin';

export function removeLine(e: ICmd.ICommandEvent) {
  // @ts-ignore
  const self = this as any;
  const { item } = e;
  return self.graph.removeItem(item, self.queue);
}
