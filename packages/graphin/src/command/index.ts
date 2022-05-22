import { Graph } from '@antv/g6';
import { clone } from '@antv/util';
import { GraphData, ICommandExeData } from '../../typings/index';

class Command {
  graph: Graph;
  commandCollection: any;
  constructor(graph: Graph) {
    this.graph = graph;
    this.commandCollection = Object.create(null);
  }
  /**
   * 追加进入全局的命令缓存里面
   * @param commandName
   * @param commanObj
   */
  public registerCommand(commandName: string | number, commanObj: any): void {
    !this.commandCollection[commandName] && (this.commandCollection[commandName] = commanObj);
  }

  /**
   *
   * @param commandName{String}
   * @param dataObject{Object} model(数据模型)，itemType：‘group’，‘node’，‘edge’，item（当前操作的对象），targetItem，
   */
  public executeCommand(commandName: any, dataObject: ICommandExeData) {
    // const { itemType, model } = dataObject;
    const commander = clone(this.commandCollection[commandName]);
    if (commander) {
      commander.graph = this.graph;
      return Promise.resolve(commander)
        .then(commander.enable.bind(this))
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
