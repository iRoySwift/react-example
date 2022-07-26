export default function nodeUpdate(this: any, data) {
  const { nodeId, formData } = data;
  const { name } = formData;
  let node = this.graph.findById(nodeId);

  this.graph.updateItem(node, {
    ...node.model,
    isSaved: true,
    label: name,
    formData,
    style: {
      stroke: '#3F52B4'
    }
  });
  this.graph.paint();
}
