/*
 * @Author: Roy
 * @Date: 2022-05-03 23:45:09
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-16 17:26:08
 * @Description: 命令工具
 */
import { clone } from '@antv/util';
import { ICmd } from '../../typings/custom';
import { IGraph } from '../interface/graph';

class Command {
  graph: IGraph;
  commandCollection: any;
  constructor(graph: IGraph) {
    this.graph = graph;
    this.commandCollection = Object.create(null);
  }
  /**
   * 追加进入全局的命令缓存里面
   * @param commandName
   * @param commanObj
   */
  public registerCommand(commandName: ICmd.ICommandName, commanObj: any): void {
    !this.commandCollection[commandName] && (this.commandCollection[commandName] = commanObj);
  }

  /**
   *
   * @param commandName{String}
   * @param dataObject{Object} model(数据模型)，itemType：‘group’，‘node’，‘edge’，item（当前操作的对象），targetItem，
   */
  public executeCommand(commandName: ICmd.ICommandName, dataObject: ICmd.ICommandEvent) {
    const commander = clone(this.commandCollection[commandName]);
    if (commander) {
      commander.graph = this.graph;
      return Promise.resolve(dataObject)
        .then(commander.enable.bind(commander))
        .then((enable) => {
          if (enable) {
            return commander.execute(dataObject);
          } else {
            return false;
          }
        })
        .then((result) => {
          // if (commander.queue) {
          //   const addedModel = {
          //     ...model,
          //     itemType
          //   };
          //   const after: GraphData = {};
          //   after[itemType] = [addedModel];
          //   commander.graph.pushStack('add', {
          //     before: {},
          //     after
          //   });
          // }
          return result;
        });
    } else {
      throw new Error(`the command you called [${commandName}] does not exist!`);
    }
  }

  public get(object: any, property: any) {
    if (Reflect.has(object, property)) {
      return Reflect.get(object, property);
    } else {
      return function () {
        console.error('you called ' + property + " but it doesn't exist!");
      };
    }
  }
}

export default Command;
