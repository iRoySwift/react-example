import Graph from './graph/index';
import Arrow from './shape/arrow';
import PluginBase from './plugins/base';
import Util from '@antv/g6-pc';
import GUtil from './utils';
import './behavior';
import './shape';

export * from './../typings/index';

export default { Graph, Arrow, Util: { ...GUtil, Util } };

export { PluginBase };
