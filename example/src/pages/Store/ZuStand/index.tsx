import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
// import withProvider, { closeDrawer, openDrawer, useStoreDispatch, useStoreState } from './Store';
import useDrawerStore from './Store';

// Button
const OpenButton = () => {
  // const dispatch = useStoreDispatch();
  const openDrawer = useDrawerStore((state) => (state as any)!.openDrawer);

  const toggleDrawer = () => () => {
    // dispatch(openDrawer(true));
    console.time();
    openDrawer();
    console.timeEnd();
  };
  return <Button onClick={toggleDrawer()}>Open drawer with Zustand</Button>;
};

// Drawer
const ZustandDemo = () => {
  // const { drawer } = useStoreState((state) => state.menuSlice);
  // const dispatch = useStoreDispatch();

  const { drawer, closeDrawer } = useDrawerStore((state: any) => state);

  const toggleDrawer = () => () => {
    // dispatch(closeDrawer(false));
    console.time();
    closeDrawer();
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
    </div>
  );
};

export default ZustandDemo;
