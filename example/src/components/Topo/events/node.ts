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

function nodeMouseEnter(this, e: IG6GraphEvent) {
  console.log(this, e);
}

function nodeMouseOut() {
  let tooltipDom = document.querySelectorAll('.g6-component-tooltip');
  if (tooltipDom.length) {
    //@ts-ignore
    tooltipDom[0].style.visibility = 'hidden';
  }
}

export { nodeClick, nodeDrop, nodeMouseEnter, nodeMouseOut };
