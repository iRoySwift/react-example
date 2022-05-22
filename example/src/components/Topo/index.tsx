import React, { useCallback, useEffect, useRef } from 'react';
import Graphin from '@suning/uxcool-graphin';
import { cloneDeep, each } from 'lodash';
import { TopoData } from './model/okdData';
import './index.scss';
import { formDataTransfer } from './utils/formatData';
import DragAndDrop from './plugins/dnd';
import eventBus from '@/utils/eventBus';
import { drop } from './events/dnd';
import { toolbar } from './plugins/index';
import * as commands from './command';
import Graph from '@suning/uxcool-graphin/lib/graph/index';

interface Props {
  ref?: React.Ref<unknown> | undefined;
}

const Topo: React.FC<Props> = () => {
  const topoRef = useRef<HTMLDivElement>(null);
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
  type NewType = Graph;

  let graph: NewType;

  useEffect(() => {
    if (!graph) {
      initInstsance();
      readData();
    }
  }, []);

  // @ts-ignore
  const initInstsance = () => {
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
          'removeNode',
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
              if (!(e.target && e.target.get('isAnchorPoint') && e.target.get('name') == 'okdNodeCircle-right-anchor')) return false;
              return true;
            },
            shouldEnd: (e) => {
              if (!(e.target && e.target.get('isAnchorPoint') && e.target.get('name') == 'okdNodeCircle-left-anchor')) return false;
              return true;
            }
          },
          'drag-canvas',
          'node-click',
          // {
          //   type: 'drag-combo',
          //   enableDelegate: true
          // },
          // 'drag-node-with-group',
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
        style: {
          fill: '#fff',
          // stroke: '#d3dbe1',
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
    graph = new Graphin.Graph(options);
    addPlugins();
    GraphOn();
  };

  const addPlugins = () => {
    const dnd: any = new DragAndDrop();
    graph.addPlugin(dnd);
  };

  // @ts-ignore
  const readData = useCallback(() => {
    const newTopoData = formDataTransfer(cloneDeep(TopoData), graph, compTypes);
    console.log(newTopoData, 'ss0');
    graph?.read(cloneDeep(newTopoData as any));
    // graph?.render();
    graph?.fitCenter();
  }, []);

  // @ts-ignore
  const DropOn = useCallback((args: any) => {
    const { x, y } = graph?.getPointByClient(args?.x || 0, args?.y || 0);
    drop(graph, { ...args, x, y });
  }, []);

  // 事件注册
  const GraphOn = () => {
    registerCommand();
  };

  // 命令注册
  const registerCommand = () => {
    each(commands, (command, type) => {
      graph && graph.cmd.registerCommand && graph?.cmd.registerCommand(type, command);
    });
  };

  // 服务事件监听
  // const nodeAddeventent = () => {
  //   graph.on('node:mouseenter', function (evt: IG6GraphEvent) {
  //     const node = evt.item;
  //     const model = node.getModel();
  //     model.oriLabel = model.label;
  //     graph.updateItem(node, {
  //       label: `after been hovered ${model.id}`,
  //       labelCfg: {
  //         style: {
  //           fill: '#003a8c'
  //         }
  //       }
  //     });
  //   });

  //   graph.on('node:mouseleave', function (evt) {
  //     const node = evt.item;
  //     const model = node.getModel();
  //     graph.updateItem(node, {
  //       label: model.oriLabel,
  //       labelCfg: {
  //         style: {
  //           fill: '#555'
  //         }
  //       }
  //     });
  //   });
  // };

  useEffect(() => {
    eventBus.on('drop', DropOn);
    return () => {
      eventBus.off('drop', DropOn);
    };
  }, [DropOn]);

  return <div className="graphin-core" ref={topoRef}></div>;
};
export default Topo;
