import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import withProvider, { closeDrawer, openDrawer, useDrawerDispatch, useDrawerState } from './Store';

// Button
const OpenButton = () => {
  const dispatch = useDrawerDispatch();

  const toggleDrawer = () => () => {
    dispatch(openDrawer(true));
  };
  return <Button onClick={toggleDrawer()}>Open drawer with Redux</Button>;
};

// Drawer
const ReduxDemo = withProvider(() => {
  const { drawer } = useDrawerState((state) => state.menuSlice);
  const dispatch = useDrawerDispatch();

  const toggleDrawer = () => () => {
    dispatch(closeDrawer(false));
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
    </div>
  );
});

export default ReduxDemo;
