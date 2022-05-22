// @ts-nocheck
/*
 * @Author: moyee
 * @LastEditors: moyee
 * @Description: 拖动 Combo
 */
import { G6Event, IG6GraphEvent, Item, ComboConfig } from '@antv/g6-core/lib/types';
import { each } from '@antv/util/lib';
import { IGroup } from '@antv/g-base/lib/interfaces';
import { Global, ICombo, IGraph, INode } from '@antv/g6';

/**
 * 遍历拖动的 Combo 下的所有 Combo
 * @param data 拖动的 Combo
 * @param fn
 */
const traverseCombo = (data, fn: (param: any) => boolean) => {
  if (fn(data) === false) {
    return;
  }

  if (data) {
    const combos = data.get('combos');
    if (combos.length === 0) {
      return false;
    }
    each(combos, (child) => {
      traverseCombo(child, fn);
    });
  }
};

/**
 * 计算一组 Item 的 BBox
 * @param items 选中的一组Item，可以是 node 或 combo
 */
export const calculationItemsBBox = (items: Item[]) => {
  let minx = Infinity;
  let maxx = -Infinity;
  let miny = Infinity;
  let maxy = -Infinity;

  // 获取已节点的所有最大最小x y值
  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    const bbox = element.getBBox();
    const { minX, minY, maxX, maxY } = bbox;
    if (minX < minx) {
      minx = minX;
    }

    if (minY < miny) {
      miny = minY;
    }

    if (maxX > maxx) {
      maxx = maxX;
    }

    if (maxY > maxy) {
      maxy = maxY;
    }
  }

  const x = Math.floor(minx);
  const y = Math.floor(miny);
  const width = Math.ceil(maxx) - Math.floor(minx);
  const height = Math.ceil(maxy) - Math.floor(miny);

  return {
    x,
    y,
    width,
    height,
    minX: minx,
    minY: miny,
    maxX: maxx,
    maxY: maxy
  };
};

const option = {
  getDefaultCfg() {
    return {
      enableDelegate: false,
      delegateStyle: {},
      // 拖动节点过程中是否只改变 Combo 的大小，而不改变其结构
      onlyChangeComboSize: false,
      // 拖动过程中目标 combo 状态样式
      activeState: '',
      selectedState: 'selected'
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      'combo:dragstart': 'onDragStart',
      'combo:drag': 'onDrag',
      'combo:dragend': 'onDragEnd'
      // "combo:drop": "onDrop",
      // "node:drop": "onNodeDrop",
      // "combo:dragenter": "onDragEnter",
      // "combo:dragleave": "onDragLeave",
    };
  },
  validationCombo(evt: IG6GraphEvent) {
    const { item } = evt;
    if (!item || item.destroyed) {
      return false;
    }

    if (!this.shouldUpdate(this, evt)) {
      return false;
    }

    const { type } = item.getModel();

    if (type !== 'region') {
      return false;
    }
    return true;
  },
  onDragStart(evt: IG6GraphEvent) {
    const graph: IGraph = this.graph;
    const { item } = evt;

    if (!this.validationCombo(evt)) return;
    // this.addBlock(evt);

    this.point = {};
    this.originPoint = {};

    this.origin = {
      x: evt.x,
      y: evt.y
    };
    this.targets = [];

    // // 获取所有选中的 Combo
    // const combos = graph.findAllByState('combo', this.selectedState);

    // const currentCombo = item.get('id');

    // const dragCombos = combos.filter((combo) => {
    //   const comboId = combo.get('id');
    //   return currentCombo === comboId;
    // });

    // if (dragCombos.length === 0) {
    //   this.targets.push(item);
    // } else {
    //   this.targets = combos;
    // }

    // if (this.activeState) {
    //   this.targets.map((combo: ICombo) => {
    //     const model = combo.getModel() as ComboConfig;
    //     if (model.parentId) {
    //       const parentCombo = graph.findById(model.parentId);
    //       if (parentCombo) {
    //         graph.setItemState(parentCombo, this.activeState, true);
    //       }
    //     }
    //   });
    // }

    // this.point = {};
    // this.originPoint = {};

    // this.origin = {
    //   x: evt.x,
    //   y: evt.y,
    // };

    // this.currentItemChildCombos = [];

    // traverseCombo(item, (param) => {
    //   if (param.destroyed) {
    //     return false;
    //   }
    //   const model = param.getModel();
    //   this.currentItemChildCombos.push(model.id);
    //   return true;
    // });
  },
  onDrag(evt: IG6GraphEvent) {
    if (!this.origin) {
      return;
    }
    if (this.enableDelegate) {
      this.updateDelegate(evt);
    }
  },
  onDragEnd(evt: IG6GraphEvent) {
    const item = evt.item;
    const graph: IGraph = this.graph;
    const { id } = item.getModel();
    const combo = graph.findById(id);

    // this.removeBlock(evt);
    this.update(evt);
    // 获取所有选中的 Combo
    const combos = graph.findAllByState('combo', this.selectedState);
    // if (combo.getModel().type == "app") {
    //   graph.emit(
    //     "combo:dragstart",
    //     Object.assign(evt, {
    //       item: combo,
    //     })
    //   );
    // }
  },
  updateDelegate(evt: IG6GraphEvent) {
    const graph: IGraph = this.graph;
    // 当没有 delegate shape 时创建
    if (!this.delegateShape) {
      const delegateGroup: IGroup = graph.get('delegateGroup');

      let bbox = null;
      if (this.targets.length > 1) {
        bbox = calculationItemsBBox(this.targets);
      } else {
        bbox = this.targets[0].getBBox();
      }

      const { x, y, width, height, minX, minY } = bbox;

      this.originPoint = { x, y, width, height, minX, minY };

      const attrs = { ...Global.delegateStyle, ...this.delegateStyle };

      this.delegateShape = delegateGroup.addShape('rect', {
        attrs: {
          width: bbox.width,
          height: bbox.height,
          x: bbox.x,
          y: bbox.y,
          ...attrs
        },
        name: 'combo-delegate-shape'
      });
    } else {
      const clientX = evt.x - this.origin.x + this.originPoint.minX;
      const clientY = evt.y - this.origin.y + this.originPoint.minY;

      this.delegateShape.attr({
        x: clientX,
        y: clientY
      });
    }
  },
  addBlock(evt: IG6GraphEvent) {
    const item = evt.item;
    const { width, height, x, y } = item.getBBox();
    const graph = this.graph;
    const group = graph.getGroup();
    group.addShape('rect', {
      zIndex: 999,
      name: 'block',
      attrs: {
        x,
        y,
        width: width,
        height: height,
        fill: '#6ca0d1',
        opacity: 0.5,
        stroke: '#CED4D9',
        lineWidth: 2,
        radius: 5,
        lineDash: [20, 5]
      }
    });
  },
  updateBlock(evt: IG6GraphEvent) {
    const { x, y } = evt;
    const graph = this.graph;
    const group = graph.getGroup();
    const rect = group.find((element) => element.get('name') === 'block');
    rect.attr({
      x,
      y
    });
  },
  removeBlock(evt: IG6GraphEvent) {
    const graph = this.graph;
    const group = graph.getGroup();
    const rect = group.find((element) => element.get('name') === 'block');
    rect.remove();
  },
  update(evt) {
    const { x, y, item } = evt;
    const graph = this.graph;
    item.update({
      x,
      y
    });
    graph.refresh();
  }
};

export default {
  type: 'dragCombo',
  option
};
