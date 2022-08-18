/*
 * @Author: Roy
 * @Date: 2022-07-29 17:52:08
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-17 17:45:31
 * @Description: 直线
 */
import { mix, each, isArray, isString } from '@antv/util';
import { registerEdge, BaseGlobal as Global } from '@antv/g6-core';
import { EdgeConfig, GGroup, IGroup, Item, Point, ShapeOptions, ShapeStyle } from '../../../typings/graph';

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
    const { isEdit } = cfg;
    if (shapeStyle.radius === 0) delete shapeStyle.radius;
    const keyShape = group.addShape('path', {
      className: 'edge-shape',
      name: 'edge-shape',
      attrs: shapeStyle
    });
    group['shapeMap']['edge-shape'] = keyShape;

    this.drawClose(cfg, group);
    isEdit && this.drawEditIcon(cfg, group);
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
   * 编辑按钮
   */
  drawEditIcon(_: EdgeConfig, group: IGroup | any) {
    const shape = group.get('children')[0];
    const midPoint = shape.getPoint(0.4);
    const size = 16;
    const editIcon = group.addGroup({ name: 'edit-btn', isEditPoint: true });
    editIcon.addShape('rect', {
      name: 'edit-btn',
      attrs: {
        cursor: 'pointer',
        x: midPoint.x - size / 2,
        y: midPoint.y - size / 2,
        width: size,
        height: size,
        fill: '#DDDDDD',
        radius: 4
      },
      isEditPoint: true
    });
    editIcon.addShape('image', {
      name: 'edit-btn',
      attrs: {
        cursor: 'pointer',
        x: midPoint.x - size / 2,
        y: midPoint.y - size / 2,
        width: 16,
        height: 16,
        img: '/edit.svg'
      },
      isEditPoint: true
    });
    // editIcon.addShape('dom', {
    //   name: 'edit-btn',
    //   attrs: {
    //     cursor: 'pointer',
    //     x: midPoint.x - size / 2,
    //     y: midPoint.y - size / 2,
    //     width: 16,
    //     height: 16,
    //     html: `
    //       <div style="width: 16px;height: 16px;display: flex;justify-content: center;align-items: center;cursor:pointer;">
    //         <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
    //           <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
    //         </svg>
    //       </div>
    //   `
    //   },
    //   isEditPoint: true
    // });

    editIcon.addShape('rect', {
      name: 'edit-btn',
      attrs: {
        cursor: 'pointer',
        x: midPoint.x - size / 2,
        y: midPoint.y - size / 2,
        width: size,
        height: size,
        fill: '#3F52B4',
        radius: 4,
        opacity: 0
      },
      isEditPoint: true
    });
  },
  /**
   * 更新编辑按钮
   * @param _ cfg
   * @param item Item
   */
  updateEditIcon(_: EdgeConfig, item: Item) {
    const group = item.getContainer() as any;
    const shape = group['shapeMap']['edge-shape'] || group.find((element: any) => element.get('className') === 'edge-shape') || item.getKeyShape();
    const editBtn = group.find((e: any) => e.get('isEditPoint'));
    const midPoint = shape.getPoint(0.4);
    const size = 16;
    if (!editBtn) {
      return;
    }
    console.log(_, '___');

    const children = editBtn.get('children');
    children.forEach((item: any) => {
      item.attr({ x: midPoint.x - size / 2, y: midPoint.y - size / 2 });
    });
    editBtn.attr({
      x: midPoint.x - size / 2,
      y: midPoint.y - size / 2
    });
  },
  /**
   * 删除按钮
   * @param cfg
   * @param group
   */
  drawClose(_: EdgeConfig, group: IGroup | any) {
    const shape = group.get('children')[0];
    const midPoint = shape.getPoint(0.6);
    const closeIcon = group.addGroup({ name: 'close-btn', isClosePoint: true, attrs: { opacity: 0, x: midPoint.x, y: midPoint.y } });
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
  /**
   * 更新close icon
   * @param _
   * @param item
   */
  updateCloseIcon(_: EdgeConfig, item: Item) {
    const group = item.getContainer() as any;
    const shape = group['shapeMap']['edge-shape'] || group.find((element: any) => element.get('className') === 'edge-shape') || item.getKeyShape();
    // 更新 close
    const midPoint = shape.getPoint(0.6);
    const closeBtn = group.find((e: any) => e.get('isClosePoint'));
    const children = closeBtn.get('children');
    children.forEach((item: any) => {
      item.attr({ x: midPoint.x, y: midPoint.y });
    });
    closeBtn.attr({
      x: midPoint.x,
      y: midPoint.y
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

    const { size, isEdit } = cfg;
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

    isEdit && this.updateEditIcon(cfg, item);
    // 更新 close
    this.updateCloseIcon(cfg, item);
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
    if (name == 'hover') {
      const closeBtn = group.find((e: any) => e.get('isClosePoint'));
      closeBtn.attr({
        opacity: value ? 1 : 0
      });
      // const editBtn = group.find((e: any) => e.get('isEditPoint'));
      // editBtn.attr({
      //   opacity: value ? 1 : 0
      // });

      group.find((el: any) => el.get('name') == 'edge-shape').attr({ lineWidth: value ? 3 : 2 });
    }
  }
};

// 折线
registerEdge('line', lineArrowOption, 'single-edge');
