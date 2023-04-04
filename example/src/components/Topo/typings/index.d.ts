/*
 * @Author: Roy
 * @Date: 2022-05-05 09:54:22
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-18 11:37:35
 * @Description: 声明
 */
import { EdgeConfig, GraphData, NodeConfig, ICmd } from '@suning/uxcool-graphin';

export type iGroupType = {
  [key: string | number]: any[];
};

export interface iGraphData extends GraphData {
  nodes: iNodeConfig[];
  combos: [];
  edges: iEdgeConfig[];
}

export interface iNodeConfig extends NodeConfig {
  [key: string | number]: any;
  id?: any;
  x?: number | null;
  y?: number | null;

  icon?: {
    show?: boolean;
    img?: string;
    text?: string;
    width?: number;
    height?: number;
    offset?: number;
    fill?: string;
    [key: string | number]: any;
  };
  model: {
    compType?: string;
    groupId?: string | number;
    img?: string;
    status?: string;
    [key: string | number]: any;
  };
}

export interface ICommandObj {
  queue: boolean;
  enable(e: ICmd.ICommandEvent): boolean;
  execute(e: ICmd.ICommandEvent): boolean;
  back(): void;
}

export interface iEdgeConfig extends EdgeConfig {
  status: string;
  isSaved: boolean;
  iconColor?: any;
}
