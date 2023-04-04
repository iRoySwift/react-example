/*
 * @Author: Roy
 * @Date: 2022-07-25 15:18:17
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-18 11:46:59
 * @Description: 提交检查
 */
function checkBeforeSubmit(this: any) {
  // 2.未保存服务检查
  let nodes = this.graph.getNodes();
  for (let i = 0; i < nodes.length; i++) {
    const item = nodes[i];
    let {
      model: { isSaved, modelName }
    } = item.getModel() as any;
    if (!isSaved) {
      alert(`存在未保存的服务${modelName},请先配置服务`);
      return false;
    }
  }
  return true;
}

export { checkBeforeSubmit };
