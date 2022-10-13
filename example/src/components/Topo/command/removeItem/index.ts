/*
 * @Author: Roy
 * @Date: 2022-05-08 23:49:11
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-12 15:35:27
 * @Description: 请填写简介
 */
import { ICmd } from '@suning/uxcool-graphin';
import { ICommandObj } from '../../typings';
import { removeLine } from './removeEdge';
import { removeNode } from './removeNode';

const removeItem: ICommandObj = {
  queue: true, // 是否加入执行栈
  enable() {
    return true;
  },
  execute(e: ICmd.ICommandEvent) {
    const item = e.item;
    let nodeItem = null;
    // node
    if (item!.get('type') === 'node') {
      nodeItem = removeNode.call(this, e);
      return !!nodeItem;
    }
    // line
    if (item!.get('type') === 'edge') {
      nodeItem = removeLine.call(this, e);
    }

    return !!nodeItem;
  },
  back() {}
};

export default removeItem;
