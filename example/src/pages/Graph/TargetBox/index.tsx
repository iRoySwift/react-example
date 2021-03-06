import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Box, Button } from '@mui/material';
import Topo from '@/components/Topo';
import Graph from '@suning/uxcool-graphin/lib/graph/index';
import ServiceForm from './ServiceForm/index';
import $Bus from '@/utils/$Bus';
import { ItemTypes } from '..';
import { checkBeforeSubmit } from '../utils';
import { TopoData } from '@/components/Topo/model/okdData';
import './index.css';

interface Props {}
interface DropResult {
  title: string;
}
const DragItem: React.FC<Props> = () => {
  const topoRef: any = useRef(null);

  const [_, drop] = useDrop(() => ({
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
    const graph: Graph = topoRef.current!.getGraph();
    let nodes: any[] = [],
      combos: any[] = [],
      edges: any[] = [];
    let nodeList = graph.getNodes();
    nodeList.forEach((item) => {
      let { id, x, y, isSaved, model } = item.getModel() as any;
      nodes.push({
        id,
        x,
        y,
        isSaved,
        modelCode: model.modelCode,
        comboId: null
      });
    });
    let edgeList = graph.getEdges();
    edgeList.forEach((item) => {
      let { source, target } = item.getModel() as any;
      edges.push({
        source,
        target
      });
    });

    return {
      nodes,
      edges,
      combos
    };
  };

  const nodeClick = (e) => {
    const item = e.item;
    const {
      id,
      isSaved,
      model: { compGroupId, modelId }
    } = item.getModel();
    $Bus.emit('show:ServiceForm', {
      id,
      isSaved,
      compGroupId,
      modelId
    });
  };

  const submit = () => {
    const graph: Graph = topoRef.current!.getGraph();
    let isCheck = checkBeforeSubmit.call({ graph });
    if (!isCheck) return;
    let data = getData();
    console.log(data);
  };

  React.useEffect(() => {
    $Bus.on('node:click', nodeClick);
    return () => {
      $Bus.off('node:click', nodeClick);
    };
  }, []);

  return (
    <Box className="targetBox" ref={drop} sx={{ height: '100%', width: '100%' }}>
      <Button onClick={submit}>??????</Button>
      <Topo ref={topoRef} editModel="C" TopoData={TopoData} />
      <ServiceForm />
    </Box>
  );
};
export default DragItem;
