import AppNode from '../shape/AppNode';

export function drop(graph, e) {
  const cmd = graph.cmd;
  const node = new AppNode({ graph, cmd, e });
  node.init();
}
