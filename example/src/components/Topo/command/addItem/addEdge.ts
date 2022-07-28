function addEdge(e) {
  const { model } = e;
  //@ts-ignore
  const self = this as any;
  return self.graph.addItem('edge', model, self.queue);
}

export { addEdge };
