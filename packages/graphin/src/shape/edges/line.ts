import { Point } from '@antv/g-base';
import { mix, each, isArray, isString } from '@antv/util';
import { registerEdge, ShapeStyle, EdgeConfig, ShapeOptions, Item, BaseGlobal as Global } from '@antv/g6-core';
import { IGroup, IShape } from '../../../typings/index';

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
      gridSize: 10, // 指定精度
      simple: true
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
    // const controlPoints = (this as any).getControlPoints(cfg);
    let points = [startPoint]; // 添加起始点
    // 添加控制点
    // if (controlPoints) {
    //   points = points.concat(controlPoints);
    // }
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
    const closeIcon = group.addGroup({ name: 'close-btn', attrs: { opacity: 0, x: midPoint.x, y: midPoint.y } });
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
  // update(cfg: EdgeConfig, item: Item, updateType: UpdateType) {
  //   return cfg;
  // },
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
    // const controlPoints = this.getControlPoints!(cfg); // || cfg.controlPoints;
    let points = [startPoint]; // 添加起始点
    // 添加控制点
    // if (controlPoints) {
    //   points = points.concat(controlPoints);
    // }
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

    // 更新 close
    const midPoint = shape.getPoint(0.5);
    const closeBtn = group.find((e: any) => e.get('name') === 'close-btn');
    const children = closeBtn.get('children');
    children.forEach((item: any) => {
      item.attr({ x: midPoint.x, y: midPoint.y });
    });
    closeBtn.attr({
      x: midPoint.x,
      y: midPoint.y
    });
  },
  getPath(points: Point[]): Array<Array<string | number>> {
    const path: Array<Array<string | number>> = [];
    each(points, (point: Point, index: number) => {
      if (index === 0) {
        path.push(['M', point.x, point.y]);
      } else {
        path.push(['L', point.x, point.y]);
      }
    });
    return path;
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
registerEdge('line', lineArrowOption, 'single-edge');
