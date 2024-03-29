/*
 * @Author: Roy
 * @Date: 2022-07-20 10:13:54
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-11 18:17:53
 * @Description: 带圆角多线段
 */
import G6 from '@antv/g6';
import { getPathByPoints, getPathWithBorderRadiusByPolyline } from './AStar';
import getNodeStyle from '../configs/nodeStyle';
import Arrow from '../arrow';
const offset = 15;

function afterDraw(
  cfg: { showClose: any; x: any; y: any },
  group: {
    get: (arg0: string) => any[];
    addShape: (
      arg0: string,
      arg1: {
        attrs:
          | {
              x: number;
              y: any;
              fill: string;
              fontSize: number;
              text: string;
              // textBaseline: "middle",
              // textAlign: "center",
              cursor: string;
            }
          | { x: any; y: any; fill: string; r: number }
          | { x: any; y: any; fill: string; text: string; textBaseline: string; textAlign: string; fontSize: number; fontweight: number };
        name?: string;
        draggable?: boolean;
        class?: string;
      }
    ) => void;
  }
) {
  const { showClose, x, y } = cfg;
  const config = getNodeStyle('default');
  // 获取图形组中的第一个图形，在这里就是边的路径图形
  const shape = group.get('children')[0];
  // 获取路径图形的中点坐标
  const midPoint = shape?.getPoint(0.5);
  // 在中点增加一个矩形，注意矩形的原点在其左上角
  // group.addShape("circle", {
  //   attrs: {
  //     // x 和 y 分别减去 width / 2 与 height / 2，使矩形中心在 midPoint 上
  //     x: midPoint.x,
  //     y: midPoint.y - 5,
  //     r: 15,
  //     stroke: config.fontColor,
  //     fill: "#DFEEFF",
  //   },
  // });
  group.addShape('text', {
    attrs: {
      x: midPoint.x - 12,
      y: midPoint.y + 3,
      fill: config.fontColor,
      fontSize: 12,
      text: 'URL',
      // textBaseline: "middle",
      // textAlign: "center",
      cursor: 'pointer'
    },
    name: 'title',
    draggable: true
  });

  if (showClose) {
    let key = group.addShape('circle', {
      class: 'close',
      attrs: {
        x,
        y,
        fill: '#F22635',
        r: 7
      }
    });
    group.addShape('text', {
      class: 'close',
      attrs: {
        x,
        y,
        fill: '#FFFFFF',
        text: '×',
        textBaseline: 'middle',
        textAlign: 'center',
        fontSize: 12,
        fontweight: 40
      }
    });
    return key;
  }
}

function getPathPoint(points: any[], source: { bbox: any }, target: { bbox: any }) {
  let polylinePoints = getPathByPoints(points, source, target, offset);
  return getPathWithBorderRadiusByPolyline(polylinePoints);
  // const startPoint = points[0];
  // const endPoint = [points.length - 1];
  // return [
  //     ["M", startPoint.x, startPoint.y],
  //     ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, startPoint.y],
  //     ["L", endPoint.x / 3 + (2 / 3) * startPoint.x, endPoint.y],
  //     ["L", endPoint.x, endPoint.y]
  // ];
}

function getShapeStyle(cfg: { sourceNode?: any; targetNode?: any; startPoint?: any; endPoint?: any; size?: any; color?: any; endArrow?: any; style?: any; controlPoints?: any }, item: any) {
  const source = { bbox: cfg.sourceNode.getBBox() };
  const target = { bbox: cfg.targetNode.getBBox() };
  const startPoint = cfg.startPoint;
  const endPoint = cfg.endPoint;
  const { controlPoints } = cfg;
  let points = [startPoint]; // the start point
  // the control points
  if (controlPoints) {
    points = points.concat(controlPoints);
  }
  // the end point
  points.push(endPoint);
  const path = getPathPoint(points, source, target);

  // 如果设置了color，则覆盖默认的stroke属性
  const lineWidth = cfg.size || G6.Global.defaultEdge.size;
  const stroke = cfg.color || G6.Global.defaultEdge.color;
  const fill = cfg.color || G6.Global.defaultEdge.color;
  const styles = Object.assign(
    {},
    G6.Global.defaultEdge.style,
    {
      stroke,
      lineWidth,
      path,
      endArrow: cfg.endArrow && {
        path: Arrow.vee(10, -10, -5),
        d: -5,
        fill: '#d3dbe1',
        stroke: '#d3dbe1'
      }
    },
    cfg.style
  );
  return styles;
}

const options = {
  drawShape(cfg: { showClose: any; x: any; y: any }, group: { cfg?: any; addShape: any; get?: (arg0: string) => any[] }) {
    const { item } = group.cfg;
    // @ts-ignore
    const shapeStyle = getShapeStyle(cfg, item);
    if (shapeStyle.radius === 0) delete shapeStyle.radius;
    const keyShape = group.addShape('path', {
      className: 'edge-shape',
      name: 'edge-shape',
      attrs: shapeStyle
    });
    // @ts-ignore
    afterDraw(cfg, group);
    return keyShape;
  },
  update: undefined,

  updateShapeStyle(cfg: { style: any }, item: { getContainer: () => any; getKeyShape: () => any }) {
    const group = item.getContainer();
    const shape = group.find((element: { get: (arg0: string) => string }) => element.get('className') === 'edge-shape') || item.getKeyShape();
    const style = Object.assign({}, shape.attr(), getShapeStyle(cfg, item), cfg.style);
    if (shape) {
      shape.attr(style);
    }
  },

  setState(name: string, value: any, item: { getContainer: () => any }) {
    const group = item.getContainer();
    const shape = group.get('children')[0]; // 顺序根据 draw 时确定
    if (name === 'active') {
      if (value) {
        shape.attr('lineWidth', 3);
      } else {
        shape.attr('lineWidth', 1);
      }
    }
    if (name === 'selected') {
      if (value) {
        shape.attr('lineWidth', 3);
      } else {
        shape.attr('lineWidth', 2);
      }
    }
  }
};

export default {
  type: 'edge',
  name: 'polyline-round',
  options,
  extendShapeType: 'line'
};
