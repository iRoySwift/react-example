/*
 * @Author: Roy
 * @Date: 2022-05-03 23:29:19
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-18 11:36:38
 * @Description: 请填写简介
 */
import { setNodeStatus } from '../utils/formatData';

export default class AppNode {
  private cmd: any;
  private e: any;
  graph: any;
  constructor(args) {
    this.graph = args.graph;
    this.cmd = args.cmd;
    this.e = args.e;
  }
  public init() {
    const {
      domEvent: { dataTransfer },
      x,
      y
    } = this.e;
    const config = { status: '0', isSaved: false };
    const data = Object.assign(JSON.parse(dataTransfer.getData('data')), config);
    let nodeModel = setNodeStatus({ model: data });
    this.cmd.executeCommand('addItem', {
      itemType: 'node',
      model: {
        type: 'okdNodeCircle',
        x,
        y,
        label: data.modelName,
        ...nodeModel
      }
    });
  }
}
