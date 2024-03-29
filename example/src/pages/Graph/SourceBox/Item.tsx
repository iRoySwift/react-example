import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Inbox as InboxIcon } from '@mui/icons-material';
import React, { CSSProperties } from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { ItemTypes } from '../index';
import { boxImage } from './boxImage';

const style: CSSProperties = {
  cursor: 'move'
};

interface DropResult {
  id: string | number;
  name: string;
  modelCode: string;
  compGroupId: string | number;
  showLocation: null;
  connComp: string;
  icon: string;
  description: string;
}

interface Props {
  name: string;
  showCopyIcon?: boolean;
  data: any;
}
const Item: React.FC<Props> = ({ name, showCopyIcon, data }) => {
  const [{ opacity, handlerId }, _, dragPreview] = useDrag(() => ({
    type: ItemTypes.DRAGITEM,
    item: { data },
    options: {
      dropEffect: showCopyIcon ? 'copy' : 'move'
    },
    // @ts-ignore
    canDrag(monitor) {
      return true;
    },
    // @ts-ignore
    isDragging(monitor) {
      return true;
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        // alert(`You dropped ${item.title} into ${dropResult.title}!`);
      }
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
      opacity: monitor.isDragging() ? 0.4 : 1
    })
  }));

  const onDragStart = (e: any): void => {
    // e.preventDefault();
    e.stopPropagation();
    e.persist();
    e.dataTransfer.setData('data', JSON.stringify(data));
    e.dataTransfer.setDragImage(e.target.children[0], 0, 0);
  };

  return (
    <>
      <DragPreviewImage connect={dragPreview} src={boxImage} />
      <ListItem disablePadding sx={{ opacity, height: 48 }} data-handler-id={handlerId}>
        <ListItemButton sx={{ ...style }} draggable="true" onDragStart={onDragStart}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
    </>
  );
};
export default Item;
