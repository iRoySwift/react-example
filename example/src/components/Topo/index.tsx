import React, { forwardRef, ForwardRefRenderFunction, MutableRefObject, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import $Bus from '@/utils/$Bus';
import Graphin from '@suning/uxcool-graphin';
import { IG6GraphEvent } from '@suning/uxcool-graphin/typings/graph';
import { cloneDeep, each } from 'lodash';
import { formDataTransfer } from './utils/formatData';
import { drop } from './events/dnd';
import { toolbar, tooltip } from './plugins/index';
import * as commands from './command';
import { nodeUpdateModel } from './utils/nodeUpdate';
import { nodeClick, nodeDrop, nodeMouseEnter } from './events/node';
import { edgeClick, edgeDragEnd, edgeDragStart } from './events/edge';
import { IGraph } from '@suning/uxcool-graphin/lib/interface/graph';
import edgeUpdateModel from './utils/edgeUpdate';
import { compTypes } from './model/menu';
import { iGraphData } from './typings';
import './index.css';

interface Props {
  ref?: React.Ref<unknown> | undefined;
  editModel: string;
  TopoData: iGraphData;
}

const Topo: ForwardRefRenderFunction<unknown, Props> = ({ editModel, TopoData }, ref) => {
  let topoRef = useRef<HTMLDivElement>(null);
  let graph: MutableRefObject<IGraph | undefined> = useRef<IGraph>();

  useImperativeHandle(ref, () => ({
    getGraph: () => graph.current
  }));

  /**
   * 注册插件
   */
  const addPlugins = useCallback(() => {
    graph.current!.addPlugin(tooltip);
  }, []);

  /**
   * 命令注册
   */
  const registerCommand = () => {
    each(commands, (command, type: any) => {
      graph && graph.current!.cmd.registerCommand && graph.current!.cmd.registerCommand(type, command);
    });
  };

  /**
   * 展示V模式
   */
  const modelVisible = useCallback(() => {
    graph.current!.on('node:mouseenter', (e: IG6GraphEvent) => {
      nodeMouseEnter.call({ editModel, $Bus }, e);
    });
    // graph.current!.on('node:mouseout', (e) => {
    //   nodeMouseOut.call({ editModel, $Bus }, e);
    // });
  }, [editModel]);

  /**
   * 编辑C模式
   */
  const modelCreate = useCallback(() => {
    graph.current!.on('edge:click', (e) => {
      edgeClick.call({ editModel, graph: graph.current, $Bus }, e);
    });
    graph.current!.on('edge:dragstart', (e) => {
      edgeDragStart.call({ editModel, graph: graph.current, $Bus }, e);
    });
    graph.current!.on('edge:dragend', (e) => {
      edgeDragEnd.call({ editModel, graph: graph.current, $Bus }, e);
    });
  }, [editModel]);

  /**
   * 事件注册
   */
  const GraphOn = useCallback(() => {
    graph.current!.on('node:click', (e: IG6GraphEvent) => {
      nodeClick.call({ editModel, graph: graph.current, $Bus }, e);
    });
    graph.current!.on('node:drop', (e) => {
      nodeDrop.call({ editModel, graph: graph.current, $Bus }, e);
    });
    if (editModel === 'V') {
      modelVisible();
    }
    if (editModel === 'C') {
      modelCreate();
    }

    registerCommand();
  }, [editModel, modelCreate, modelVisible]);

  // @ts-ignore
  const initInstsance = useCallback(() => {
    const container = topoRef.current;
    const width = container!.scrollWidth || 900;
    const height = container!.scrollHeight || 500;

    const options: any = {
      container,
      width,
      height,
      fitCenter: true,
      // renderer: 'svg',
      fitView: true,
      enabledStack: true,
      plugins: [toolbar],
      modes: {
        default: [
          {
            type: 'drag-node',
            shouldBegin: (e) => {
              if (e.target.get('isAnchorPoint')) return false;
              return true;
            }
          },
          'drag-canvas',
          'node-click',
          'zoom-canvas'
        ],
        create: [
          'setCursor',
          'removeNode',
          'removeEdge',
          'click-select',
          {
            type: 'dragNode',
            shouldBegin: (e) => {
              if (e.target.get('isAnchorPoint')) return false;
              return true;
            },
            enableDelegate: true,
            delegateStyle: {
              radius: 45
            }
          },
          {
            type: 'createEdge',
            trigger: 'drag',
            shouldBegin: (e) => {
              if (!(e.target && e.target.get('isAnchorPoint') && e.target.get('name') === 'okdNodeCircle-right-anchor')) return false;
              return true;
            },
            shouldEnd: (e) => {
              if (!(e.target && e.target.get('isAnchorPoint') && e.target.get('name') === 'okdNodeCircle-left-anchor')) return false;
              return true;
            }
          },
          'drag-canvas',
          'node-click',
          'zoom-canvas'
        ]
      },
      defaultNode: {
        type: 'okdNodeCircle',
        size: [90],
        linkPoints: {
          top: false,
          right: true,
          bottom: false,
          left: true,
          size: 10
        },
        icon: {
          show: true,
          width: 60,
          height: 60,
          // fill: '#d3dbe1',
          img: ''
        },
        style: {
          fill: '#fff',
          stroke: '#33cc33',
          lineWidth: 5
        }
      },
      defaultEdge: {
        type: 'line',
        sourceAnchor: 1,
        targetAnchor: 0,
        style: {
          lineAppendWidth: 20,
          lineWidth: 2,
          endArrow: true,
          stroke: '#ccc'
        }
        // 其他配置
      },
      minZoom: 0.2,
      maxZoom: 1
    };
    graph.current = new Graphin.Graph(options);
    const editModelMap = {
      C: 'create',
      V: 'default'
    };
    if (editModel === 'C') {
      addPlugins();
    }
    graph.current!.setMode(editModelMap[editModel]);
    GraphOn();
  }, [GraphOn, addPlugins, editModel]);

  // @ts-ignore
  const readData = useCallback(() => {
    const data = cloneDeep(TopoData);
    const newTopoData: any = formDataTransfer(data, graph.current, compTypes);
    graph.current!.data(newTopoData);
    graph.current?.render();
    graph.current!.fitCenter();
    graph.current!.changeData();
  }, [TopoData]);

  // @ts-ignore
  const DropOn = useCallback((e: any) => {
    drop(graph.current, e);
  }, []);

  /**
   * 保存更新
   */
  const nodeUpdate = useCallback(
    (data) => {
      nodeUpdateModel.call({ editModel, graph: graph.current }, data);
    },
    [editModel]
  );
  /**
   * 保存更新
   */
  const edgeUpdate = useCallback(
    (data) => {
      edgeUpdateModel.call({ editModel, graph: graph.current }, data);
    },
    [editModel]
  );

  useEffect(() => {
    if (!graph.current) {
      initInstsance();
      readData();
    }
  }, [initInstsance, readData]);

  useEffect(() => {
    if (editModel === 'C') {
      $Bus.on('drop', DropOn);
      $Bus.on('node:update', nodeUpdate);
      $Bus.on('node:edge', edgeUpdate);
    }
    return () => {
      $Bus.off('drop', DropOn);
      $Bus.off('node:update', nodeUpdate);
      $Bus.off('node:edge', edgeUpdate);
    };
  }, [DropOn, edgeUpdate, editModel, nodeUpdate]);

  return (
    <div>
      <div
        className="graphin-core"
        ref={topoRef}></div>
    </div>
  );
};
export default forwardRef(Topo);
