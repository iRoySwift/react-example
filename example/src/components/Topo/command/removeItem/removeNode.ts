export function removeNode(e) {
  // @ts-ignore
  const self = this as any;
  const { item } = e;
  return self.graph.removeItem(item, self.queue);
}
