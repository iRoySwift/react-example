import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import Amap from '@/components/Map/Amap';
import { Box, Button } from '@mui/material';
import useAmap from '@/components/Map/Amap/useAmap';
import locationIcon from '@/assets/icons/location.png';
import './../Openlayers/index.css';
import Test from './Test';

interface Props {}
const AmapPage: React.FC<Props> = () => {
  const amapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement | undefined | any>(null);
  const [layers, setLayers] = useState<any>([]);

  let { map, amap, setCenter, addMarker, removeLayer } = useAmap({
    container: amapRef.current,
    theme: 'light',
    overlayRef: overlayRef.current
  });
  let centerPoint = useMemo(() => [121.491, 31.233], []);
  const handleSetCenter = useCallback(() => {
    setCenter(centerPoint);
  }, [centerPoint, setCenter]);

  const handleAddPoint = () => {
    handleClear();
    let layer = addMarker(centerPoint, { id: 1, type: 'center' }, locationIcon);
    setLayers((item) => [...item, layer]);
  };

  const handleClear = () => {
    layers.forEach((item) => {
      removeLayer(item);
    });
  };

  const handleAddHomePoint = () => {
    handleClear();
    let layer = addMarker([120.491, 29.233], { id: 1, type: 'home' }, locationIcon);
    setLayers((item) => [...item, layer]);
  };

  //在指定位置打开信息窗体
  const openInfo = useCallback(
    (val) => {
      if (!amap) return;
      console.log('🚀 ~ file: index.tsx:46 ~ val:', val);
      // 获取当前城市标记点坐标
      console.log('🚀 ~ file: index.tsx:49 ~ amap:', amap);
      const lnglat = new amap.LngLat(val.lng, val.lat);
      console.log('🚀 ~ file: index.tsx:48 ~ lnglat:', lnglat);
      // // 创建窗口div
      // const element = document.createElement('div');

      // 构建信息窗体中显示的内容;
      // var info: any = [];
      // info.push(
      //   '<div class=\'input-card content-window-card\'><div><img style="float:left;width:67px;height:16px;" src=" https://webapi.amap.com/images/autonavi.png "/></div> '
      // );
      // info.push('<div style="padding:7px 0px 0px 0px;"><h4>高德软件</h4>');
      // info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>");
      // info.push("<p class='input-item'>地址 :北京市朝阳区望京阜荣街10号首开广场4层</p></div></div>");
      let infoWindow = new amap.InfoWindow({
        isCustome: true,
        autoMove: true,
        position: lnglat,
        content: overlayRef.current //使用默认信息窗体框样式，显示信息内容
      });
      infoWindow.open(map, map.getCenter());
    },
    [amap, map]
  );

  const handleEvent = useCallback(() => {
    map?.on('click', function (ev) {
      // 触发事件的对象
      var target = ev.target;
      // 触发事件的地理坐标，AMap.LngLat 类型
      var lnglat = ev.lnglat;
      // 触发事件的像素坐标，AMap.Pixel 类型
      var pixel = ev.pixel;
      // 触发事件类型
      var type = ev.type;
      overlayRef.current.style.background = 'red';
      overlayRef.current.style.top = pixel.y;
      overlayRef.current.style.left = pixel.x;
      overlayRef.current.style.bottom = null;
      overlayRef.current.style.right = null;
      console.log('🚀 ~ file: index.tsx:49 ~ pixel:', target, lnglat, pixel, type, overlayRef.current.style);
      openInfo(lnglat);
    });
  }, [map, openInfo]);

  const handleClosePopup = () => {};

  useEffect(() => {
    handleEvent();
  }, [handleEvent]);

  useEffect(() => {
    handleSetCenter();
  }, [handleSetCenter, map]);
  return (
    <Box style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div style={{ position: 'absolute', zIndex: 1000 }}>
        <Button onClick={handleAddPoint}>添加点位</Button>
        <Button onClick={handleAddHomePoint}>添加Home点位</Button>
        <Button onClick={handleSetCenter}>中心</Button>
        <Button onClick={handleClear}>清空画布</Button>
      </div>
      <Box ref={amapRef} style={{ width: '100%', height: '100%' }}></Box>
      <div id="popup" ref={overlayRef} className="ol-popup" style={{ width: 200, height: 200 }}>
        <a href="#" id="popup-closer" className="ol-popup-closer" onClick={handleClosePopup}></a>
        <div id="popup-content">
          <Test />
        </div>
      </div>
    </Box>
  );
};
export default AmapPage;
