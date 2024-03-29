/*
 * @Author: Roy
 * @Date: 2022-04-13 23:01:21
 * @LastEditors: Roy
 * @LastEditTime: 2022-11-08 10:48:14
 * @Description: 请填写简介
 */
import React from 'react';
import SourceBox from './SourceBox/index';
import { Grid } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TargetBox from './TargetBox';

export const ItemTypes = {
  DRAGITEM: 'DragItem'
};

interface Props {}
const Graph: React.FC<Props> = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container sx={{ height: '100%', userSelect: 'none' }} direction="column">
        <Grid item sx={{ width: 250 }}>
          <SourceBox />
        </Grid>
        <Grid item xs={12} container sx={{ background: '#fff' }}>
          <TargetBox />
        </Grid>
      </Grid>
    </DndProvider>
  );
};
export default Graph;
