import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from '@/pages/404';
import Home from '@/pages/Home';
import Graph from '@/pages/Graph/index';
import DragHtmlDrop from '@/pages/DragHtmlDrop';
import DragJsplumbMenu from '@/pages/Jsplumb/DragMenu/DragJsplumbMenu';
import Xterm from '@/pages/XtermShell/index';
import NativeJsLDemo from '@/pages/NativeJsLDemo';
import BlocklyDemo from '@/pages/BlocklyDemo/index';
import EditorDemo from '@/pages/EditorDemo/index';
// const Baidu = lazy(() => import('@/pages/Map/Baidu/index'));
import Baidu from '@/pages/Map/Baidu/index';
import Amap from '@/pages/Map/Amap/index';
const Openlayers = lazy(() => import('@/pages/Map/Openlayers/index'));
const Video = lazy(() => import('@/pages/Video/index'));
const Axios = lazy(() => import('@/pages/Axios/Axios'));
// import { RouteConfig } from './routes';

const RoutesComp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graph" element={<Graph />} {...{ title: 'me' }} />
        <Route path="/xterm" element={<Xterm />} />
        <Route path="/drag-html-drop" element={<DragHtmlDrop />} />
        <Route path="/drag-jsplumb-drop" element={<DragJsplumbMenu />} />
        <Route path="/native-js-demo" element={<NativeJsLDemo />} />
        <Route path="/blockly" element={<BlocklyDemo />} />
        <Route path="/editor" element={<EditorDemo />} />
        <Route path="/openlayers" element={<Openlayers />} />
        <Route path="/baidu" element={<Baidu />} />
        <Route path="/amap" element={<Amap />} />
        <Route path="/video" element={<Video />} />
        <Route path="/axios" element={<Axios />} />
        <Route path="/404" element={<NotFoundPage />} />
        {/* {RouteConfig.map((item) => {
          <Route path={item.path} element={<item.comp />}></Route>;
        })} */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComp;
