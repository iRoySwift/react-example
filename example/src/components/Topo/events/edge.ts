/*
 * @Author: Roy
 * @Date: 2022-08-03 14:51:23
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-17 17:04:44
 * @Description: 连线 事件处理方法
 */
import { IG6GraphEvent } from '@suning/uxcool-graphin';
import { resetHignLightNode, showHignLightNode } from '../utils/edgeCheck';

/**
 * 点击 线 编辑
 * @param this
 * @param e
 * @returns
 */
function edgeClick(this, e: IG6GraphEvent) {
  if (this.clickLoding) {
    return;
  }
  if (!this.clickLoding) {
    this.clickLoding = true;
    setTimeout(() => {
      this.clickLoding = false;
    }, 1000);
  }
  if (e.shape.get('isEditPoint')) {
    this.$Bus.emit('edge:edit', e);
  }
}

/**
 * edge drag start
 * @param this
 * @param e
 * @returns
 */
function edgeDragStart(this, e: IG6GraphEvent) {
  if (this.clickLoding) {
    return;
  }
  if (!this.clickLoding) {
    this.clickLoding = true;
    setTimeout(() => {
      this.clickLoding = false;
    }, 1000);
  }
  showHignLightNode.call(this, e);
}

/**
 * edge drag end
 * @param this
 * @param e
 * @returns
 */
function edgeDragEnd(this) {
  if (this.clickLoding) {
    return;
  }
  if (!this.clickLoding) {
    this.clickLoding = true;
    setTimeout(() => {
      this.clickLoding = false;
    }, 1000);
  }
  resetHignLightNode.call(this);
}

export { edgeClick, edgeDragStart, edgeDragEnd };
