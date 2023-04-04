/*
 * @Author: Roy
 * @Date: 2022-04-13 18:05:34
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-25 10:18:41
 * @Description: 入口
 */
import Graph from './graph/index';
import Arrow from './shape/arrow';
import Util from './util';
import './behavior';
import './shape';

export * from '../typings/custom';
export * from '../typings/graph';

let Graphin = { Graph, Arrow, Util };

export default Graphin;
