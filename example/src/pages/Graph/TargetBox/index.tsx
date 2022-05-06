import React from 'react';
import { useDrop } from 'react-dnd';
import { Box } from '@mui/material';
import Topo from '@/components/Topo';
import eventBus from '@/utils/eventBus';
import { ItemTypes } from '..';
import './index.scss';

interface Props {}
interface DropResult {
  title: string;
}
const DragItem: React.FC<Props> = () => {
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
    canDrop(item, monitor) {
      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));
  return (
    <Box className="targetBox" ref={drop} sx={{ height: '100%', width: '100%' }}>
      <Topo />
    </Box>
  );
};
export default DragItem;
