/*
 * @Author: Roy
 * @Date: 2022-08-01 17:57:10
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-16 16:48:12
 * @Description: 请填写简介
 */
import Util from '@antv/g6-pc';
import * as baseUtil from './base';
import * as GraphicUtil from './graphic';
import * as modifyCss from './modify-css';

export default Object.assign(Util, modifyCss, GraphicUtil, baseUtil);
