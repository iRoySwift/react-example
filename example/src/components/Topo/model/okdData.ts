import { iGraphData } from '../typings';

export const TopoData: iGraphData = {
  combos: [],
  nodes: [
    {
      id: 'a9b8c262-e427-4916-a96a-439433167bf5',
      serviceId: '58',
      x: null,
      y: null,
      label: 'mysql',
      instanceCode: 'mysql-4rdydm1h',
      resourceType: '',
      model: {
        compType: 'mysql',
        status: '0',
        tooltip: [
          {
            ename: 'instanceCode',
            cname: '服务实例编码',
            descValue: 'mysql-4rdydm1h',
            remark: 'String'
          },
          {
            ename: 'domain',
            descValue: '',
            cname: '域名',
            remark: 'String'
          }
        ],
        img: 'http://admindev.itaas.com/icon/mysql.svg',
        groupId: 4
      }
    },
    {
      id: '8cc653bc-4d03-43fd-990c-16b251f61838',
      serviceId: '59',
      x: null,
      y: null,
      label: 'xxl-job',
      instanceCode: 'xxljob-0xtey3pu',
      resourceType: '',
      model: {
        compType: 'xxljob',
        status: '2',
        tooltip: [
          {
            ename: 'instanceCode',
            cname: '服务实例编码',
            descValue: 'xxljob-0xtey3pu',
            remark: 'String'
          },
          {
            ename: 'appname',
            descValue: 'java',
            cname: '平台中执行器',
            remark: 'String'
          },
          {
            ename: 'addresses',
            descValue: 'xxljob.com',
            cname: '平台的地址',
            remark: 'String'
          },
          {
            ename: 'accessToken',
            descValue: 'dd',
            cname: '平台客户端访问',
            remark: 'String'
          }
        ],
        img: 'http://admindev.itaas.com/icon/tomcat.svg',
        groupId: 3
      }
    }
  ],
  edges: [
    {
      id: '478',
      source: '8cc653bc-4d03-43fd-990c-16b251f61838',
      target: 'a9b8c262-e427-4916-a96a-439433167bf5'
    }
  ]
};

export const submit = {
  combos: [],
  nodes: [
    {
      id: 'a9b8c262-e427-4916-a96a-439433167bf5',
      x: 116,
      y: -78.75,
      isSaved: false,
      modelCode: 'mysql',
      comboId: null
    }
  ],
  edges: [{ source: '8cc653bc-4d03-43fd-990c-16b251f61838', target: 'a9b8c262-e427-4916-a96a-439433167bf5' }]
};
