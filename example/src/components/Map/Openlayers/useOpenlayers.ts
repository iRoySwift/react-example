import { useCallback, useEffect, useState } from 'react';
import { Map, View, Feature, Overlay } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { XYZ, Vector as VectorSource } from 'ol/source';
import { Select, Translate } from 'ol/interaction.js';
import { ProjectionLike, fromLonLat, transform, get as getProj } from 'ol/proj';
import { Point } from 'ol/geom';
import { Icon, Style } from 'ol/style';
import { MousePosition } from 'ol/control';
import BaseLayer from 'ol/layer/Base';
import locationIcon from '@/assets/icons/location.png';
import 'ol/ol.css';

interface Props {
  container: HTMLDivElement | null;
  sourceUrl: string | undefined;
  projection: string;
  overlayRef?: HTMLDivElement | undefined;
  isTranslate: boolean;
}
const useOpenlayers = (props: Props) => {
  const { sourceUrl, projection, overlayRef, isTranslate } = props;
  console.log('🚀 ~ file: useOpenLayers.ts:21 ~ useOpenlayers ~ props:', props.container);

  const [container, setContainer] = useState<HTMLElement | string | undefined>();
  const [map, setMap] = useState<Map>();
  const [overlay, setOverlay] = useState<Overlay>();
  const [selected, setSelected] = useState<Select>();
  const [translate, setTranslate] = useState<Translate>();

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
   * 从EPSG:4326 转为其它 格式化坐标
   * @param coordinate Coordinate
   * @param projection ProjectionLike
   * @returns Coordinate
   */
  const fromLonLatXY = (coordinate: Coordinate, projection: ProjectionLike) => {
    return fromLonLat(coordinate, projection);
  };

  /**
   * 设置中心点
   * @param centerPoint
   */
  const setCenter = (centerPoint: Coordinate) => {
    map?.getView().setCenter(centerPoint);
  };

  /**
   * 缩小
   */
  const zoomIn = () => {
    let zoom = map?.getView().getZoom() || 0;
    map?.getView().setZoom(zoom - 1);
  };

  /**
   * 放大
   */
  const zoomOut = () => {
    let zoom = map?.getView().getZoom() || 0;
    map?.getView().setZoom(zoom + 1);
  };

  // TODO: clear
  const clearAll = () => {
    // view?.getAllLayers()
    // vectorLayer?.getSource()?.clear();
  };

  /**
   * 删除图层
   * @param layer
   */
  const removeLayer = (layer: BaseLayer) => {
    // view?.
    map?.removeLayer(layer);
  };

  /**
   * 添加点
   * @param point Coordinate
   * @param data 自定义数据
   * @param iconSrc Icon
   * @returns VectorLayer
   */
  const addPoint = (point: Coordinate, data: any, iconSrc: string) => {
    // 新建图层，用于标志中心点
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer();
    vectorLayer.setSource(vectorSource);

    // 创建点
    const locationPoint = new Point(point);
    const locationFeature = new Feature();
    locationFeature.setProperties(data);
    // 设置几何图形
    locationFeature.setGeometry(locationPoint);
    // 设置图层属性
    vectorSource.addFeature(locationFeature);

    // 点的样式
    const iconStyle = new Style({
      image: new Icon({
        // color: 'red',
        crossOrigin: 'anonymous',
        src: iconSrc
      })
    });
    vectorLayer.setStyle(iconStyle);
    map?.addLayer(vectorLayer);
    return vectorLayer;
  };

  /**
   * Create an overlay to anchor the popup to the map.
   */
  const initOverlay = useCallback(() => {
    const overlay = new Overlay({
      element: overlayRef,
      autoPan: {
        animation: {
          duration: 250
        }
      }
    });
    setOverlay(overlay);
    return overlay;
  }, [overlayRef]);

  /** init select features and translate x y */
  const initSelect = useCallback(() => {
    const select = new Select({
      style: new Style({
        image: new Icon({
          color: 'blue',
          crossOrigin: 'anonymous',
          src: locationIcon
        })
      })
    });
    setSelected(select);
    return select;
  }, []);

  /** init select features and translate x y */
  const initTranslate = useCallback(() => {
    const translate = new Translate({
      features: selected?.getFeatures()
    });
    setTranslate(translate);
    return translate;
  }, [selected]);

  useEffect(() => {
    if (container) {
      let map = new Map({
        target: container,
        layers: [
          new TileLayer({
            // 高德
            source: new XYZ({
              projection: getProj(projection) || '',
              url: sourceUrl
            })
          })
        ],
        // overlays: [initOverlay()],
        view: new View({
          zoom: 12
          // minZoom: 9,
          // maxZoom: 13
        }),
        controls: [
          // new ZoomSlider(),
          // new Zoom(),
          new MousePosition({
            projection: getProj(projection) || ''
          })
        ]
      });
      if (overlayRef) {
        map.addOverlay(initOverlay());
      }
      if (isTranslate) {
        map.addInteraction(initTranslate());
      }
      setMap(map);
    }
  }, [container, initOverlay, initSelect, initTranslate, isTranslate, overlayRef, projection, sourceUrl]);

  useEffect(() => setContainer(props.container!), [props.container]);

  return { container, map, overlay, translate, transformXY, fromLonLatXY, setCenter, addPoint, clearAll, removeLayer, zoomIn, zoomOut };
};

export default useOpenlayers;
