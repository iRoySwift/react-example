/*
 * @Author: Roy
 * @Date: 2022-08-10 17:41:08
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-16 16:43:06
 * @Description: 拖动节点的Behavior
 */
import { Global } from '@antv/g6';
import { deepMix, clone, debounce } from '@antv/util';
import { G6Event, ICombo, IG6GraphEvent, INode, Item, NodeConfig, Point } from '../../typings/graph';
import { IGraph } from '../interface/graph';

export default {
  getDefaultCfg(): object {
    return {
      updateEdge: true,
      delegateStyle: {},
      // 是否开启delegate
      enableDelegate: false,
      // 拖动节点过程中是否只改变 Combo 的大小，而不改变其结构
      onlyChangeComboSize: false,
      // 拖动过程中目标 combo 状态样式
      comboActiveState: '',
      selectedState: 'selected',
      enableOptimize: false,
      enableDebounce: false,
      enableStack: true
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      'node:dragstart': 'onDragStart',
      'node:drag': 'onDrag',
      'node:dragend': 'onDragEnd',
      'combo:dragenter': 'onDragEnter',
      'combo:dragleave': 'onDragLeave',
      'combo:drop': 'onDropCombo',
      'node:drop': 'onDropNode',
      'canvas:drop': 'onDropCanvas',
      touchstart: 'onTouchStart',
      touchmove: 'onTouchMove',
      touchend: 'onDragEnd'
    };
  },
  validationCombo(item: ICombo) {
    if (!(this as any).origin || !item || item.destroyed) {
      return false;
    }

    const type = item.getType();
    if (type !== 'combo') {
      return false;
    }
    return true;
  },
  onTouchStart(e: IG6GraphEvent) {
    if (!e.item) return;
    const self = this;
    try {
      const touches = (e.originalEvent as TouchEvent).touches;
      const event1 = touches[0];
      const event2 = touches[1];

      if (event1 && event2) {
        return;
      }

      e.preventDefault();
    } catch (e) {
      console.warn('Touch original event not exist!');
    }
    self.onDragStart(e);
  },
  onTouchMove(e: IG6GraphEvent) {
    const self = this;
    try {
      const touches = (e.originalEvent as TouchEvent).touches;
      const event1 = touches[0];
      const event2 = touches[1];

      if (event1 && event2) {
        self.onDragEnd(e);
        return;
      }

      e.preventDefault();
    } catch (e) {
      console.warn('Touch original event not exist!');
    }
    self.onDrag(e);
  },
  /**
   * 开始拖动节点
   * @param evt
   */
  onDragStart(evt: IG6GraphEvent) {
    const self = this as any;
    self.currentShouldEnd = true;
    if (!self.shouldBegin.call(this, evt)) {
      return;
    }

    const item: INode = evt.item as INode;
    if (!item || item.destroyed || item.hasLocked()) {
      return;
    }

    // 拖动时，设置拖动元素的 capture 为false，则不拾取拖动的元素
    const group = item.getContainer();
    group.set('capture', false);
    if (!self.cachedCaptureItems) self.cachedCaptureItems = [];
    self.cachedCaptureItems.push(item);

    // 如果拖动的target 是linkPoints / anchorPoints 则不允许拖动
    const { target } = evt;
    if (target) {
      const isAnchorPoint = target.get('isAnchorPoint');
      if (isAnchorPoint) {
        return;
      }
    }

    const { graph } = self;

    self.targets = [];
    // 将节点拖入到指定的 Combo
    self.targetCombo = null;

    // 获取所有选中的元素
    const nodes = graph.findAllByState('node', self.selectedState);
    const currentNodeId = item.get('id');

    // 当前拖动的节点是否是选中的节点
    const dragNodes = nodes.filter((node: any) => {
      const nodeId = node.get('id');
      return currentNodeId === nodeId;
    });

    // 只拖动当前节点
    if (dragNodes.length === 0) {
      self.targets.push(item);
    } else if (nodes.length > 1) {
      // 拖动多个节点
      nodes.forEach((node: any) => {
        const locked = node.hasLocked();
        if (!locked) {
          self.targets.push(node);
        }
      });
    } else {
      self.targets.push(item);
    }
    const beforeDragNodes: any[] = [];
    self.targets.forEach((t: any) => {
      beforeDragNodes.push(clone(t.getModel()));
    });
    self.set('beforeDragNodes', beforeDragNodes);

    self.hidenEdge = {};
    if (self.get('updateEdge') && self.enableOptimize && !self.enableDelegate) {
      self.targets.forEach((node: any) => {
        const edges = node.getEdges();
        edges.forEach((edge: any) => {
          if (!edge.isVisible()) return;
          self.hidenEdge[edge.getID()] = true;
          edge.hide();
        });
      });
    }

    self.origin = {
      x: evt.x,
      y: evt.y
    };

    self.point = {};
    self.originPoint = {};
  },

  /**
   * 持续拖动节点
   * @param evt
   */
  onDrag(evt: IG6GraphEvent) {
    const self = this as any;
    if (!self.origin) {
      return;
    }

    if (!self.shouldUpdate.call(this, evt)) {
      return;
    }

    if (self.get('enableDelegate')) {
      this.updateDelegate(evt);
    } else {
      if (self.enableDebounce)
        // @ts-ignore
        this.debounceUpdate({
          targets: self.targets,
          graph: self.graph,
          point: self.point,
          origin: self.origin,
          evt,
          updateEdge: self.get('updateEdge')
        });
      else
        self.targets.map((target: INode) => {
          self.update(target, evt);
        });
    }
  },
  /**
   * 拖动结束，设置拖动元素capture为true，更新元素位置，如果是拖动涉及到 combo，则更新 combo 结构
   * @param evt
   */
  onDragEnd(evt: IG6GraphEvent) {
    console.log(evt);

    const self = this as any;
    if (!self.origin) {
      return;
    }

    // 拖动结束后，设置拖动元素 group 的 capture 为 true，允许拾取拖动元素
    self.cachedCaptureItems?.forEach((item: any) => {
      const group = item.getContainer();
      group.set('capture', true);
    });
    self.cachedCaptureItems = [];

    if (self.delegateRect) {
      self.delegateRect.remove();
      self.delegateRect = null;
    }

    if (self.get('updateEdge') && self.enableOptimize && !self.enableDelegate) {
      self.targets.forEach((node: INode) => {
        const edges = node.getEdges();
        edges.forEach((edge) => {
          if (self.hidenEdge[edge.getID()]) edge.show();
          edge.refresh();
        });
      });
    }
    self.hidenEdge = {};

    const graph: IGraph = self.graph;

    // 拖动结束后，入栈
    if (graph.get('enabledStack') && self.enableStack) {
      const stackData = {
        before: { nodes: [], edges: [], combos: [] },
        after: { nodes: [], edges: [], combos: [] }
      };

      self.get('beforeDragNodes').forEach((model: any) => {
        // @ts-ignore
        stackData.before.nodes.push({
          id: model.id,
          x: model.x,
          y: model.y
        } as any);
      });

      self.targets.forEach((target: any) => {
        const targetModel = target.getModel();
        stackData.after.nodes.push({
          id: targetModel.id,
          x: targetModel.x,
          y: targetModel.y
        } as never);
      });
      graph.pushStack('update', clone(stackData));
    }

    // 拖动结束后emit事件，将当前操作的节点抛出去，目标节点为null
    graph.emit('dragnodeend', {
      items: self.targets,
      targetItem: null
    });

    self.point = {};
    self.origin = null;
    self.originPoint = {};
    self.targets.length = 0;
    self.targetCombo = null;
  },
  /**
   * 拖动过程中将节点放置到 combo 上
   * @param evt
   */
  onDropCombo(evt: IG6GraphEvent) {
    const self = this as any;
    const item = evt.item as ICombo;
    self.currentShouldEnd = self.shouldEnd.call(this, evt, item);
    // 若不允许结束，则将节点位置设置回初识位置。后面的逻辑仍需要执行
    this.updatePositions(evt, !self.currentShouldEnd);
    if (!self.currentShouldEnd || !this.validationCombo(item)) return;
    const graph: IGraph = self.graph;

    if (self.comboActiveState) {
      graph.setItemState(item, self.comboActiveState, false);
    }

    self.targetCombo = item;

    // 拖动结束后是动态改变 Combo 大小还是将节点从 Combo 中删除
    if (self.onlyChangeComboSize) {
      // 拖动节点结束后，动态改变 Combo 的大小
      graph.updateCombos();
    } else {
      const targetComboModel = item.getModel();
      self.targets.map((node: INode) => {
        const nodeModel = node.getModel();
        if (nodeModel.comboId !== targetComboModel.id) {
          graph.updateComboTree(node, targetComboModel.id);
        }
      });
      graph.updateCombo(item as ICombo);
    }

    // 将节点拖动到 combo 上面，emit事件抛出当前操作的节点及目标 combo
    graph.emit('dragnodeend', {
      items: self.targets,
      targetItem: self.targetCombo
    });
  },
  onDropCanvas(evt: IG6GraphEvent) {
    const self = this as any;
    const graph: IGraph = self.graph;
    self.currentShouldEnd = self.shouldEnd.call(this, evt, undefined);
    // 若不允许结束，则将节点位置设置回初识位置。后面的逻辑仍需要执行
    this.updatePositions(evt, !self.currentShouldEnd);
    if (!self.targets || self.targets.length === 0 || !self.currentShouldEnd) return;
    if (self.onlyChangeComboSize) {
      // 拖动节点结束后，动态改变 Combo 的大小
      graph.updateCombos();
    } else {
      self.targets.map((node: INode) => {
        // 拖动的节点有 comboId，即是从其他 combo 中拖出时才处理
        const model = node.getModel();
        if (model.comboId) {
          graph.updateComboTree(node);
        }
      });
    }
  },

  /**
   * 拖动放置到某个 combo 中的子 node 上
   * @param evt
   */
  onDropNode(evt: IG6GraphEvent) {
    const self = this as any;
    if (!self.targets || self.targets.length === 0) return;
    const item = evt.item as INode;
    const graph: IGraph = self.graph;

    const comboId = item.getModel().comboId as string;

    const newParentCombo = comboId ? graph.findById(comboId) : undefined;
    self.currentShouldEnd = self.shouldEnd.call(this, evt, newParentCombo);
    // 若不允许结束，则将节点位置设置回初识位置。后面的逻辑仍需要执行
    this.updatePositions(evt, !self.currentShouldEnd);
    if (!self.currentShouldEnd) return;

    if (self.onlyChangeComboSize) {
      graph.updateCombos();
    } else if (comboId) {
      const combo = graph.findById(comboId);
      if (self.comboActiveState) {
        graph.setItemState(combo, self.comboActiveState, false);
      }
      self.targets.map((node: INode) => {
        const nodeModel = node.getModel();
        if (comboId !== nodeModel.comboId) {
          graph.updateComboTree(node, comboId);
        }
      });
      graph.updateCombo(combo as ICombo);
    } else {
      self.targets.map((node: INode) => {
        const model = node.getModel();
        if (model.comboId) {
          graph.updateComboTree(node);
        }
      });
    }

    // 将节点拖动到另外个节点上面，emit 事件抛出当前操作的节点及目标节点
    graph.emit('dragnodeend', {
      items: self.targets,
      targetItem: item
    });
  },
  /**
   * 将节点拖入到 Combo 中
   * @param evt
   */
  onDragEnter(evt: IG6GraphEvent) {
    const self = this as any;
    const item = evt.item as ICombo;
    if (!this.validationCombo(item)) return;

    const graph: IGraph = self.graph;
    if (self.comboActiveState) {
      graph.setItemState(item, self.comboActiveState, true);
    }
  },
  /**
   * 将节点从 Combo 中拖出
   * @param evt
   */
  onDragLeave(evt: IG6GraphEvent) {
    const self = this as any;
    const item = evt.item as ICombo;
    if (!this.validationCombo(item)) return;

    const graph: IGraph = self.graph;
    if (self.comboActiveState) {
      graph.setItemState(item, self.comboActiveState, false);
    }
  },

  updatePositions(evt: IG6GraphEvent, restore: boolean) {
    const self = this as any;
    if (!self.targets || self.targets.length === 0) return;
    // 当开启 delegate 时，拖动结束后需要更新所有已选中节点的位置
    if (self.get('enableDelegate')) {
      if (self.enableDebounce)
        //  @ts-ignore
        this.debounceUpdate({
          targets: self.targets,
          graph: self.graph,
          point: self.point,
          origin: self.origin,
          evt,
          updateEdge: self.get('updateEdge'),
          updateFunc: this.update
        });
      else if (!restore) self.targets.map((node: any) => self.update(node, evt));
    } else self.targets.map((node: any) => this.update(node, evt, restore));
  },
  /**
   * 更新节点
   * @param item 拖动的节点实例
   * @param evt  被悬浮的节点事件
   */
  update(item: Item, evt: IG6GraphEvent, restore: boolean) {
    const self = this as any;
    const graph: IGraph = self.graph;
    const { origin } = self;
    const model: NodeConfig = item.get('model');
    const nodeId: string = item.get('id');
    if (!self.point[nodeId]) {
      self.point[nodeId] = {
        x: model.x || 0,
        y: model.y || 0
      };
    }

    let x: number = evt.x - origin.x + self.point[nodeId].x;
    let y: number = evt.y - origin.y + self.point[nodeId].y;

    if (restore) {
      x += origin.x - evt.x;
      y += origin.y - evt.y;
    }

    const pos: Point = { x, y };

    if (self.get('updateEdge')) {
      graph.cmd.executeCommand('dragItem', {
        itemType: 'node',
        item,
        evt
      });
      // graph.updateItem(item, pos, false);
    } else {
      item.updatePosition(pos);
    }
  },

  /**
   * 限流更新节点
   * @param item 拖动的节点实例
   * @param evt
   */
  debounceUpdate: debounce(
    (event: any) => {
      const { targets, graph, point, origin, evt, updateEdge, updateFunc } = event;
      targets.map((item: any) => {
        const model: NodeConfig = item.get('model');
        const nodeId: string = item.get('id');
        if (!point[nodeId]) {
          point[nodeId] = {
            x: model.x || 0,
            y: model.y || 0
          };
        }

        const x: number = evt.x - origin.x + point[nodeId].x;
        const y: number = evt.y - origin.y + point[nodeId].y;

        const pos: Point = { x, y };

        if (updateEdge) {
          graph.updateItem(item, pos, false);
        } else {
          item.updatePosition(pos);
        }
      });
    },
    50,
    true
  ),

  /**
   * 更新拖动元素时的delegate
   * @param {Event} e 事件句柄
   * @param {number} x 拖动单个元素时候的x坐标
   * @param {number} y 拖动单个元素时候的y坐标
   */
  updateDelegate(e: any) {
    const { graph } = this as any;
    const self = this as any;
    if (!self.delegateRect) {
      // 拖动多个
      const parent = graph.get('group');
      const attrs = deepMix({}, Global.delegateStyle, self.delegateStyle);

      const { x: cx, y: cy, width, height, minX, minY } = this.calculationGroupPosition(e);
      self.originPoint = { x: cx, y: cy, width, height, minX, minY };
      // model上的x, y是相对于图形中心的，delegateShape是g实例，x,y是绝对坐标
      self.delegateRect = parent.addShape('rect', {
        attrs: {
          width,
          height,
          x: cx,
          y: cy,
          ...attrs
        },
        name: 'rect-delegate-shape'
      });
      self.delegate = self.delegateRect;
      self.delegateRect.set('capture', false);
    } else {
      const clientX = e.x - self.origin.x + self.originPoint.minX;
      const clientY = e.y - self.origin.y + self.originPoint.minY;
      self.delegateRect.attr({
        x: clientX,
        y: clientY
      });
    }
  },
  /**
   * 计算delegate位置，包括左上角左边及宽度和高度
   * @memberof ItemGroup
   * @return {object} 计算出来的delegate坐标信息及宽高
   */
  calculationGroupPosition(evt: IG6GraphEvent) {
    const self = this as any;
    const nodes = self.targets;
    if (nodes.length === 0) {
      nodes.push(evt.item);
    }

    let minx = Infinity;
    let maxx = -Infinity;
    let miny = Infinity;
    let maxy = -Infinity;

    // 获取已节点的所有最大最小x y值
    for (let i = 0; i < nodes.length; i++) {
      const element = nodes[i];
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
      minY: miny
    };
  }
};
