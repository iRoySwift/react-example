/*
 * @Author: Roy
 * @Date: 2022-08-17 17:38:44
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-18 11:37:13
 * @Description: 请填写简介
 */

import { setEdgeStatus } from './formatData';

export default function edgeUpdateModel(this: any, data) {
  const { nodeId, formData } = data;
  let node = this.graph.findById(nodeId);
  const config = setEdgeStatus({ status: '1', isSaved: true });
  this.graph.updateItem(node, {
    formData,
    ...config
  });
  this.graph.paint();
}
