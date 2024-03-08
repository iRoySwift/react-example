import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import Loadable from '@/components/Loadable';
import MainLayout from '@/layout/MainLayout';
import Axios from '@/pages/Axios/Axios';
import NotFoundPage from '@/pages/404';
import { Window } from '@mui/icons-material';

const DashBoard = Loadable(lazy(() => import('@/pages/dashboard')));
const Graph = Loadable(lazy(() => import('@/pages/Graph')));
const Xterm = Loadable(lazy(() => import('@/components/Xterm')));
const DragHtmlDrop = Loadable(lazy(() => import('@/pages/DragHtmlDrop')));
const DragJsplumbMenu = Loadable(lazy(() => import('@/pages/Jsplumb/DragMenu/DragJsplumbMenu')));
const NativeJsLDemo = Loadable(lazy(() => import('@/pages/NativeJsLDemo')));
const EditorDemo = Loadable(lazy(() => import('@/pages/EditorDemo')));
const BlocklyDemo = Loadable(lazy(() => import('@/pages/BlocklyDemo')));
const Openlayers = Loadable(lazy(() => import('@/pages/Map/Openlayers')));
const Baidu = Loadable(lazy(() => import('@/pages/Map/Baidu')));
const Amap = Loadable(lazy(() => import('@/pages/Map/Amap')));
const Video = Loadable(lazy(() => import('@/pages/Video')));
const Store = Loadable(lazy(() => import('@/pages/Store')));

const MainRoute: RouteObject | any = {
  path: '/',
  element: <MainLayout />,
  type: 'group',
  children: [
    {
      path: '/graph',
      element: <Graph />,
      name: 'Graph',
      icon: Window,
      type: 'item',
      breadcrumbs: true
    },
    {
      path: '/xterm',
      element: <Xterm />,
      name: 'Xterm',
      icon: Window,
      type: 'item',
      breadcrumbs: true
    },
    {
      path: '/drag-html-drop',
      element: <DragHtmlDrop />,
      name: 'DragHtmlDrop',
      icon: Window,
      type: 'item',
      breadcrumbs: true
    },
    {
      path: '/drag-jsplumb-drop',
      element: <DragJsplumbMenu />,
      name: 'DragJsplumbMenu',
      icon: Window,
      type: 'item',
      breadcrumbs: true
    },
    {
      path: '/native-js-demo',
      element: <NativeJsLDemo />,
      name: 'NativeJsLDemo',
      icon: Window,
      type: 'item',
      breadcrumbs: true
    },
    {
      path: '/blockly',
      element: <BlocklyDemo />,
      name: 'BlocklyDemo',
      icon: Window,
      type: 'item',
      breadcrumbs: true
    },
    {
      path: '/editor',
      element: <EditorDemo />,
      name: 'EditorDemo',
      icon: Window,
      type: 'item',
      breadcrumbs: true
    },
    {
      path: '/openlayers',
      element: <Openlayers />,
      name: 'Openlayers',
      icon: Window,
      type: 'item',
      breadcrumbs: true
    },
    {
      path: '/baidu',
      element: <Baidu />,
      name: 'Baidu',
      icon: Window,
      type: 'item',
      breadcrumbs: true
    },
    { path: '/amap', element: <Amap />, name: 'Amap', icon: Window, type: 'item', breadcrumbs: true },
    { path: '/video', element: <Video />, name: 'Video', icon: Window, type: 'item', breadcrumbs: true },
    { path: '/axios', element: <Axios />, name: 'Axios', icon: Window, type: 'item', breadcrumbs: true },
    { path: '/store', element: <Store />, name: 'Store', icon: Window, type: 'item', breadcrumbs: true },
    { path: '/404', element: <NotFoundPage />, name: 'NotFoundPage', icon: Window, type: 'item', breadcrumbs: true },
    { path: '*', element: <Navigate to="/404" />, name: 'Navigate', icon: Window, type: 'item', breadcrumbs: true }
  ]
};
export default MainRoute;
