import G6, { IShape } from '@antv/g6';
import { deepMix, isArray, each, mix, isBoolean, isPlainObject, clone } from '@antv/util';
import { registerNode, Item, NodeConfig, ShapeStyle, ShapeOptions, BaseGlobal as Global, UpdateType, ModelConfig, IG6GraphEvent } from '@antv/g6-core';
import GGroup from '@antv/g-canvas/lib/group';

interface CustomModelConfig extends ModelConfig {
  model?: any;
}

// 绘制node
const options: any = {
  // 自定义节点时的配置
  options: {
    size: Global.defaultNode.size,
    style: {
      x: 0,
      y: 0,
      stroke: Global.defaultNode.style.stroke,
      fill: Global.defaultNode.style.fill,
      lineWidth: Global.defaultNode.style.lineWidth
    },
    labelCfg: {
      style: {
        fill: Global.nodeLabel.style.fill,
        fontSize: Global.nodeLabel.style.fontSize,
        fontFamily: Global.windowFontFamily
      }
    },
    // 节点上左右上下四个方向上的链接circle配置
    linkPoints: {
      top: false,
      right: false,
      bottom: false,
      left: false,
      // circle的大小
      size: Global.defaultNode.linkPoints.size,
      lineWidth: Global.defaultNode.linkPoints.lineWidth,
      fill: Global.defaultNode.linkPoints.fill,
      stroke: Global.defaultNode.linkPoints.stroke
    },
    // 节点中icon配置
    icon: {
      // 是否显示icon，值为 false 则不渲染icon
      show: false,
      // icon的地址，字符串类型
      // img: 'https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg',
      width: 20,
      height: 20
    },
    stateStyles: {
      ...Global.nodeStateStyles
    }
  },
  shapeType: 'circle',
  // 文本位置
  labelPosition: 'center',
  ShapeOptions: {},
  getEvents() {
    return {
      // 'node:click': 'onClick',
      'node:mouseleave': 'onMouseleave'
      // 'edge:click': 'onEdgeClick'
    };
  },
  drawShape(cfg: NodeConfig, group: GGroup | any): IShape {
    const { icon: defaultIcon = {}, model, size, label } = this.mergeStyle || (this.getOptions(cfg) as NodeConfig);
    const style = this.getShapeStyle!(cfg);
    const icon = deepMix({}, defaultIcon, cfg.icon);
    const name = `${this.type}-keyShape`;
    const keyShape: IShape = group.addShape('circle', {
      attrs: style,
      className: name,
      name,
      draggable: true
    });
    group['shapeMap'][name] = keyShape;
    // label
    if (label) {
      const labelName = `${this.type}-label`;
      const labelWidth = label.length * 10 > 120 ? label.length * 10 : 120;
      group['shapeMap'][labelName] = group.addShape('rect', {
        attrs: {
          x: -labelWidth / 2,
          y: size[0] / 2 + 13,
          width: labelWidth,
          height: 22,
          fontSize: 12,
          fill: '#04102acc',
          // stroke: '#04102acc',
          textBaseline: 'middle',
          textAlign: 'center',
          radius: 4
        },
        className: labelName,
        name: labelName,
        draggable: true
      });
      const textName = `${this.type}-label`;
      group['shapeMap'][textName] = group.addShape('text', {
        attrs: {
          x: 0,
          y: size[0] / 2 + 23,
          fontSize: 12,
          // fill: '#000',
          stroke: '#f2f2f2',
          textBaseline: 'middle',
          textAlign: 'center',
          text: label
        },
        className: textName,
        name: textName,
        draggable: true
      });
    }

    // log icon
    const { log } = model;
    if (log) {
      const monitorName = 'monitorName';
      group['shapeMap'][monitorName] = group.addShape('circle', {
        attrs: {
          ...style,
          fill: '#fff',
          lineWidth: 5,
          r: 15,
          stroke: '#33cc33',
          x: -30,
          y: -30
        },
        className: monitorName,
        name: monitorName,
        draggable: true
      });
      const logName = 'logName';
      group['shapeMap'][logName] = group.addShape('circle', {
        attrs: {
          ...style,
          fill: '#fff',
          lineWidth: 5,
          r: 15,
          stroke: '#33cc33',
          x: 30,
          y: -30
        },
        className: logName,
        name: logName,
        draggable: true
      });
    }

    // imgage
    const { width, height, show, text, path, img } = icon;
    if (show) {
      const iconName = `${this.type}-icon`;
      if (text) {
        group['shapeMap'][iconName] = group.addShape('text', {
          attrs: {
            x: 0,
            y: 0,
            fontSize: 12,
            fill: '#000',
            stroke: '#000',
            textBaseline: 'middle',
            textAlign: 'center',
            ...icon
          },
          className: iconName,
          name: iconName,
          draggable: true
        });
      } else if (path) {
        group['shapeMap'][iconName] = group.addShape('path', {
          attrs: {
            ...icon
          },
          className: iconName,
          name: iconName,
          draggable: true
        });
        group['shapeMap'][iconName].translate(-width / 2, -height / 2);
      } else if (img) {
        group['shapeMap'][iconName] = group.addShape('image', {
          attrs: {
            x: -width / 2,
            y: -height / 2,
            ...icon
          },
          className: iconName,
          name: iconName,
          draggable: true
        });
      }
    }

    (this as any).drawLinkPoints(cfg, group);

    return keyShape;
  },
  /**
   * 绘制节点上的LinkPoints
   * @param {Object} cfg data数据配置项
   * @param {Group} group Group实例
   */
  drawLinkPoints(cfg: NodeConfig, group: GGroup | any) {
    const { linkPoints = {} } = this.getOptions(cfg) as NodeConfig;

    const { top, left, right, bottom, size: markSize = 0, r: markR, ...markStyle } = linkPoints;
    const size = this.getSize!(cfg);
    const r = size[0] / 2;
    if (left) {
      let anchorName = `${this.type}-left-anchor`;
      // left circle
      group['shapeMap'][anchorName] = group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: -r,
          y: 0,
          r: markSize / 2 || markR || 5
        },
        anchorPointIdx: 0,
        className: anchorName,
        name: anchorName,
        isAnchorPoint: true,
        draggable: true
      });
    }

    if (right) {
      let anchorName = `${this.type}-right-anchor`;
      // right circle
      group['shapeMap'][anchorName] = group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: r,
          y: 0,
          r: markSize / 2 || markR || 5
        },
        anchorPointIdx: 1,
        className: anchorName,
        name: anchorName,
        isAnchorPoint: true,
        draggable: true
      });
    }

    if (top) {
      let anchorName = `${this.type}-top-anchor`;
      // top circle
      group['shapeMap'][anchorName] = group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: 0,
          y: -r,
          r: markSize / 2 || markR || 5
        },
        anchorPointIdx: 2,
        className: anchorName,
        name: anchorName,
        isAnchorPoint: true,
        draggable: true
      });
    }

    if (bottom) {
      let anchorName = `${this.type}-bottom-anchor`;
      // bottom circle
      group['shapeMap'][anchorName] = group.addShape('circle', {
        attrs: {
          ...markStyle,
          x: 0,
          y: r,
          r: markSize / 2 || markR || 5
        },
        anchorPointIdx: 3,
        className: anchorName,
        name: anchorName,
        isAnchorPoint: true,
        draggable: true
      });
    }
  },
  /**
   * 获取节点的样式，供基于该节点自定义时使用
   * @param {Object} cfg 节点数据模型
   * @return {Object} 节点的样式
   */
  getShapeStyle(cfg: NodeConfig): ShapeStyle {
    const { style: defaultStyle } = this.mergeStyle || (this.getOptions(cfg) as NodeConfig);
    const strokeStyle = {
      stroke: cfg.color
    };
    // 如果设置了color，则覆盖默认的stroke属性
    const style = deepMix({}, defaultStyle, strokeStyle);
    const size = (this as ShapeOptions).getSize!(cfg);
    const r = size[0] / 2;
    const styles = {
      x: 0,
      y: 0,
      r,
      ...style
    };
    return styles;
  },
  getCustomConfig(cfg: CustomModelConfig): CustomModelConfig {
    return {};
  },
  getOptions(cfg: ModelConfig, updateType?: UpdateType): ModelConfig {
    if (updateType === 'move' || updateType?.includes('bbox')) {
      return {};
    }
    return deepMix({}, this.options, this.getCustomConfig(cfg) || {}, cfg);
  },
  /**
   * 获取节点宽高
   * @internal 返回节点的大小，以 [width, height] 的方式维护
   * @param  {Object} cfg 节点的配置项
   * @return {Array} 宽高
   */
  getSize(cfg: ModelConfig): number[] {
    let size: number | number[] = this.mergeStyle?.size || cfg.size || this.getOptions({})!.size || Global.defaultNode.size; // Global.defaultNode.size; //

    // size 是数组，但长度为1，则补长度为2
    if (isArray(size) && size.length === 1) {
      size = [size[0], size[0]];
    }

    // size 为数字，则转换为数组
    if (!isArray(size)) {
      size = [size, size];
    }
    return size;
  },
  // afterDraw: nodeBasicMethod.afterDraw,
  // setState: nodeBasicMethod.setState,
  /**
   * 获取锚点（相关边的连入点）
   * @param  {Object} cfg 节点的配置项
   * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有控制点
   */
  getAnchorPoints(cfg: any) {
    return [
      [0, 0.5],
      [1, 0.5]
    ];
  }
  // /**
  //  * Handle the callback for node:click
  //  * @override
  //  * @param  {Object} evt The handler
  //  */
  // onClick(evt: IG6GraphEvent) {
  //   const node = evt.item;
  //   const graph = this.graph;
  //   graph.emit(evt);
  //   // TODO
  // },
  /**
   * Handle the callback for mouseleave
   * @override
   * @param  {Object} evt The handler
   */
  // onMouseleave(evt: IG6GraphEvent) {
  //   const node = evt.item;
  //   const graph = this.graph;
  //   graph.emit('node:mouseleave', evt);
  // }
};
export default {
  type: 'node',
  name: 'okdNodeCircle',
  options
  // extendShapeType: 'sigle-node'
};
