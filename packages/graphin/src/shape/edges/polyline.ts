/*
 * @Author: Roy
 * @Date: 2022-07-29 17:51:10
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-11 18:17:41
 * @Description: 多线段
 */
import { mix, each, isArray, isString } from '@antv/util';
import { registerEdge, Util, BaseGlobal as Global } from '@antv/g6-core';
import { getPathWithBorderRadiusByPolyline, getPolylinePoints } from '../util/polyline-util';
import { RouterCfg, pathFinder } from '../util/router';
import { EdgeConfig, IGroup, INode, Item, Point, ShapeOptions, ShapeStyle } from '../../../typings/graph';

const lineArrowOption: ShapeOptions = {
  options: {
    color: Global.defaultEdge.color,
    size: Global.defaultEdge.size,
    style: {
      radius: 0,
      offset: 15,
      x: 0,
      y: 0,
      stroke: Global.defaultEdge.style.stroke,
      lineAppendWidth: Global.defaultEdge.style.lineAppendWidth
    },
    // 文本样式配置
    labelCfg: {
      style: {
        fill: Global.edgeLabel.style.fill,
        fontSize: Global.edgeLabel.style.fontSize,
        fontFamily: Global.windowFontFamily
      }
    },
    routeCfg: {
      obstacles: [], // 希望边绕过的障碍节点
      maxAllowedDirectionChange: Math.PI, // 允许的最大转角，弧度制
      maximumLoops: 500,
      gridSize: 10 // 指定精度
    },
    stateStyles: {
      ...Global.edgeStateStyles
    }
  },
  shapeType: 'polyline',
  // 文本位置
  labelPosition: 'center',
  // @ts-ignore
  drawShape(cfg: EdgeConfig, group: IGroup | any): IShape {
    const shapeStyle = (this as any).getShapeStyle(cfg);
    if (shapeStyle.radius === 0) delete shapeStyle.radius;
    const keyShape = group.addShape('path', {
      className: 'edge-shape',
      name: 'edge-shape',
      attrs: shapeStyle
    });
    group['shapeMap']['edge-shape'] = keyShape;

    this.drawClose(cfg, group);
    return keyShape;
  },
  getShapeStyle(cfg: EdgeConfig): ShapeStyle {
    const { style: defaultStyle } = this.options as any;

    const strokeStyle: ShapeStyle = {
      stroke: cfg.color
    };

    const style: ShapeStyle = mix({}, defaultStyle, strokeStyle, cfg.style);
    cfg = (this as any).getPathPoints(cfg);

    this.radius = style.radius;
    this.offset = style.offset;

    const { startPoint, endPoint } = cfg;
    const controlPoints = (this as any).getControlPoints(cfg);
    let points = [startPoint]; // 添加起始点
    // 添加控制点
    if (controlPoints) {
      points = points.concat(controlPoints);
    }
    // 添加结束点
    points.push(endPoint);
    const source = cfg.sourceNode;
    const target = cfg.targetNode;
    const radius = style.radius;
    const { routeCfg: defaultRouteCfg } = this.options as any;
    const routeCfg = mix({}, defaultRouteCfg, cfg.routeCfg);
    routeCfg.offset = style.offset;

    let path = (this as any).getPath(points, source, target, radius, routeCfg);
    if ((isArray(path) && path.length <= 1) || (isString(path) && path.indexOf('L') === -1)) {
      path = 'M0 0, L0 0';
    }
    if (isNaN(startPoint!.x) || isNaN(startPoint!.y) || isNaN(endPoint!.x) || isNaN(endPoint!.y)) {
      path = 'M0 0, L0 0';
    }

    const attrs: ShapeStyle = mix({}, Global.defaultEdge.style as ShapeStyle, style, {
      lineWidth: cfg.size,
      path
    } as ShapeStyle);
    return attrs;
  },
  /**
   * 删除按钮
   * @param cfg
   * @param group
   */
  drawClose(cfg: EdgeConfig, group: IGroup | any) {
    const shape = group.get('children')[0];
    const midPoint = shape.getPoint(0.5);
    // const size = [10];
    // const r = (size![0] || 0) / (2 * Math.sqrt(2));
    const closeIcon = group.addGroup({ name: 'close-btn', attrs: { opacity: 0 } });
    closeIcon.addShape('circle', {
      name: 'close-btn',
      attrs: {
        x: midPoint.x,
        y: midPoint.y,
        fill: '#F22635',
        r: 7,
        cursor: 'pointer'
      },
      isClosePoint: true
    });
    closeIcon.addShape('text', {
      name: 'close-btn',
      attrs: {
        x: midPoint.x,
        y: midPoint.y,
        fill: '#FFFFFF',
        text: '×',
        textBaseline: 'middle',
        textAlign: 'center',
        fontSize: 12,
        fontweight: 40,
        cursor: 'pointer'
      },
      isClosePoint: true
    });
  },
  updateShapeStyle(cfg: EdgeConfig, item: Item) {
    const group = item.getContainer() as any;
    if (!item.isVisible()) return;
    const strokeStyle: ShapeStyle = {
      stroke: cfg.color
    };
    const shape = group['shapeMap']['edge-shape'] || group.find((element: any) => element.get('className') === 'edge-shape') || item.getKeyShape();

    const { size } = cfg;
    cfg = this.getPathPoints!(cfg);

    const { startPoint, endPoint } = cfg;
    const controlPoints = this.getControlPoints!(cfg); // || cfg.controlPoints;
    let points = [startPoint]; // 添加起始点
    // 添加控制点
    if (controlPoints) {
      points = points.concat(controlPoints);
    }
    // 添加结束点
    points.push(endPoint);

    const currentAttr = shape.attr();
    const previousStyle = mix({}, strokeStyle, currentAttr, cfg.style);
    const source = cfg.sourceNode;
    const target = cfg.targetNode;
    const radius = previousStyle.radius;
    const { routeCfg: defaultRouteCfg } = this.options as any;
    const routeCfg = mix({}, defaultRouteCfg, cfg.routeCfg);
    routeCfg.offset = previousStyle.offset;

    let path = (this as any).getPath(points, source, target, radius, routeCfg);
    if ((isArray(path) && path.length <= 1) || (isString(path) && path.indexOf('L') === -1)) {
      path = 'M0 0, L0 0';
    }
    if (isNaN(startPoint!.x) || isNaN(startPoint!.y) || isNaN(endPoint!.x) || isNaN(endPoint!.y)) {
      path = 'M0 0, L0 0';
    }
    if (currentAttr.endArrow && previousStyle.endArrow === false) {
      cfg!.style!.endArrow = {
        path: ''
      };
    }
    if (currentAttr.startArrow && previousStyle.startArrow === false) {
      cfg!.style!.startArrow = {
        path: ''
      };
    }
    const style = mix(
      strokeStyle,
      shape.attr(),
      {
        lineWidth: size,
        path
      },
      cfg.style
    );

    if (shape) {
      shape.attr(style);
    }
  },
  getPath(points: Point[], source: INode, target: INode, radius: number, routeCfg?: RouterCfg): Array<Array<string | number>> | string {
    const { offset, simple } = routeCfg as any;
    // 指定了控制点
    if (!offset || points.length > 2) {
      if (radius) {
        return getPathWithBorderRadiusByPolyline(points, radius);
      }

      const pathArray: Array<Array<string | number>> = [];
      each(points, (point, index) => {
        if (index === 0) {
          pathArray.push(['M', point.x, point.y]);
        } else {
          pathArray.push(['L', point.x, point.y]);
        }
      });
      return pathArray;
    }

    // 未指定控制点
    const polylinePoints = simple ? getPolylinePoints(points[points.length - 1], points[0], target, source, offset) : pathFinder(points[0], points[points.length - 1], source, target, routeCfg);

    if (!polylinePoints || !polylinePoints.length) return 'M0 0, L0 0';

    if (radius) {
      const res = getPathWithBorderRadiusByPolyline(polylinePoints, radius);
      return res;
    }

    const res = Util.pointsToPolygon(polylinePoints);
    return res;
  },
  setState(name, value, item) {
    const group = item?.get('group');
    if (name == 'close-active') {
      const closeBtn = group.find((e: any) => e.get('name') === 'close-btn');
      closeBtn.attr({
        opacity: value ? 1 : 0
      });
    }
  }
};

// 折线
registerEdge('line-arrow', lineArrowOption, 'single-edge');
