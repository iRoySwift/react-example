/*
 * @Author: Roy
 * @Date: 2022-08-10 17:53:03
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-16 16:41:21
 * @Description: 拖动Item 执行命令
 */
import { ICmd, IG6GraphEvent } from '@suning/uxcool-graphin';
import { ICommandObj } from '../../typings';
import { dragNode } from './dragNode';
import { checkNodeOverlap } from '../../utils/nodeCheck';

const dragItem: ICommandObj = {
  queue: true,
  enable(e: ICmd.ICommandEvent) {
    const { itemType, evt } = e;
    if (itemType === 'node') {
      // 判断节点重叠
      if (checkNodeOverlap.call(this, evt as IG6GraphEvent)) {
        alert('节点重叠');
        return false;
      }
    }
    return true;
  },
  execute(e: ICmd.ICommandEvent) {
    const { itemType } = e;
    // alert('测试');
    if (itemType === 'node') {
      // 执行拖拽
      dragNode.call(this, e);
    }
    return true;
  },
  back() {}
};

export default dragItem;
