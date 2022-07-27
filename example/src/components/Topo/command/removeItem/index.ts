import { removeLine } from './removeLine';
import { removeNode } from './removeNode';

const removeItem = {
  queue: true, // 是否加入执行栈
  enable() {
    return true;
  },
  execute(e) {
    const item = e.item;
    let itemId = null;
    // node
    if (item.get('type') === 'node') {
      itemId = removeNode.call(this, e);
      return itemId;
    }
    // line
    if (item.get('type') === 'edge') {
      itemId = removeLine.call(this, e);
    }

    return itemId;
  },
  back() {}
};

export default removeItem;
