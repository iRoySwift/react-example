import NotFoundPage from '@/pages/404';
import Home from '@/pages/Home';
import Graph from '@/pages/Graph/index';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { RouteConfig } from './routes';

const RoutesComp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graph" element={<Graph />} />
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
