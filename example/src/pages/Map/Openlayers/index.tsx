import useOpenlayers from '@/components/Map/Openlayers/useOpenlayers';
import { Button } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
// import Openlayers from '@/components/Map/Openlayers';
import locationIcon from '@/assets/icons/location.png';
import home from '@/assets/icons/home.png';
import NearMeIcon from '@mui/icons-material/NearMe';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import './index.css';

interface Props {}
const OpenlayersPage: React.FC<Props> = () => {
  const openlayersRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement | undefined | any>(null);
  const [layers, setLayers] = useState<any>([]);

  let { map, overlay, translate, setCenter, fromLonLatXY, transformXY, addPoint, removeLayer, zoomIn, zoomOut } = useOpenlayers({
    container: openlayersRef.current,
    projection: 'EPSG:3857',
    sourceUrl: 'http://webst0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=2&scale=1&style=10',
    // sourceUrl: 'https://t0.tianditu.gov.cn/vec_c/wmts?tk=b6356b745c471b0b9237abb0489b0f31',
    overlayRef: overlayRef.current,
    isTranslate: true
  });

  // let centerPoint = transformXY([121.491, 31.233], 'EPSG:4326', 'EPSG:3857');
  let centerPoint = fromLonLatXY([121.491, 31.233], 'EPSG:3857');
  const handleSetCenter = useCallback(() => {
    setCenter(centerPoint);
  }, [centerPoint, setCenter]);

  const handleAddPoint = () => {
    handleClear();
    let layer = addPoint(centerPoint, { id: 1, type: 'center' }, locationIcon);
    setLayers((item) => [...item, layer]);
  };

  const handleAddHomePoint = () => {
    handleClear();
    let homePoint = fromLonLatXY([120.491, 29.233], 'EPSG:3857');
    let layer = addPoint(homePoint, { id: 2, type: 'home' }, home);
    setLayers((item) => [...item, layer]);
  };

  const handleClear = () => {
    layers.forEach((item) => {
      removeLayer(item);
    });
  };

  const handleEvent = useCallback(() => {
    /**
     * Add a click handler to the map to render the popup.
     */
    map?.on('singleclick', function (evt) {
      let feature = map?.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });
      let data = feature?.getProperties();
      console.log('🚀 ~ file: index.tsx:60 ~ data:', data);
      const coordinate = evt.coordinate;
      // https://blog.csdn.net/AdminPwd/article/details/122467800
      // const hdms = toStringHDMS(toLonLat(coordinate));
      // content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
      overlay?.setPosition(coordinate);
    });
    /**
     * Add translate event listen
     */
    translate?.on('translateend', function (evt) {
      let point = transformXY(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log('🚀 ~ file: index.tsx:73 ~ point:', point);
    });
  }, [map, overlay, transformXY, translate]);

  /**
   * Add a click handler to hide the popup.
   * @return {boolean} Don't follow the href.
   */
  const handleClosePopup = () => {
    overlay?.setPosition(undefined);
    // closer.blur();
    return false;
  };

  useEffect(() => {
    handleEvent();
  }, [handleEvent]);

  useEffect(() => {
    handleSetCenter();
  }, [handleSetCenter, map]);

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <div style={{ position: 'absolute', zIndex: 1000 }}>
        <Button onClick={handleAddPoint}>添加点位</Button>
        <Button onClick={handleAddHomePoint}>添加Home点位</Button>
        <Button onClick={handleSetCenter}>中心</Button>
        <Button onClick={handleClear}>清空画布</Button>
      </div>
      <div ref={openlayersRef} style={{ width: '100%', height: '100%' }}></div>
      <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', display: 'flex', flexDirection: 'column', zIndex: 1000 }}>
        <NearMeIcon onClick={handleSetCenter} />
        <AddIcon onClick={zoomOut} />
        <HorizontalRuleIcon onClick={zoomIn} />
      </div>
      {/* <Openlayers ref={openlayersRef}>ss</Openlayers> */}
      <div id="popup" ref={overlayRef} className="ol-popup">
        <a href="#" id="popup-closer" className="ol-popup-closer" onClick={handleClosePopup}></a>
        <div id="popup-content">试试</div>
      </div>
    </div>
  );
};
export default OpenlayersPage;
