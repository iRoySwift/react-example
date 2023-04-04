/*
 * @Author: Roy
 * @Date: 2022-07-21 17:11:29
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-18 11:35:58
 * @Description: 更新节点
 */

import { setNodeStatus } from './formatData';

/**
 * 编辑node model 保存更新
 * @param this
 * @param data
 */
function nodeUpdateModel(this: any, data) {
  const { nodeId, formData } = data;
  const { name } = formData;
  let node = this.graph.findById(nodeId);
  const { model } = node.getModel();
  const config = Object.assign(model, { status: '1', isSaved: true });
  let nodeModel = setNodeStatus({ model: config });
  this.graph.updateItem(node, {
    label: name,
    formData,
    ...nodeModel
  });
  this.graph.paint();
}

/**
 * 更新node style
 * @param this
 * @param data
 */
function nodeUpdateStyle(this, data) {
  const { node, style } = data;
  this.graph.updateItem(node, {
    style
  });
}

export { nodeUpdateModel, nodeUpdateStyle };
