/*
 * @Author: Roy
 * @Date: 2022-08-10 11:11:13
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-17 14:06:04
 * @Description: 连线检查
 */
import { nodeStyle } from '../model/config';
import { nodeUpdateStyle } from './nodeUpdate';

/**
 * 服务检查连接
 * @param this
 * @param model
 * @returns
 */
function checkLine(this, model) {
  const { source, target } = model;
  const sourceNode = this.graph.findById(source);
  const targetNode = this.graph.findById(target);
  const { model: sourceModel } = sourceNode.getModel();
  const { model: targetModel } = targetNode.getModel();
  return isConnected.call(this, sourceModel, targetModel);
}

/**
 * 检查服务是否可以连接
 * @param this
 * @param sourceModel
 * @param targetModel
 * @returns
 */
function isConnected(this, sourceModel, targetModel) {
  const { connectedObject } = sourceModel;
  const connectList = Object.keys(connectedObject).filter((item) => connectedObject[item]);
  return connectList.includes(targetModel.modelCode);
}

/**
 * 高亮可连接节点
 * @param this
 * @param e
 */
function showHignLightNode(this, e) {
  const item = e.item;
  const {
    model: { connectedObject }
  } = item.getModel();
  const connectList = Object.keys(connectedObject).filter((item) => connectedObject[item]);
  const nodes = this.graph.getNodes().filter((el) => connectList.includes(el.getModel().model.modelCode));
  nodes.forEach((node) => {
    nodeUpdateStyle.call(this, { node, style: nodeStyle.dragover });
  });
}

/**
 * 重置高亮节点
 * @param this
 * @param e
 */
function resetHignLightNode(this) {
  const nodes = this.graph.getNodes();
  nodes.forEach((node) => {
    nodeUpdateStyle.call(this, { node, style: nodeStyle.dragend });
  });
}

export { checkLine, showHignLightNode, resetHignLightNode };
