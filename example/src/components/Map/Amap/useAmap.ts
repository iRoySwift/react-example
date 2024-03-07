import { useCallback, useEffect, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

interface Props {
  container: HTMLDivElement | null;
  theme?: 'normal' | 'dark' | 'light' | 'whitesmoke' | 'fresh' | 'grey' | 'graffiti' | 'macaron' | 'blue' | 'darkblue' | 'wine';
  // sourceUrl: string | undefined;
  // projection: string;
  overlayRef?: HTMLDivElement | undefined;
}
const useAmap = (props: Props) => {
  const { theme } = props;
  const [container, setContainer] = useState<HTMLElement | string | undefined>();
  const [map, setMap] = useState<any>();
  const [amap, setAmap] = useState<any>();

  const initPlugin = useCallback(() => {
    if (!amap || !map) return;
    amap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
      //异步加载插件
      var toolbar = new amap.ToolBar();
      let scale = new amap.Scale();
      map.addControl(toolbar);
      map.addControl(scale);
    });
  }, [amap, map]);

  const initMap = useCallback(() => {
    if (!container) return;
    AMapLoader.load({
      key: 'f3d0bb4019faa4748b17cb3874c8ee05', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: []
    })
      .then((AMap) => {
        let map = new AMap.Map(container, {
          zoom: 11,
          center: [116.397428, 39.90923],
          resizeEnable: true, //是否监控地图容器尺寸变化
          mapStyle: `amap://styles/${theme}`,
          plugin: ['AMap.Scale', 'AMap.ToolBar']
          // AMapUI: {
          //   version: '1.1',
          //   plugins: ['overlay/SimpleInfoWindow'] // 需要加载的 AMapUI ui插件
          // }
        });
        setMap(map);
        setAmap(AMap);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [container, theme]);

  const setCenter = (point) => {
    map?.setCenter(point);
  };

  const setFitView = () => {
    map?.setFitView();
  };

  const addMarker = (point, data, icon) => {
    const marker = new amap.Marker({
      icon,
      position: point,
      anchor: 'bottom-center',
      data
    });
    map.add(marker);
    setFitView();
    return marker;
  };

  /**
   * 删除图层
   * @param layer
   */
  const removeLayer = (layer) => {
    map?.remove(layer);
  };

  useEffect(() => {
    initMap();
    () => {
      setMap(null);
      setAmap(null);
    };
  }, [container, initMap]);

  useEffect(() => {
    initPlugin();
  }, [initPlugin, map]);

  useEffect(() => setContainer(props.container!), [props.container]);
  return { map, amap, addMarker, removeLayer, setCenter };
};

export default useAmap;
