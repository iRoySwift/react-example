export default function nodeUpdate(this: any, nodeId) {
  let node = this.graph.findById(nodeId);

  this.graph.updateItem(node, {
    ...node.model,
    isSaved: true,
    label: 'save',
    style: {
      stroke: '#3F52B4'
    }
  });
  this.graph.paint();
}
