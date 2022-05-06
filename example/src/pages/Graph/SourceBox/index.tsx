import React from 'react';
import { Box, List, ListSubheader } from '@mui/material';
import Item from './Item';
import { allMenuInfo } from '@/components/Topo/model/menu';

interface Props {}
const SideBar: React.FC<Props> = () => {
  return (
    <Box sx={{ border: '1px dashed grey', height: '100vh', overflow: 'auto' }}>
      {allMenuInfo?.map((item) => (
        <List key={item.id} component="nav" subheader={<ListSubheader component="div">{item.name}</ListSubheader>}>
          {item?.children?.map((el) => (
            <Item key={el.id} name={el.name} data={el} showCopyIcon={false} />
          ))}
        </List>
      ))}
    </Box>
  );
};
export default SideBar;
