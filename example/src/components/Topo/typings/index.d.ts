import { GraphData, NodeConfig, EdgeConfig } from '@antv/g6-core';

export type iGroupType = {
  [key: string | number]: any[];
};

export interface iGraphData extends GraphData {
  nodes: iNodeConfig[];
}

export interface iNodeConfig extends NodeConfig {
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

export interface iEdgeConfig extends EdgeConfig {}
