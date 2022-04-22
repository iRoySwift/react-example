import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import { Folder as FolderIcon } from '@mui/icons-material';

// function generate(element: React.ReactElement) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value
//     })
//   );
// }

interface Props {}
const SideBar: React.FC<Props> = () => {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
    // <List>
    //   {generate(
    //     <ListItem>
    //       <ListItemIcon>
    //         <FolderIcon />
    //       </ListItemIcon>
    //       <ListItemText primary="Single-line item" />
    //     </ListItem>
    //   )}
    // </List>
  );
};
export default SideBar;
