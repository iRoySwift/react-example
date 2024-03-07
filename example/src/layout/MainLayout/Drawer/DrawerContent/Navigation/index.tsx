import React from 'react';
import NavGroup from './NavGroup';
import { Box, Typography } from '@mui/material';
import { routes } from '@/routes';
interface Props {}
const Navigation: React.FC<Props> = () => {
  const navGroups = routes.map((item, i) => {
    switch (item.type) {
      case 'group':
        return (
          <NavGroup
            key={i}
            item={item}
          />
        );
      default:
        return (
          <Typography
            key={i}
            variant="h6"
            color="error"
            align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });
  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};
export default Navigation;
