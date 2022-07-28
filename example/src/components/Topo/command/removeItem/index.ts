import { removeLine } from './removeEdge';
import { removeNode } from './removeNode';

const removeItem = {
  queue: true, // 是否加入执行栈
  enable() {
    return true;
  },
  execute(e) {
    const item = e.item;
    let nodeItem = null;
    // node
    if (item.get('type') === 'node') {
      nodeItem = removeNode.call(this, e);
      return nodeItem;
    }
    // line
    if (item.get('type') === 'edge') {
      nodeItem = removeLine.call(this, e);
    }

    return nodeItem;
  },
  back() {}
};

export default removeItem;
