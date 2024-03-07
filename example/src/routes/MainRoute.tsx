import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Loadable from '@/components/Loadable';
import MainLayout from '@/layout/MainLayout';
import { Window } from '@mui/icons-material';

const DashBoard = Loadable(lazy(() => import('@/pages/dashboard')));
const Colors = Loadable(lazy(() => import('@/pages/OverviewComponents/Colors')));
const Typography = Loadable(lazy(() => import('@/pages/OverviewComponents/Typography')));
const MuiIcon = Loadable(lazy(() => import('@/pages/OverviewComponents/MuiIcon')));

const MainRoute: RouteObject | any = {
  path: '/',
  element: <MainLayout />,
  name: 'Navigation',
  type: 'group',
  children: [
    {
      path: '/',
      element: <DashBoard />,
      name: 'DashBoard',
      icon: Window,
      type: 'item',
      breadcrumbs: false
    },
    {
      path: 'typography',
      element: <Typography />,
      name: 'Typography',
      icon: Window,
      type: 'item',
      breadcrumbs: true
    },
    {
      path: 'colors',
      element: <Colors />,
      name: 'Colors',
      icon: Window,
      type: 'item',
      breadcrumbs: true
    },
    {
      path: 'MuiIcon',
      element: <MuiIcon />,
      name: 'MuiIcon',
      icon: Window,
      type: 'item'
    }
  ]
};
export default MainRoute;
