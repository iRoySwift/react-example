/*
 * @Author: Roy
 * @Date: 2022-04-13 18:05:34
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-11 18:09:25
 * @Description: 插件
 */
import Tooltip from './Tooltip/index';

interface IPlugin {
  [key: string]: any;
}

let Plugins: IPlugin = {
  Tooltip
};

export default Plugins;
