function checkBeforeSubmit(this: any) {
  // 2.未保存服务检查
  let nodes = this.graph.getNodes();
  for (let i = 0; i < nodes.length; i++) {
    const item = nodes[i];
    let { isSaved, model } = item.getModel() as any;
    if (!isSaved) {
      alert(`存在未保存的服务${model.modelName},请先配置服务`);
      return false;
    }
  }
  return true;
}

export { checkBeforeSubmit };
