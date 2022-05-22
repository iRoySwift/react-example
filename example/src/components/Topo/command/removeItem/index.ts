import { removeNode } from './removeNode';

const removeItem = {
  queue: true, // 是否加入执行栈
  enable() {
    return true;
  },
  execute(e) {
    // const { itemType, model } = e;
    const item = removeNode.call(this, e);
    // const item = (this as any).graph.removeItem(itemType, model, this.queue);
    console.log(item);
    return item;
  },
  back() {}
};

export default removeItem;
