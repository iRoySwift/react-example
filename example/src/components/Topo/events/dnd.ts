/*
 * @Author: Roy
 * @Date: 2022-05-03 17:40:03
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-18 14:56:56
 * @Description: 拖拽 服务
 */
import AppNode from '../shape/AppNode';

// TODO:1.校验服务位置重叠；2.添加一个服务；3.高亮可放服务位置

export function drop(graph, e) {
  const { item } = e;
  if (item) {
    alert('请放于空白处');
    return;
  }
  const cmd = graph.cmd;
  const node = new AppNode({ graph, cmd, e });
  node.init();
}
