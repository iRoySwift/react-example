import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
// import withProvider, { closeDrawer,  openDrawer, useDrawerDispatch, useDrawerState } from './Store';
import { useAtom } from 'jotai';
import withProvider, { drawerAtom } from './Store';

// Button
const OpenButton = () => {
  // const dispatch = useDrawerDispatch();
  const [, setDrawer] = useAtom(drawerAtom);

  const toggleDrawer = () => () => {
    // dispatch(openDrawer(true));
    console.time();
    setDrawer(true);
    console.timeEnd();
  };
  return <Button onClick={toggleDrawer()}>Open drawer with Jotai</Button>;
};

// Drawer
const JotaiDemo = withProvider(() => {
  // const { drawer } = useDrawerState((state) => state.menuSlice);
  // const dispatch = useDrawerDispatch();

  const [drawer, setDrawer] = useAtom(drawerAtom);

  const toggleDrawer = () => () => {
    // dispatch(closeDrawer(false));
    console.time();
    setDrawer(false);
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
});

export default JotaiDemo;
