import React from 'react';
import { Box, List, ListSubheader } from '@mui/material';
import Item from './Item';
import { allMenuInfo } from '@/components/Topo/model/menu';

interface Props {}
const SideBar: React.FC<Props> = () => {
  return (
    <Box sx={{ border: '1px dashed grey', height: '100vh', overflow: 'auto' }}>
      {allMenuInfo?.map((item) => (
        <List key={item.groupId} component="nav" subheader={<ListSubheader component="div">{item.groupName}</ListSubheader>}>
          {item?.modelResVoList?.map((el) => (
            <Item key={el.modelId} name={el.modelName} data={el} showCopyIcon={false} />
          ))}
        </List>
      ))}
    </Box>
  );
};
export default SideBar;
