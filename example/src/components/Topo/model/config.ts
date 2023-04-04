/*
 * @Author: Roy
 * @Date: 2022-08-10 15:01:23
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-18 10:06:22
 * @Description: 配置文件
 */
//节点样式
const nodeStyle = {
  dragover: {
    fill: '#1b85ff1a'
  },
  dragend: {
    fill: 'transparent'
  }
};

const statusMap: { [key: string]: string } = {
  0: '#DDDDDD', //'未配置',
  1: '#3F52B4', //'部署中',
  2: '#7DC856', //'部署成功',
  3: '#FF093E', //'部署失败',
  4: '#7DC856' //'已录入'
};

export { nodeStyle, statusMap };
