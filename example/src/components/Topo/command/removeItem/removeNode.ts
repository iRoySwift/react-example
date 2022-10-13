/*
 * @Author: Roy
 * @Date: 2022-05-08 23:51:18
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-18 11:58:00
 * @Description: 删除节点
 */

import { ICmd } from '@suning/uxcool-graphin/typings/custom';

export function removeNode(e: ICmd.ICommandEvent) {
  // @ts-ignore
  const self = this as any;
  const { item } = e;
  const {
    id,
    instanceCode,
    model: { isSaved }
  } = item!.getModel() as any;
  if (instanceCode) {
    alert('已服开服务，不可以删除！');
    return;
  }
  if (isSaved) {
    const params = {
      compUuid: id
    };
    console.log(params);
    // removeTopoNode(params).then((res) => {
    //   self.graph.removeItem(item, self.queue);
    // });
    alert('服务删除成功！');
    return;
  }
  return self.graph.removeItem(item, self.queue);
}
