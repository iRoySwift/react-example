import React, { forwardRef, ForwardRefRenderFunction, MutableRefObject, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import Graphin, { IG6GraphEvent } from '@suning/uxcool-graphin';
import { cloneDeep, each } from 'lodash';
import './index.css';
import { formDataTransfer } from './utils/formatData';
import DragAndDrop from './plugins/dnd';
import $Bus from '@/utils/$Bus';
import { drop } from './events/dnd';
import { toolbar } from './plugins/index';
import * as commands from './command';
import Graph from '@suning/uxcool-graphin/lib/graph/index';
import { nodeClick, nodeDrop, nodeMouseEnter, nodeMouseOut } from './events/node';
import nodeUpdate from './events/nodeUpdate';
import { iGraphData } from './typings';

interface Props {
  ref?: React.Ref<unknown> | undefined;
  editModel: string;
  TopoData: iGraphData;
}

const Topo: ForwardRefRenderFunction<unknown, Props> = ({ editModel, TopoData }, ref) => {
  let topoRef = useRef<HTMLDivElement>(null);
  let graph: MutableRefObject<Graph | undefined> = useRef<Graph>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const compTypes = [
    { searchValue: null, createBy: 'admim', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 1, name: '负载均衡', modelCode: 'lb', compGroupId: 1, showLocation: null, connComp: '', icon: '/icon/lb.svg', description: '', dependIpFlag: 1, status: 0, delFlag: 0 },
    { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 2, name: '域名', modelCode: 'dns', compGroupId: 1, showLocation: null, connComp: '', icon: '/icon/dns.svg', description: '', dependIpFlag: 1, status: 0, delFlag: 0 },
    { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 3, name: 'Tomcat', modelCode: 'tomcat', compGroupId: 2, showLocation: null, connComp: '', icon: '/icon/tomcat.svg', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
    { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 6, name: 'xxl-job', modelCode: 'xxljob', compGroupId: 3, showLocation: null, connComp: '', icon: '/icon/tomcat.svg', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
    { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 7, name: 'MySQL', modelCode: 'mysql', compGroupId: 4, showLocation: null, connComp: '', icon: '/icon/mysql.svg', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
    { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 8, name: 'Redis', modelCode: 'redis', compGroupId: 4, showLocation: null, connComp: '', icon: '/icon/redis.svg', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
    { searchValue: null, createBy: 'admin', createTime: '2022-04-11 09:03:47', updateBy: '', updateTime: null, remark: null, params: {}, id: 9, name: '自定义', modelCode: 'custom', compGroupId: 5, showLocation: null, connComp: '', icon: '/icon/zidingyi.svg', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
    { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 10, name: 'OpenJDK', modelCode: 'openjdk', compGroupId: 2, showLocation: null, connComp: '', icon: '', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
    { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 11, name: 'Nginx Web服务器', modelCode: 'nginx', compGroupId: 2, showLocation: null, connComp: '', icon: '', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
    { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 12, name: '分布式消息队列', modelCode: 'rocketmq', compGroupId: 3, showLocation: null, connComp: '', icon: '', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
    { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 13, name: '分布式服务发现和配置管理平台', modelCode: 'nacos', compGroupId: 3, showLocation: null, connComp: '', icon: '', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
    { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 14, name: '应用防火墙', modelCode: 'waf', compGroupId: 1, showLocation: null, connComp: '', icon: '', description: '', dependIpFlag: 0, status: 0, delFlag: 0 }
  ];

  useImperativeHandle(ref, () => ({
    getGraph: () => graph.current
  }));

  /**
   * 注册插件
   */
  const addPlugins = useCallback(() => {
    const dnd: any = new DragAndDrop();
    graph.current!.addPlugin(dnd);
  }, []);

  /**
   * 命令注册
   */
  const registerCommand = () => {
    each(commands, (command, type) => {
      graph && graph.current!.cmd.registerCommand && graph.current!.cmd.registerCommand(type, command);
    });
  };

  /**
   * 事件注册
   */
  const GraphOn = useCallback(() => {
    graph.current!.on('node:click', (e: IG6GraphEvent) => {
      nodeClick.call({ editModel, graph: graph.current, $Bus }, e);
    });
    if (editModel === 'V') {
      graph.current!.on('node:mouseenter', (e: IG6GraphEvent) => {
        nodeMouseEnter.call({ editModel, $Bus }, e);
      });
      graph.current!.on('node:mouseout', (e) => {
        nodeMouseOut.call({ editModel, $Bus }, e);
      });
    }
    graph.current!.on('node:drop', (e) => {
      nodeDrop.call({ editModel, graph: graph.current, $Bus }, e);
    });
    registerCommand();
  }, [editModel]);

  // @ts-ignore
  const initInstsance = useCallback(() => {
    const container = topoRef.current;
    const width = topoRef.current?.scrollWidth || 900;
    const height = topoRef.current?.scrollHeight || 500;

    const options: any = {
      container,
      width,
      height,
      fitCenter: true,
      renderer: 'svg',
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
          'removeNode',
          'removeEdge',
          {
            type: 'drag-node',
            shouldBegin: (e) => {
              if (e.target.get('isAnchorPoint')) return false;
              return true;
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
          fill: '#d3dbe1',
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
          lineAppendWidth: 10,
          lineWidth: 2,
          cursor: 'pointer',
          endArrow: true,
          stroke: '#ccc'
        }
        // 其他配置
      },
      minZoom: 0.2,
      maxZoom: 6
    };
    graph.current = new Graphin.Graph(options);
    const editModelMap = {
      C: 'create',
      V: 'default'
    };
    if (editModel === 'V') {
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
  }, [compTypes]);

  // @ts-ignore
  const DropOn = useCallback((args: any) => {
    const { x, y } = graph.current!.getPointByClient(args?.x || 0, args?.y || 0);
    drop(graph.current, { ...args, x, y });
  }, []);

  useEffect(() => {
    if (!graph.current) {
      initInstsance();
      readData();
    }
  }, [initInstsance, readData]);

  useEffect(() => {
    if (editModel === 'C') {
      $Bus.on('drop', DropOn);
      $Bus.on('node:update', (nodeId) => nodeUpdate.call({ editModel, graph: graph.current }, nodeId));
    }
    return () => {
      $Bus.off('drop', DropOn);
    };
  }, [DropOn, editModel]);

  return <div className="graphin-core" ref={topoRef}></div>;
};
export default forwardRef(Topo);
