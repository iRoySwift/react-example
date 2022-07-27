export function removeLine(params) {
  // @ts-ignore
  const self = this as any;
  const { item } = params;
  return self.graph.removeItem(item, self.queue);
}
