/*
 * @Author: Roy
 * @Date: 2022-04-13 18:05:34
 * @LastEditors: Roy
 * @LastEditTime: 2022-11-07 17:54:52
 * @Description: 修改接口
 */
import { IG6GraphEvent, INode, Item, NodeConfig } from './graph';

declare namespace ICmd {
  export type ICommandName = 'addItem' | 'removeItem' | 'dragItem';
  /**
   * executeCommand命令参数
   */
  export interface ICommandEvent {
    itemType: 'combo' | 'node' | 'edge';
    model?: any;
    evt?: IG6GraphEvent;
    item?: Item;
    [k: string]: any;
  }
}

/**
 * 自定义节点参数
 */
export interface CustomModelConfig extends NodeConfig {
  model?: any;
  [k: string]: any;
}

/**
 * 鼠标类型
 */
export enum iCursorType {
  'auto',
  'default',
  'pointer',
  'crosshair',
  'move',
  'not-allowed',
  'grab',
  'zoom-in',
  'zoom-out'
}

export interface IEventForCanvas {
  item: INode | null;
  shape: any;
  x: number;
  y: number;
  domX: number;
  domY: number;
  domEvent: DragEvent;
}
