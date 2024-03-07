import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Map, View, Feature, Overlay } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
// import OSM from 'ol/source/OSM.js';
import { XYZ, Vector as VectorSource } from 'ol/source';
import { ProjectionLike, fromLonLat, transform } from 'ol/proj';
import { Point, Geometry } from 'ol/geom';
import { Icon, Style } from 'ol/style';
// import topArray from '@/assets/white_dropdown.png';
import { Box } from '@mui/material';
import locationIcon from '@/assets/icons/location.png';
import { Coordinate } from 'ol/coordinate';

interface Props {
  ref: any;
  children: any;
}
const Openlayers: React.FC<Props> = forwardRef<any, Props>(({ children }, ref) => {
  let mapRef = useRef<HTMLDivElement>(null);
  let popupRef = useRef<any>();
  let map = useRef<Map>();

  const [mapPointList, setMapPointList] = useState([]);
  const [pointLayerSource, setPointLayerSource] = useState<VectorSource<Geometry> | null>();
  const [pointLayer, setPointLayer] = useState<VectorLayer<VectorSource<Geometry>> | null>();

  // 地理点位删除
  let delPointAll = () => {
    // 判断 删除的数据源是否存在
    if (pointLayerSource && mapPointList && pointLayer) {
      // 遍历删除
      mapPointList.map((item) => {
        pointLayerSource.removeFeature(item);
      });

      // 删除图层 重置数据
      map.current?.removeLayer(pointLayer);
      setPointLayerSource(null);
      setPointLayer(null);
      setMapPointList([]);
    }
  };
  console.log('🚀 ~ file: index.tsx:77 ~ delPointAll ~ delPointAll:', delPointAll);

  // 地图点击事件
  const mapOnClick = () => {
    // 创建 popup
    const overlay = new Overlay({
      element: popupRef.current,
      positioning: 'bottom-center',
      stopEvent: false
    });

    // 加载到地图
    map.current?.addOverlay(overlay);
    // 地图点击事件
    map.current?.on('click', (evt) => {
      const position = evt.pixel;
      overlay.setPosition(fromLonLat(position));
      // 获取点击位置的数据
      console.log('🚀 ~ file: index.tsx:92 ~ feature ~ evt.pixel:', fromLonLat(position));
      // const feature = map.current?.forEachFeatureAtPixel(evt.pixel, function (feature) {
      //   console.log(feature, '--0');
      //   return feature;
      // });
      // 根据 点击元素 className 判断是否点击在自定义popup上
      // const isClickPopUp = evt.originalEvent.path.map((item) => item.className).includes('el-card__body');
      // if (!isClickPopUp) {
      //   popupRef.current.style.display = 'none';
      // }
    });
  };
  console.log('🚀 ~ file: index.tsx:105 ~ _mapOnClick:', mapOnClick);

  // add Point
  const addPoint = (point) => {
    // 新建图层，用于标志中心点
    const vectorLayer = new VectorLayer();
    const vectorSource = new VectorSource();
    vectorLayer.setSource(vectorSource);

    // 创建点
    const locationPoint = new Point(point);
    const locationFeature = new Feature();
    // 设置几何图形
    locationFeature.setGeometry(locationPoint);
    // 设置图层属性
    vectorSource.addFeature(locationFeature);

    // 点的样式
    const iconStyle = new Style({
      image: new Icon({
        color: 'red',
        crossOrigin: 'anonymous',
        src: locationIcon
      })
    });
    vectorLayer.setStyle(iconStyle);
    map.current?.addLayer(vectorLayer);
  };
  /**
   * 坐标系转换
   * @param coordinate eg:[121.491, 31.233]
   * @param source eg:EPSG:4326
   * @param destination eg:EPSG:3857
   * @returns Coordinate
   */
  const transformXY = (coordinate: Coordinate, source: ProjectionLike, destination: ProjectionLike): Coordinate => {
    return transform(coordinate, source, destination);
  };
  /**
   * 设置中心点
   * @param centerPoint
   */
  const setCenter = (centerPoint: Coordinate) => {
    map.current?.getView().setCenter(centerPoint);
  };

  /**
   * resize modal 不展示可以使用
   */
  const resize = () => {
    map.current?.updateSize();
  };

  // init
  useEffect(() => {
    if (map.current || !mapRef.current) {
      return;
    }
    let centerPoint = transformXY([121.491, 31.233], 'EPSG:4326', 'EPSG:3857');
    map.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          // 高德
          source: new XYZ({
            url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=2&scl=2&scale=1&style=7'
          })
          // source: new XYZ({
          //   url: 'http://webrd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=2&scale=1&style=8'
          // })
          // source: new OSM()
        })
      ],
      view: new View({
        center: centerPoint,
        zoom: 12
      })
    });
    setCenter(centerPoint);
  }, []);

  useImperativeHandle(ref, () => ({
    map: map.current,
    setCenter,
    addPoint,
    transformXY,
    resize
  }));
  return (
    <Box style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
      {children}
    </Box>
  );
});
export default Openlayers;
