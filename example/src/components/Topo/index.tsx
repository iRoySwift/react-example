import React, { useCallback, useEffect, useRef } from 'react';
import Graphin from '@suning/uxcool-graphin';
import Graph from '@suning/uxcool-graphin/lib/graph/index';
import { TopoData } from './model/okdData';
import './index.scss';
import { sefDefaultConfig } from './utils/formatData';
// import formDataTransfer from './utils/dataTransfer';

interface Props {}
const Topo: React.FC<Props> = () => {
  const topoRef = useRef<HTMLDivElement>(null);
  let graph: Graph;
  useEffect(() => {
    console.log('topoRef', topoRef);
    // initGraphInstsance();
    // readData();
    if (!graph) {
      console.log(graph);
      initInstsance();
      readData();
    }

    return () => {};
  }, []);

  // @ts-ignore
  const initInstsance = () => {
    const container = topoRef.current;
    const width = topoRef.current?.scrollWidth || 900;
    const height = topoRef.current?.scrollHeight || 500;
    console.log(topoRef.current);
    console.log(width, height);
    const options: any = {
      container,
      width,
      height,
      // translate the graph to align the canvas's center, support by v3.5.1
      fitCenter: true,
      renderer: 'canvas',
      fitView: true,
      // plugins: [toolbar, tooltip],
      modes: {
        default: [
          'drag-node',
          'drag-canvas',
          'node-click',
          {
            type: 'drag-combo',
            enableDelegate: true
          },
          'drag-node-with-group',
          'zoom-canvas'
        ]
      },
      defaultNode: {
        type: 'okdNodeCircle'
      },
      defaultEdge: {
        type: 'line',
        sourceAnchor: 1,
        targetAnchor: 0,
        style: {
          lineAppendWidth: 10,
          cursor: 'pointer',
          endArrow: {
            path: Graphin.Arrow.triangle(),
            fill: '#d3dbe1',
            stroke: '#d3dbe1',
            lineWidth: 3
          }
        }
        // 其他配置
      },
      minZoom: 0.2,
      maxZoom: 6
    };
    graph = new Graphin.Graph(options);
  };

  // @ts-ignore
  const readData = useCallback(() => {
    // const newTopoData = formDataTransfer(cloneDeep(TopoData), graph?.current, comptype);
    // console.log(newTopoData, '--');
    graph?.data(sefDefaultConfig(TopoData));
    graph?.render(); //
    graph?.fitCenter();
    graph?.changeData();
  }, []);

  return <div className="graphin-core" ref={topoRef}></div>;
};
export default Topo;
