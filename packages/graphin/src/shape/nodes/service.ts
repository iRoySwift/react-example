/*
 * @Author: Roy
 * @Date: 2022-07-29 17:53:22
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-11 18:20:28
 * @Description: pcp node
 */
// @ts-nocheck
import G6 from '@antv/g6';
import getNodeStyle from '../configs/nodeStyle';

let graph;
const size = {
  width: 90,
  height: 50,
  imgWidth: 0,
  imgHeight: 0
};

// 绘制node
const options = {
  draw: (cfg, group) => {
    const { showAnchor, showLeftEndPoint, showRightEndPoint, showDocker, img, label } = cfg;
    const config = {
      ...getNodeStyle('default'),
      ...size
    };
    // icon 尺寸
    if (cfg.img) {
      config.imgWidth = config.imgHeight = 40;
      config.height = 90;
    }

    const keyShape = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: config.width,
        height: config.height,
        fill: 'transparent',
        stroke: 'transparent',
        radius: config.radius,
        lineWidth: config.lineWidth,
        cursor: 'pointer'
      },
      name: 'node-shape',
      draggable: true
    });

    group.addShape('rect', {
      attrs: {
        x: config.padding / 2,
        y: config.padding / 2,
        width: config.width - config.padding,
        height: config.height - config.padding,
        fill: config.backgoundColor,
        stroke: config.borderColor,
        radius: config.radius,
        lineWidth: config.lineWidth,
        cursor: 'pointer'
      },
      name: 'node-shape',
      draggable: true
    });

    // 创建文字 图片容器
    if (img) {
      group.addShape('rect', {
        attrs: {
          x: (config.width - config.imgWidth) / 2,
          y: (config.height - config.imgHeight - config.imgHeight / 4) / 2,
          width: config.imgWidth,
          height: config.imgHeight,
          radius: config.radius,
          fill: `l(${Math.PI / 4}) ${config.startPoint}:${config.fillStart} ${config.endPoint}:${config.fillEnd}`,
          cursor: 'pointer'
        },
        draggable: true
      });
      const imgIcon = group.addShape('path', {
        attrs: {
          path: img,
          fill: config.backgoundColor,
          cursor: 'pointer'
        },
        name: 'icon-shape',
        draggable: true
      });
      imgIcon.translate((config.width - config.imgWidth) / 2, (config.height - config.imgHeight - config.imgHeight / 4) / 2);
    }

    // label
    if (label) {
      group.addShape('text', {
        attrs: {
          x: config.width / 2,
          y: (config.height + config.imgHeight + config.imgHeight / 4) / 2,
          fill: config.fontColor,
          fontSize: config.fontSize,
          text: label,
          textBaseline: 'middle',
          textAlign: 'center',
          cursor: 'pointer'
        },
        name: 'label-shape',
        draggable: true
      });
    }

    /* 左边的小圆点 */
    if (showAnchor || showLeftEndPoint) {
      group.addShape('circle', {
        attrs: {
          x: config.padding / 2,
          y: config.height / 2,
          r: 6,
          stroke: config.borderColor,
          fill: '#fff',
          lineWidth: config.lineWidth
        },
        name: 'left-circle-shape',
        isAnchorPoint: true
      });
    }
    if (showAnchor || showRightEndPoint) {
      group.addShape('circle', {
        attrs: {
          x: config.width - config.padding / 2,
          y: config.height / 2,
          r: 6,
          stroke: config.borderColor,
          fill: '#fff',
          lineWidth: config.lineWidth
        },
        name: 'right-circle-shape',
        isAnchorPoint: true
      });
    }
    // // 原点 0 0
    group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        r: 6,
        stroke: 'red',
        fill: '#fff',
        lineWidth: 6,
        zIndex: 999
      },
      draggable: false,
      name: '0-contanier'
    });

    return keyShape;
  },
  // afterDraw: nodeBasicMethod.afterDraw,
  // setState: nodeBasicMethod.setState,
  /**
   * 获取锚点（相关边的连入点）
   * @param  {Object} cfg 节点的配置项
   * @return {Array|null} 锚点（相关边的连入点）的数组,如果为 null，则没有控制点
   */
  getAnchorPoints(cfg) {
    return [
      [0, 0.5],
      [1, 0.5]
    ];
  }
};
export default {
  type: 'node',
  name: 'service',
  options
  // extendShapeType: "single-node",
};
