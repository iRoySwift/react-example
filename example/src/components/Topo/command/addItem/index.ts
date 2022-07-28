import { addEdge } from './addEdge';
import { addNode } from './addNode';

const addItem = {
  queue: true,
  enable() {
    return true;
  },
  execute(e) {
    const { itemType, model } = e;
    let nodeItem = null;
    let uuid = (this as any).graph.uuid();
    model.id = uuid;
    if (itemType === 'node') {
      nodeItem = addNode.call(this, e);
      return nodeItem;
    }
    if (itemType === 'edge') {
      nodeItem = addEdge.call(this, e);
      return nodeItem;
    }
    return nodeItem;
  },
  back() {}
};

export default addItem;
