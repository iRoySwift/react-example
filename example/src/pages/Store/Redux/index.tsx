import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import withProvider, { closeDrawer, openDrawer, useDrawerDispatch, useDrawerState } from './Store';
import Test from './Test';

// Button
const OpenButton = () => {
  const dispatch = useDrawerDispatch();

  const toggleDrawer = () => () => {
    console.time();
    dispatch(openDrawer(true));
    console.timeEnd();
  };
  return <Button onClick={toggleDrawer()}>Open drawer with Redux</Button>;
};

// Drawer
const ReduxDemo = withProvider(() => {
  const { drawer } = useDrawerState((state) => state.menuSlice);
  console.log('🚀 ~ ReduxDemo ~ drawer:', drawer);
  const dispatch = useDrawerDispatch();

  const toggleDrawer = () => () => {
    console.time();
    dispatch(closeDrawer(false));
    console.timeEnd();
  };
  return (
    <div>
      <OpenButton />
      <Drawer
        anchor={'right'}
        open={drawer}
        onClose={toggleDrawer()}>
        <Box sx={{ display: 'flex', width: 250, height: '100%', alignItems: 'center', justifyContent: 'center' }}> test store</Box>
      </Drawer>
      <Test />
    </div>
  );
});

export default ReduxDemo;
