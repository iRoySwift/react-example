/*
 * @Author: Roy
 * @Date: 2022-07-29 21:04:30
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-18 15:51:26
 * @Description: 创建连线
 */
import { isFunction } from '@antv/util';
import { EdgeConfig, IG6GraphEvent } from '../../typings/graph';
import { IGraph } from '../interface/graph';

const DEFAULT_TRIGGER = 'click';
const ALLOW_EVENTS = ['click', 'drag'];
const DEFAULT_KEY = undefined;
const ALLOW_KEYS = ['shift', 'ctrl', 'control', 'alt', 'meta', undefined];

export default {
  getDefaultCfg(): object {
    return {
      trigger: DEFAULT_TRIGGER,
      key: DEFAULT_KEY,
      edgeConfig: {},
      getEdgeConfig: undefined
    };
  },
  getEvents() {
    const self = this as any;
    // 检测输入是否合法
    if (!(ALLOW_EVENTS.indexOf(self.trigger.toLowerCase()) > -1)) {
      self.trigger = DEFAULT_TRIGGER;
      // eslint-disable-next-line no-console
      console.warn("Behavior create-edge 的 trigger 参数不合法，请输入 'click'，'drag'");
    }
    if (self.key && ALLOW_KEYS.indexOf(self.key.toLowerCase()) === -1) {
      self.trigger = DEFAULT_KEY;
      // eslint-disable-next-line no-console
      console.warn("Behavior create-edge 的 key 参数不合法，请输入 'shift'，'ctrl'，'alt'，'control'，或 undefined");
    }
    let events: any;
    if (self.trigger === 'drag') {
      events = {
        'node:dragstart': 'onClick',
        'combo:dragstart': 'onClick',
        drag: 'updateEndPoint',
        'node:drop': 'onClick',
        'combo:drop': 'onClick',
        dragend: 'onDragEnd'
      };
    } else if (self.trigger === 'click') {
      events = {
        'node:click': 'onClick', // The event is node:click, the responsing function is onClick
        mousemove: 'updateEndPoint', // The event is mousemove, the responsing function is onMousemove
        'edge:click': 'cancelCreating', // The event is edge:click, the responsing function is onEdgeClick
        'canvas:click': 'cancelCreating',
        'combo:click': 'onClick'
      };
    }
    if (self.key) {
      events.keydown = 'onKeyDown';
      events.keyup = 'onKeyUp';
    }
    return events;
  },
  /**
   * Handle the callback for node:click
   * @override
   * @param  {Object} evt The handler
   */
  onClick(evt: IG6GraphEvent) {
    const self = this as any;
    if (self.key && !self.keydown) return;
    const node = evt.item;
    const graph: IGraph = self.graph;
    const model = node?.getModel();
    const getEdgeConfig = self.getEdgeConfig;
    graph.emit('beforecreateedge', {});

    if (self.edge && self.addingEdge) {
      if (!self.shouldEnd.call(self, evt)) return;
      let edgeConfig;
      if (getEdgeConfig && isFunction(getEdgeConfig)) {
        edgeConfig = getEdgeConfig({
          source: self.source,
          target: model?.id
        });
      } else {
        edgeConfig = self.edgeConfig;
      }
      const updateCfg: EdgeConfig = {
        source: self.source,
        target: model?.id,
        style: {
          lineDash: null
        },
        ...edgeConfig
      };
      if (self.source === model?.id) {
        updateCfg.type = 'loop';
      }
      graph.emit('beforecreateedge', {});
      // graph.updateItem(self.edge, updateCfg, false);

      const edge = graph.cmd.executeCommand('addItem', {
        itemType: 'edge',
        model: {
          ...updateCfg
        }
      });
      if (!edge) return;
      self.cancelCreating({ item: self.edge });
      // if (graph.get('enabledStack')) {
      //   const addedModel = {
      //     ...self.edge.getModel(),
      //     itemType: 'edge'
      //   };
      //   const after: GraphData = {};
      //   after.edges = [addedModel];
      //   graph.pushStack('add', {
      //     before: {},
      //     after
      //   });
      // }
      graph.emit('aftercreateedge', {
        edge: edge
      });

      // 暂时将该边的 capture 恢复为 true
      // self.edge.getKeyShape().set('capture', true);
      self.edge = null;
      self.addingEdge = false;
    } else {
      if (!self.shouldBegin.call(self, evt)) return;
      // 获取自定义 edge 配置
      let edgeConfig;
      if (getEdgeConfig && isFunction(getEdgeConfig)) {
        edgeConfig = getEdgeConfig({
          source: model?.id,
          target: model?.id
        });
      } else {
        edgeConfig = self.edgeConfig;
      }
      self.edge = graph.addItem(
        'edge',
        {
          source: model?.id,
          target: model?.id,
          style: {
            lineDash: [10, 5]
          },
          ...edgeConfig
        },
        false
      );
      self.source = model?.id;
      self.addingEdge = true;
      // 暂时将该边的 capture 设置为 false，这样可以拾取到后面的元素
      self.edge.getKeyShape().set('capture', false);
      graph.emit('edge:dragstart', evt);
    }
  },
  /**
   * Handle the callback for mousemove
   * @override
   * @param  {Object} evt The handler
   */
  updateEndPoint(evt: IG6GraphEvent) {
    const self = this as any;
    const point = { x: evt.x, y: evt.y };
    if (self.edge && self.edge.destroyed) self.cancelCreating({ item: self.edge });
    if (!self.graph.findById(self.source)) {
      self.addingEdge = false;
      self.edge = null;
      return;
    }
    if (self.edge && self.addingEdge) {
      self.graph.updateItem(
        self.edge,
        {
          target: point
        },
        false
      );
    }
  },
  onDragEnd(evt: IG6GraphEvent) {
    const graph: IGraph | any = evt.currentTarget;
    graph.emit('edge:dragend', evt);

    const self = this as any;
    if (self.key && !self.keydown) return;
    const { item } = evt;
    if (!item || item.getID() === self.source || item.getType() !== 'node') {
      self.cancelCreating({
        item: self.edge,
        x: evt.x,
        y: evt.y
      });
      return;
    }
  },
  // 取消增加边，删除该边；或指定终点
  cancelCreating(ev: IG6GraphEvent) {
    const self = this as any;
    if (self.key && !self.keydown) return;
    const graph: IGraph = self.graph;
    const currentEdge = ev.item;
    if (self.addingEdge && (self.edge === currentEdge || ev.target?.isCanvas?.())) {
      if (self.edge && !self.edge.destroyed) graph.removeItem(self.edge, false);
      self.edge = null;
      self.addingEdge = false;
      return;
    }
  },
  onKeyDown(e: IG6GraphEvent) {
    const self = this as any;
    const code = e.key;
    if (!code) {
      return;
    }
    if (code.toLowerCase() === self.key.toLowerCase()) {
      self.keydown = true;
    } else {
      self.keydown = false;
    }
  },
  onKeyUp() {
    const self = this as any;
    if (self.addingEdge && self.edge) {
      // 清除正在增加的边
      self.graph.removeItem(self.edge, false);
      self.addingEdge = false;
      self.edge = null;
    }
    self.keydown = false;
  }
};
