import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home/index'));
const Graph = lazy(() => import('@/pages/Graph/index'));
const Xterm = lazy(() => import('@/pages/XtermShell/index'));
const Blockly = lazy(() => import('@/pages/BlocklyDemo/index'));
const Python = lazy(() => import('@/pages/EditorDemo/index'));
const NotFoundPage = lazy(() => import('@/pages/404/index'));
const BaiduMap = lazy(() => import('@/pages/Map/Openlayers/index'));

export const RouteConfig = [
  {
    name: 'Home',
    path: '/',
    comp: Home
  },
  {
    name: 'graph',
    path: '/graph',
    comp: Graph
  },
  {
    name: 'xterm',
    path: '/xterm',
    comp: Xterm
  },
  {
    name: 'Blockly',
    path: '/blockly',
    comp: Blockly
  },
  {
    name: 'Python',
    path: '/python',
    comp: Python
  },
  {
    name: 'BaiduMap',
    path: '/baiduMap',
    comp: BaiduMap
  },
  {
    name: '404',
    path: '/404',
    comp: NotFoundPage
  }
];
