import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import $Bus from '@/utils/$Bus';
import { Button } from '@mui/material';

// type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TemporaryDrawer() {
  const [show, setShow] = React.useState(false);
  const [nodeId, setNodeId] = React.useState('');
  const anchor = 'right';

  const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setShow(false);
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer()} onKeyDown={toggleDrawer()}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={submit}>
        保存
      </Button>
    </Box>
  );

  const submit = () => {
    $Bus.emit('node:update', { nodeId, formData: { name: 'test' } });
  };

  const nodeClick = (e) => {
    const id = e.item.get('id');
    setNodeId(id);
    setShow(true);
  };
  React.useEffect(() => {
    $Bus.on('node:click', nodeClick);
    return () => {
      $Bus.off('node:click', nodeClick);
    };
  }, []);

  return (
    <React.Fragment key={anchor}>
      <Drawer anchor={anchor} open={show} onClose={toggleDrawer()}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
