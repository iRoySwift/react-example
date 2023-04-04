/*
 * @Author: Roy
 * @Date: 2022-07-22 18:01:35
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-25 10:34:51
 * @Description: 节点 事件处理方法
 */
import { IG6GraphEvent } from '@suning/uxcool-graphin';

function nodeClick(this, e: IG6GraphEvent) {
  if (this.clickLoding) {
    return;
  }
  if (!this.clickLoding) {
    this.clickLoding = true;
    setTimeout(() => {
      this.clickLoding = false;
    }, 1000);
  }
  // 非引导线
  if (e.shape.get('isAnchorPoint') || e.shape.get('isClosePoint')) return;
  if (this.editModel === 'V') {
    this.$Bus.emit('node:detail', e);
    return;
  }
  this.$Bus.emit('node:click', e);
}
function nodeDrop(this, e: IG6GraphEvent) {
  const graph = this.graph;
  if (this.clickLoding) {
    return;
  }
  if (!this.clickLoding) {
    this.clickLoding = true;
    setTimeout(() => {
      this.clickLoding = false;
    }, 1000);
  }
  if (this.editModel === 'V') {
    this.$Bus.emit('node:move', e);
    return;
  }
  this.$Bus.emit('node:drop', { e, graph });
}

function nodeMouseEnter(this, _e: IG6GraphEvent) {}

function nodeMouseOut() {
  // let tooltipDom = document.querySelectorAll('.g6-component-tooltip');
  // if (tooltipDom.length) {
  //   //@ts-ignore
  //   tooltipDom[0].style.visibility = 'hidden';
  // }
}

export { nodeClick, nodeDrop, nodeMouseEnter, nodeMouseOut };
