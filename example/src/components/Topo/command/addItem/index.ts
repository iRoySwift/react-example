/*
 * @Author: Roy
 * @Date: 2022-05-03 17:37:52
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-16 17:23:45
 * @Description: 添加元素 执行命令
 */
import { addEdge } from './addEdge';
import { addNode } from './addNode';
import { checkLine } from '../../utils/edgeCheck';
import { ICommandObj } from '../../typings';
import { ICmd } from '@suning/uxcool-graphin/typings/custom';

const addItem: ICommandObj = {
  queue: true,
  enable(e: ICmd.ICommandEvent) {
    const { itemType, model } = e;
    if (itemType === 'edge') {
      return checkLine.call(this, model);
    }
    return true;
  },
  execute(e: ICmd.ICommandEvent) {
    const { itemType, model } = e;
    let nodeItem = null;
    let uuid = (this as any).graph.uuid();
    model!.id = uuid;
    if (itemType === 'node') {
      nodeItem = addNode.call(this, e);
    }
    if (itemType === 'edge') {
      nodeItem = addEdge.call(this, e);
    }
    return !!nodeItem;
  },
  back() {}
};

export default addItem;
