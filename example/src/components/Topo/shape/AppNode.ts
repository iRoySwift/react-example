export default class AppNode {
  private cmd: any;
  private e: any;
  // @ts-ignore
  private graph: any;
  constructor(args) {
    this.graph = args.graph;
    this.cmd = args.cmd;
    this.e = args.e;
  }
  public init() {
    this.cmd.executeCommand('addItem', {
      itemType: 'node',
      model: {
        type: 'okdNodeCircle',
        ...this.e,
        label: this.e.title,
        model: {
          compType: 'Tomcat',
          status: '2',
          tooltip: [
            { ename: 'instanceCode', cname: '服务实例编码', descValue: 'tomcat-bwsxcikb', remark: 'String' },
            { ename: 'producerGroup', descValue: 'c', cname: '发送组', remark: 'String' },
            { ename: 'producerGroup', descValue: 'x', cname: '发送组', remark: 'String' }
          ],
          img: '/icon/tomcat.svg',
          groupId: 2
        },
        linkPoints: {
          top: false,
          right: true,
          bottom: false,
          left: true,
          size: 10
        },
        icon: {
          show: true,
          // img: "https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg",
          width: 60,
          height: 60,
          fill: '#d3dbe1',
          img: ''
        },
        size: [90],
        style: {
          fill: '#fff',
          // stroke: '#d3dbe1',
          stroke: '#33cc33',
          lineWidth: 5
        }
      }
    });
  }
}
