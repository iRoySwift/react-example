/*
 * @Author: Roy
 * @Date: 2022-04-13 18:05:34
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-17 18:01:18
 * @Description: 配置项
 */
const ERROR_COLOR = '#F5222D';

const defaultStyle = {
  fontSize: 12,
  padding: 10,
  fontColor: '#666',
  borderColor: 'rgb(27, 133, 255)',
  backgoundColor: '#fff',
  lineWidth: 1.5,
  radius: 4,
  // 图片
  fillStart: '#B7B7B7',
  startPoint: 0,
  endPoint: 1,
  fillEnd: '#D2D2D2',
  // 状态
  statusBorder: '#d3dbe1',
  statusLineWidth: 4
};
// const status = {
// };
const activeStyle = {
  borderColor: '#82D13D',
  // 图片
  fillStart: '#82D13D',
  fillEnd: '#82D13D'
};

let getNodeStyle = (state: string) => {
  switch (state) {
    case 'active':
      return {
        ...defaultStyle,
        ...activeStyle
      };
    default:
      return defaultStyle;
  }
};

export default getNodeStyle;
