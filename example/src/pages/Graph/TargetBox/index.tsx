import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Box, Button } from '@mui/material';
import Topo from '@/components/Topo';
import eventBus from '@/utils/eventBus';
import { ItemTypes } from '..';
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
      eventBus.emit('drop', { ...item, ...monitor.getClientOffset() });
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

  const submit = () => {
    let node = topoRef.current!.getGraph()!.getNodes();
    let id = node[2]._cfg.id;
    eventBus.emit('node:update', id);
  };
  return (
    <Box className="targetBox" ref={drop} sx={{ height: '100%', width: '100%' }}>
      <Button onClick={submit}>提交</Button>
      <Topo ref={topoRef} editModel="C" />
    </Box>
  );
};
export default DragItem;
