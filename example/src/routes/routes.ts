import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home/index'));
const Graph = lazy(() => import('@/pages/Graph/index'));
const Xterm = lazy(() => import('@/pages/XtermShell/index'));
const NotFoundPage = lazy(() => import('@/pages/404/index'));

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
    name: '404',
    path: '/404',
    comp: NotFoundPage
  }
];
