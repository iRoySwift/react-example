import { setNodeStatus } from '../utils/formatData';

export default class AppNode {
  private cmd: any;
  private e: any;
  // @ts-ignore
  private graph: any;
  constructor(args) {
    this.graph = args.graph;
    this.cmd = args.cmd;
    this.e = args.e;
  }
  public init() {
    const { x, y, data } = this.e;
    let node = setNodeStatus({ id: this.graph.uuid(), model: data });
    this.cmd.executeCommand('addItem', {
      itemType: 'node',
      model: {
        type: 'okdNodeCircle',
        x,
        y,
        label: data.modelName,
        isSaved: false,
        ...node
      }
    });
  }
}
