function addNode(e) {
  const { model } = e;
  //@ts-ignore
  const self = this as any;
  return self.graph.addItem('node', model, self.queue);
}

export { addNode };
