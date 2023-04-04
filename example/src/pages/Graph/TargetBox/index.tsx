import React, { useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Box, Button } from '@mui/material';
import Topo from '@/components/Topo';
import ServiceForm from './ServiceForm/index';
import $Bus from '@/utils/$Bus';
import { ItemTypes } from '..';
import { checkBeforeSubmit } from '../utils';
import { TopoData } from '@/components/Topo/model/okdData';
import { IGraph } from '@suning/uxcool-graphin/lib/interface/graph';
import './index.css';

interface Props {}
interface DropResult {
  title: string;
}
const DragItem: React.FC<Props> = () => {
  const topoRef: any = useRef(null);

  const [, _] = useDrop(() => ({
    accept: ItemTypes.DRAGITEM,
    hover: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        // alert(`You dropped ${item.title} into ${dropResult.title}!`);
      }
    },
    drop: (item: DropResult, monitor) => {
      $Bus.emit('drop', { ...item, ...monitor.getClientOffset() });
      return item;
    },
    getItem: (item) => {
      console.log(item);
    },
    // @ts-ignore
    canDrop(item, monitor) {
      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

  const getData = () => {
    const graph: IGraph = topoRef.current!.getGraph();
    let nodes: any[] = [],
      combos: any[] = [],
      edges: any[] = [];
    let nodeList = graph.getNodes();
    nodeList.forEach((item) => {
      let {
        id,
        x,
        y,
        model: { isSaved, status, modelCode }
      } = item.getModel() as any;
      nodes.push({
        id,
        x,
        y,
        isSaved,
        status,
        modelCode,
        comboId: null
      });
    });
    let edgeList = graph.getEdges();
    edgeList.forEach((item) => {
      let { id, source, target, status, isSaved } = item.getModel() as any;
      edges.push({
        id,
        source,
        target,
        status,
        isSaved
      });
    });

    return {
      nodes,
      edges,
      combos
    };
  };

  const submit = () => {
    const graph: IGraph = topoRef.current!.getGraph();
    let isCheck = checkBeforeSubmit.call({ graph });
    if (!isCheck) return;
    let data = getData();
    console.log(data);
  };

  /**
   * node click
   * @param e
   */
  const nodeClick = (e) => {
    const item = e.item;
    const {
      id,

      instanceCode,
      model: { compGroupId, isSaved, modelId }
    } = item.getModel();
    if (instanceCode) {
      alert('已服开服务，不可以修改！');
      return;
    }
    $Bus.emit('show:ServiceForm', {
      nodeId: id,
      isSaved,
      compGroupId,
      modelId,
      type: 'node'
    });
  };

  /**
   * 线 编辑
   * @param e
   */
  const edgeEdit = (e) => {
    const source = e.item?.get('source');
    const target = e.item?.get('target');
    const { id } = e.item.getModel();
    const {
      model: { modelCode: sourceModelCode }
    } = source.getModel();
    const {
      model: { modelCode: targetModelCode }
    } = target.getModel();
    $Bus.emit('show:ServiceForm', {
      id,
      sourceModelCode,
      targetModelCode,
      type: 'edge'
    });
  };

  const addUpdateNode = (e) => {
    $Bus.emit('node:update', e);
  };

  const addUpdateEdge = (e) => {
    $Bus.emit('node:edge', e);
  };

  const onDragOver = (e: any): any => {
    e.preventDefault();
    e.stopPropagation();
    e.persist();
  };

  const onDrop = (e: any): any => {
    e.persist();
    e.preventDefault();
    e.stopPropagation();
    const graph: IGraph = topoRef.current!.getGraph();
    let item = graph.getEventForCanvas(e);
    $Bus.emit('drop', item);
  };

  useEffect(() => {
    $Bus.on('node:click', nodeClick);
    $Bus.on('edge:edit', edgeEdit);
    $Bus.on('add:node:success', addUpdateNode);
    $Bus.on('add:edge:success', addUpdateEdge);
    return () => {
      $Bus.off('node:click', nodeClick);
      $Bus.off('edge:edit', edgeEdit);
      $Bus.off('add:node:success', addUpdateNode);
      $Bus.off('add:edge:success', addUpdateEdge);
    };
  }, []);

  return (
    <Box className="targetBox" onDragOver={onDragOver} onDrop={onDrop} sx={{ height: '100%', width: '100%' }}>
      <Button onClick={submit}>提交</Button>
      <Topo ref={topoRef} editModel="C" TopoData={TopoData} />
      <ServiceForm />
    </Box>
  );
};
export default DragItem;
