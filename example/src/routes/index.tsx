import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from '@/pages/404';
import Home from '@/pages/Home';
import Graph from '@/pages/Graph/index';
import DragHtmlDrop from '@/pages/DragHtmlDrop';
import DragJsplumbMenu from '@/pages/Jsplumb/DragMenu/DragJsplumbMenu';
import Xterm from '@/pages/XtermShell/index';
import NativeJsLDemo from '@/pages/NativeJsLDemo';

// import { RouteConfig } from './routes';

const RoutesComp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/xterm" element={<Xterm />} />
        <Route path="/drag-html-drop" element={<DragHtmlDrop />} />
        <Route path="/drag-jsplumb-drop" element={<DragJsplumbMenu />} />
        <Route path="/native-js-demo" element={<NativeJsLDemo />} />
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
