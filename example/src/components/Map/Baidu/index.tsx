import { Box } from '@mui/material';
import React, { useCallback, useEffect } from 'react';

interface Props {}
const Baidu: React.FC<Props> = () => {
  let global = window as any;

  const initialize = useCallback(() => {
    var map = new global.BMapGL.Map('map');
    map.centerAndZoom(new global.BMapGL.Point(121.491, 31.233), 15);
    map.setMapType(global.BMAP_SATELLITE_MAP); // 设置地图类型为普通卫星地图模式

    var marker = new window.BMapGL.Marker(new window.BMapGL.Point(121.491, 31.233));
    map.addOverlay(marker);
  }, [global.BMAP_SATELLITE_MAP, global.BMapGL.Map, global.BMapGL.Point]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <Box id="map" sx={{ width: '100%', height: '100%' }}></Box>;
};
export default Baidu;
