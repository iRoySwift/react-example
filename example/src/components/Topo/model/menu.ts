/*
 * @Author: Roy
 * @Date: 2022-04-13 23:05:51
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-19 10:37:08
 * @Description: 模拟数据
 */
export const allMenuInfo = [
  {
    groupId: 2,
    groupName: '运行时',
    groupCode: 'runtime',
    modelResVoList: [
      {
        modelId: 3,
        modelName: 'Tomcat',
        modelCode: 'tomcat',
        compGroupId: 2,
        showLocation: 0,
        icon: '/icon/tomcat.svg',
        connectedObject: {
          mysql_aliyun: 1
        },
        oneClickFlag: 0,
        connComp: '{"mysql_aliyun":1}'
      },
      {
        modelId: 10,
        modelName: 'JDK',
        modelCode: 'jdk',
        compGroupId: 2,
        showLocation: 1,
        icon: '/icon/jdk.svg',
        connectedObject: {},
        oneClickFlag: 0,
        connComp: ''
      },
      {
        modelId: 11,
        modelName: 'Nginx',
        modelCode: 'nginx',
        compGroupId: 2,
        showLocation: 2,
        icon: '/icon/nginx.svg',
        connectedObject: {},
        oneClickFlag: 0,
        connComp: ''
      }
    ]
  },
  {
    groupId: 4,
    groupName: '数据服务',
    groupCode: 'database',
    modelResVoList: [
      {
        modelId: 37,
        modelName: '阿里云数据库Redis',
        modelCode: 'redis_aliyun',
        compGroupId: 4,
        showLocation: 0,
        icon: '/icon/redis.svg',
        connectedObject: {},
        oneClickFlag: 1,
        connComp: ''
      },
      {
        modelId: 38,
        modelName: '阿里云数据库MySQL',
        modelCode: 'mysql_aliyun',
        compGroupId: 4,
        showLocation: 0,
        icon: '/icon/mysql.svg',
        connectedObject: {},
        oneClickFlag: 1,
        connComp: ''
      },
      {
        modelId: 8,
        modelName: 'Redis',
        modelCode: 'redis',
        compGroupId: 4,
        showLocation: 3,
        icon: '/icon/redis.svg',
        connectedObject: {},
        oneClickFlag: 0,
        connComp: ''
      },
      {
        modelId: 7,
        modelName: 'MySQL',
        modelCode: 'mysql',
        compGroupId: 4,
        showLocation: 4,
        icon: '/icon/mysql.svg',
        connectedObject: {},
        oneClickFlag: 0,
        connComp: ''
      }
    ]
  },
  {
    groupId: 3,
    groupName: '基础服务',
    groupCode: 'baseComponent',
    modelResVoList: [
      {
        modelId: 6,
        modelName: 'xxl-job',
        modelCode: 'xxljob',
        compGroupId: 3,
        showLocation: 7,
        icon: '/icon/xxljob.svg',
        connectedObject: {},
        oneClickFlag: 0,
        connComp: ''
      },
      {
        modelId: 12,
        modelName: 'RocketMq',
        modelCode: 'rocketmq',
        compGroupId: 3,
        showLocation: 8,
        icon: '/icon/rocketmq.svg',
        connectedObject: {},
        oneClickFlag: 0,
        connComp: ''
      },
      {
        modelId: 13,
        modelName: 'Nacos',
        modelCode: 'nacos',
        compGroupId: 3,
        showLocation: 9,
        icon: '/icon/nacos.svg',
        connectedObject: {},
        oneClickFlag: 0,
        connComp: ''
      }
    ]
  }
];

export const allMenuMap = {
  cnNameMap: {
    NGMySQL: 'MySQL',
    DB2: 'DB2',
    JbossStandaloneKVM: 'Wildfly',
    NODEJS: 'Nodejs',
    GO: 'GO',
    TomcatDocker: 'Tomcat(容器服务)',
    JbossStandaloneKVMAI: 'Wildfly_AI',
    NginxDocker: 'Nginx(容器服务)',
    NginxKVM: 'Suengine',
    NCM: '4LB',
    WAF: 'WAF(含7层负载)',
    DNS: '域名解析',
    LB: 'LB',
    ALBIntranet: 'ALB内网',
    ALBExtranet: 'ALB公网',
    LOGBACK: '日志备份',
    PUBLICNETAGENT: '公网代理',
    SPM: '调用链监控',
    LOGCOLLECT: '日志采集',
    AtlasSLGS: '日志采集',
    vm: 'ECS(裸机)',
    CommonService: 'PPTV',
    AtlasFlink: 'Flink',
    AtlasES: 'ES',
    AtlasKafka: 'Kafka',
    AtlasWindQ: 'WindQ'
  },
  enNameMap: {
    NGMySQL: 'MySQL',
    DB2: 'DB2',
    JbossStandaloneKVM: 'Wildfly',
    NODEJS: 'Nodejs',
    GO: 'GO',
    TomcatDocker: 'Tomcat',
    JbossStandaloneKVMAI: 'Wildfly_AI',
    NginxDocker: 'Nginx',
    NginxKVM: 'Suengine',
    NCM: '4LB',
    WAF: 'WAF',
    DNS: 'DNS',
    LB: 'LB',
    ALBIntranet: 'ALBIntranet',
    ALBExtranet: 'ALBExtranet',
    LOGBACK: 'logback',
    PUBLICNETAGENT: 'publicnetagent',
    SPM: 'spm',
    LOGCOLLECT: 'logcollect',
    AtlasSLGS: 'AtlasSLGS',
    vm: 'ECS',
    CommonService: 'PPTV',
    AtlasFlink: 'Flink',
    AtlasES: 'ES',
    AtlasKafka: 'Kafka',
    AtlasWindQ: 'WindQ'
  },
  serviceMap: {
    NGMySQL: {
      groupLabel: 'db',
      groupIndex: 0,
      id: 8,
      compGroupId: 2,
      compType: 'NGMySQL',
      compCname: 'MySQL',
      compEname: 'MySQL',
      compDesc: '单机/高可用MySQL数据库服务',
      connObj: '{}',
      connectedObject: {},
      connectedCheck: [
        {
          id: 40,
          compModelId: 8,
          connectedCompType: 'JbossStandaloneKVM',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'app',
          status: 1
        },
        {
          id: 42,
          compModelId: 8,
          connectedCompType: 'NODEJS',
          connectedNum: 0,
          notConnected: "['LOGBACK']",
          groupLabel: 'app',
          status: 1
        },
        {
          id: 43,
          compModelId: 8,
          connectedCompType: 'GO',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'app',
          status: 1
        },
        {
          id: 44,
          compModelId: 8,
          connectedCompType: 'JbossStandaloneKVMAI',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'app',
          status: 1
        },
        {
          id: 45,
          compModelId: 8,
          connectedCompType: 'TomcatDocker',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'app',
          status: 1
        }
      ],
      exportNumber: -1,
      showLocation: 2,
      status: 1,
      groupName: '数据库服务'
    },
    DB2: {
      groupLabel: 'db',
      groupIndex: 0,
      id: 10,
      compGroupId: 2,
      compType: 'DB2',
      compCname: 'DB2',
      compEname: 'DB2',
      compDesc: '基于v9.7.0.7、 v10.5.0.7版本的单机/高可用DB2数据库服务',
      connObj: '{}',
      connectedObject: {},
      connectedCheck: [
        {
          id: 51,
          compModelId: 10,
          connectedCompType: 'JbossStandaloneKVM',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'app',
          status: 1
        },
        {
          id: 52,
          compModelId: 10,
          connectedCompType: 'NODEJS',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'app',
          status: 1
        },
        {
          id: 53,
          compModelId: 10,
          connectedCompType: 'JbossStandaloneKVMAI',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'app',
          status: 1
        }
      ],
      exportNumber: -1,
      showLocation: 2,
      status: 1,
      groupName: '数据库服务'
    },
    JbossStandaloneKVM: {
      groupLabel: 'app',
      groupIndex: 1,
      id: 1,
      compGroupId: 3,
      compType: 'JbossStandaloneKVM',
      compCname: 'Wildfly',
      compEname: 'Wildfly',
      compDesc: '单机版jboss',
      connObj: "{ 'DB2' : 0, 'NGMySQL' : 0, 'PostgreSQL' : 0, 'SNRS' : 0, 'SNDP': 0, 'AtlasWindQ': 0 }",
      connectedObject: {
        DB2: 0,
        NGMySQL: 0,
        PostgreSQL: 0,
        SNRS: 0,
        SNDP: 0,
        AtlasWindQ: 0
      },
      connectedCheck: [
        {
          id: 1,
          compModelId: 1,
          connectedCompType: 'NginxKVM',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'web',
          status: 1
        },
        {
          id: 5,
          compModelId: 1,
          connectedCompType: 'LOGBACK',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 6,
          compModelId: 1,
          connectedCompType: 'PUBLICNETAGENT',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 7,
          compModelId: 1,
          connectedCompType: 'LOGCOLLECT',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 8,
          compModelId: 1,
          connectedCompType: 'SPM',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 67,
          compModelId: 1,
          connectedCompType: 'LB',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'net',
          status: 1
        },
        {
          id: 136,
          compModelId: 1,
          connectedCompType: 'AtlasSLGS',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        }
      ],
      exportNumber: 0,
      showLocation: 0,
      status: 1,
      groupName: '应用服务'
    },
    NODEJS: {
      groupLabel: 'app',
      groupIndex: 1,
      id: 2,
      compGroupId: 3,
      compType: 'NODEJS',
      compCname: 'Nodejs',
      compEname: 'Nodejs',
      compDesc: 'NODEJS',
      connObj: '{ }',
      connectedObject: {},
      connectedCheck: [
        {
          id: 9,
          compModelId: 2,
          connectedCompType: 'NginxKVM',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'web',
          status: 1
        },
        {
          id: 13,
          compModelId: 2,
          connectedCompType: 'PUBLICNETAGENT',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 14,
          compModelId: 2,
          connectedCompType: 'LOGCOLLECT',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 68,
          compModelId: 2,
          connectedCompType: 'LB',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'net',
          status: 1
        },
        {
          id: 137,
          compModelId: 2,
          connectedCompType: 'AtlasSLGS',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        }
      ],
      exportNumber: 0,
      showLocation: 0,
      status: 1,
      groupName: '应用服务'
    },
    GO: {
      groupLabel: 'app',
      groupIndex: 1,
      id: 3,
      compGroupId: 3,
      compType: 'GO',
      compCname: 'GO',
      compEname: 'GO',
      compDesc: 'GO',
      connObj: "{ 'NGMySQL' : 0,  'SNDP': 0  }",
      connectedObject: { NGMySQL: 0, SNDP: 0 },
      connectedCheck: [
        {
          id: 16,
          compModelId: 3,
          connectedCompType: 'NginxKVM',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'web',
          status: 1
        },
        {
          id: 19,
          compModelId: 3,
          connectedCompType: 'LOGBACK',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 20,
          compModelId: 3,
          connectedCompType: 'PUBLICNETAGENT',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 21,
          compModelId: 3,
          connectedCompType: 'LOGCOLLECT',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 69,
          compModelId: 3,
          connectedCompType: 'LB',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'net',
          status: 1
        },
        {
          id: 138,
          compModelId: 3,
          connectedCompType: 'AtlasSLGS',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        }
      ],
      exportNumber: 0,
      showLocation: 0,
      status: 1,
      groupName: '应用服务'
    },
    TomcatDocker: {
      groupLabel: 'app',
      groupIndex: 1,
      id: 4,
      compGroupId: 3,
      compType: 'TomcatDocker',
      compCname: 'Tomcat(容器服务)',
      compEname: 'Tomcat',
      compDesc: 'tomcat容器',
      connObj: "{ 'NGMySQL' : 0, 'PostgreSQL' : 0, 'SNRS' : 0 }",
      connectedObject: { NGMySQL: 0, PostgreSQL: 0, SNRS: 0 },
      connectedCheck: [
        {
          id: 25,
          compModelId: 4,
          connectedCompType: 'LOGCOLLECT',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 26,
          compModelId: 4,
          connectedCompType: 'PUBLICNETAGENT',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 65,
          compModelId: 4,
          connectedCompType: 'NginxKVM',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'web',
          status: 1
        },
        {
          id: 70,
          compModelId: 4,
          connectedCompType: 'LB',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'net',
          status: 1
        },
        {
          id: 139,
          compModelId: 4,
          connectedCompType: 'AtlasSLGS',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        }
      ],
      exportNumber: 0,
      showLocation: 0,
      status: 1,
      groupName: '应用服务'
    },
    JbossStandaloneKVMAI: {
      groupLabel: 'app',
      groupIndex: 1,
      id: 5,
      compGroupId: 3,
      compType: 'JbossStandaloneKVMAI',
      compCname: 'Wildfly_AI',
      compEname: 'Wildfly_AI',
      compDesc: '单机版AIjboss',
      connObj: "{ 'JbossStandaloneKVM' : 1,'DB2' : 0, 'NGMySQL' : 0, 'PostgreSQL' : 0, 'SNRS' : 0,  'MyCat': 0 }",
      connectedObject: {
        JbossStandaloneKVM: 1,
        DB2: 0,
        NGMySQL: 0,
        PostgreSQL: 0,
        SNRS: 0,
        MyCat: 0
      },
      connectedCheck: [
        {
          id: 27,
          compModelId: 5,
          connectedCompType: 'NginxKVM',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'web',
          status: 1
        },
        {
          id: 30,
          compModelId: 5,
          connectedCompType: 'LOGBACK',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 31,
          compModelId: 5,
          connectedCompType: 'PUBLICNETAGENT',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 32,
          compModelId: 5,
          connectedCompType: 'LOGCOLLECT',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 33,
          compModelId: 5,
          connectedCompType: 'SPM',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 71,
          compModelId: 5,
          connectedCompType: 'LB',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'net',
          status: 1
        },
        {
          id: 140,
          compModelId: 5,
          connectedCompType: 'AtlasSLGS',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        }
      ],
      exportNumber: 0,
      showLocation: 0,
      status: 1,
      groupName: '应用服务'
    },
    NginxDocker: {
      groupLabel: 'web',
      groupIndex: 2,
      id: 7,
      compGroupId: 4,
      compType: 'NginxDocker',
      compCname: 'Nginx(容器服务)',
      compEname: 'Nginx',
      compDesc: 'nginx容器',
      connObj: '{}',
      connectedObject: {},
      connectedCheck: [
        {
          id: 62,
          compModelId: 7,
          connectedCompType: 'LOGCOLLECT',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 73,
          compModelId: 7,
          connectedCompType: 'LB',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'net',
          status: 1
        },
        {
          id: 142,
          compModelId: 7,
          connectedCompType: 'AtlasSLGS',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        }
      ],
      exportNumber: 0,
      showLocation: 0,
      status: 1,
      groupName: 'WEB服务'
    },
    NginxKVM: {
      groupLabel: 'web',
      groupIndex: 2,
      id: 6,
      compGroupId: 4,
      compType: 'NginxKVM',
      compCname: 'Suengine',
      compEname: 'Suengine',
      compDesc: '苏宁定制版nginx，专门和wildfly服务组合使用，实现对WildFly server的HTTP代理分发',
      connObj: "{ 'GO' : 1, 'JbossStandaloneKVM' : 1, 'JbossStandaloneKVMAI' : 1, 'NODEJS' : 1, 'TomcatDocker' : 1 }",
      connectedObject: {
        GO: 1,
        JbossStandaloneKVM: 1,
        JbossStandaloneKVMAI: 1,
        NODEJS: 1,
        TomcatDocker: 1
      },
      connectedCheck: [
        {
          id: 36,
          compModelId: 6,
          connectedCompType: 'LOGCOLLECT',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 63,
          compModelId: 6,
          connectedCompType: 'LOGBACK',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        },
        {
          id: 72,
          compModelId: 6,
          connectedCompType: 'LB',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'net',
          status: 1
        },
        {
          id: 141,
          compModelId: 6,
          connectedCompType: 'AtlasSLGS',
          connectedNum: 1,
          notConnected: '[]',
          groupLabel: 'strategy',
          status: 1
        }
      ],
      exportNumber: 1,
      showLocation: 1,
      status: 1,
      groupName: 'WEB服务'
    },
    NCM: {
      groupLabel: 'net',
      groupIndex: 3,
      id: 12,
      compGroupId: 5,
      compType: 'NCM',
      compCname: '4LB',
      compEname: '4LB',
      compDesc: '支持TCP/UDP协议',
      connObj: "{ 'vm': 1,'WAF' : 1, 'GO' : 1, 'JbossStandaloneKVM' : 1, 'JbossStandaloneKVMAI' : 1, 'NODEJS' : 1, 'NginxDocker' : 1, 'NginxKVM' : 1, 'TomcatDocker' : 1 }",
      connectedObject: {
        vm: 1,
        WAF: 1,
        GO: 1,
        JbossStandaloneKVM: 1,
        JbossStandaloneKVMAI: 1,
        NODEJS: 1,
        NginxDocker: 1,
        NginxKVM: 1,
        TomcatDocker: 1
      },
      connectedCheck: [],
      exportNumber: 1,
      showLocation: 1,
      status: 1,
      groupName: '网络服务'
    },
    WAF: {
      groupLabel: 'net',
      groupIndex: 3,
      id: 13,
      compGroupId: 5,
      compType: 'WAF',
      compCname: 'WAF(含7层负载)',
      compEname: 'WAF',
      compDesc: '支持HTTP/HTTPS协议，该服务依赖4层负载均衡',
      connObj: "{ 'GO' : 1, 'JbossStandaloneKVM' : 1, 'JbossStandaloneKVMAI' : 1, 'NODEJS' : 1, 'NginxKVM' : 1, 'TomcatDocker' : 1, 'NginxDocker' : 1 }",
      connectedObject: {
        GO: 1,
        JbossStandaloneKVM: 1,
        JbossStandaloneKVMAI: 1,
        NODEJS: 1,
        NginxKVM: 1,
        TomcatDocker: 1,
        NginxDocker: 1
      },
      connectedCheck: [],
      exportNumber: 1,
      showLocation: 1,
      status: 1,
      groupName: '网络服务'
    },
    DNS: {
      groupLabel: 'net',
      groupIndex: 3,
      id: 14,
      compGroupId: 5,
      compType: 'DNS',
      compCname: '域名解析',
      compEname: 'DNS',
      compDesc: '仅支持内网域名解析',
      connObj: "{ 'LB' : 1 }",
      connectedObject: { LB: 1 },
      connectedCheck: [],
      exportNumber: 1,
      showLocation: 1,
      status: 1,
      groupName: '网络服务'
    },
    LB: {
      groupLabel: 'net',
      groupIndex: 3,
      id: 21,
      compGroupId: 5,
      compType: 'LB',
      compCname: 'LB',
      compEname: 'LB',
      compDesc: '支持TCP/UDP协议',
      connObj: "{ 'vm': 1,'GO' : 1, 'JbossStandaloneKVM' : 1, 'JbossStandaloneKVMAI' : 1, 'NODEJS' : 1, 'NginxDocker' : 1, 'NginxKVM' : 1, 'TomcatDocker' : 1 }",
      connectedObject: {
        vm: 1,
        GO: 1,
        JbossStandaloneKVM: 1,
        JbossStandaloneKVMAI: 1,
        NODEJS: 1,
        NginxDocker: 1,
        NginxKVM: 1,
        TomcatDocker: 1
      },
      connectedCheck: [
        {
          id: 58,
          compModelId: 21,
          connectedCompType: 'DNS',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'net',
          status: 1
        }
      ],
      exportNumber: 1,
      showLocation: 1,
      status: 1,
      groupName: '网络服务'
    },
    ALBIntranet: {
      groupLabel: 'net',
      groupIndex: 3,
      id: 71,
      compGroupId: 5,
      compType: 'ALBIntranet',
      compCname: 'ALB内网',
      compEname: 'ALBIntranet',
      compDesc: 'ALB内网服务，支持TCP/UDP协议',
      connObj: "{ 'vm': 0,'GO' : 0, 'JbossStandaloneKVM' : 0, 'JbossStandaloneKVMAI' : 0, 'NODEJS' : 0, 'NginxDocker' : 0, 'NginxKVM' : 0, 'TomcatDocker' : 0 }",
      connectedObject: {
        vm: 0,
        GO: 0,
        JbossStandaloneKVM: 0,
        JbossStandaloneKVMAI: 0,
        NODEJS: 0,
        NginxDocker: 0,
        NginxKVM: 0,
        TomcatDocker: 0
      },
      connectedCheck: [],
      exportNumber: 1,
      showLocation: 2,
      status: 1,
      groupName: '网络服务'
    },
    ALBExtranet: {
      groupLabel: 'net',
      groupIndex: 3,
      id: 72,
      compGroupId: 5,
      compType: 'ALBExtranet',
      compCname: 'ALB公网',
      compEname: 'ALBExtranet',
      compDesc: 'ALB外网服务，支持TCP/UDP协议',
      connObj: "{ 'ALBIntranet': 1}",
      connectedObject: { ALBIntranet: 1 },
      connectedCheck: [],
      exportNumber: 1,
      showLocation: 2,
      status: 1,
      groupName: '网络服务'
    },
    LOGBACK: {
      groupLabel: 'strategy',
      groupIndex: 1,
      id: 15,
      compGroupId: 6,
      compType: 'LOGBACK',
      compCname: '日志备份',
      compEname: 'logback',
      compDesc: '适用于Suengine/Wildfly服务的中间件',
      connObj: "{'JbossStandaloneKVM' : 1, 'JbossStandaloneKVMAI' : 1, 'NginxKVM' : 1 }",
      connectedObject: {
        JbossStandaloneKVM: 1,
        JbossStandaloneKVMAI: 1,
        NginxKVM: 1
      },
      connectedCheck: [],
      exportNumber: 1,
      showLocation: 4,
      status: 1,
      groupName: '策略服务'
    },
    PUBLICNETAGENT: {
      groupLabel: 'strategy',
      groupIndex: 1,
      id: 16,
      compGroupId: 6,
      compType: 'PUBLICNETAGENT',
      compCname: '公网代理',
      compEname: 'publicnetagent',
      compDesc: '适用于wildfly服务器访问公网场景',
      connObj: "{ 'JbossStandaloneKVM' : 1, 'NODEJS' : 1, 'GO' : 1, 'JbossStandaloneKVMAI' : 1, 'TomcatDocker' : 1 }",
      connectedObject: {
        JbossStandaloneKVM: 1,
        NODEJS: 1,
        GO: 1,
        JbossStandaloneKVMAI: 1,
        TomcatDocker: 1
      },
      connectedCheck: [],
      exportNumber: 1,
      showLocation: 4,
      status: 1,
      groupName: '策略服务'
    },
    SPM: {
      groupLabel: 'strategy',
      groupIndex: 1,
      id: 17,
      compGroupId: 6,
      compType: 'SPM',
      compCname: '调用链监控',
      compEname: 'spm',
      compDesc: '服务端调用链监控服务',
      connObj: "{ 'JbossStandaloneKVM' : 1, 'JbossStandaloneKVMAI' : 1 }",
      connectedObject: {
        JbossStandaloneKVM: 1,
        JbossStandaloneKVMAI: 1
      },
      connectedCheck: [],
      exportNumber: 1,
      showLocation: 4,
      status: 1,
      groupName: '策略服务'
    },
    LOGCOLLECT: {
      groupLabel: 'strategy',
      groupIndex: 1,
      id: 18,
      compGroupId: 6,
      compType: 'LOGCOLLECT',
      compCname: '日志采集',
      compEname: 'logcollect',
      compDesc: '日志采集',
      connObj: "{ 'JbossStandaloneKVM' : 1, 'NginxKVM' : 1, 'NginxDocker' : 1, 'TomcatDocker' : 1, 'JbossStandaloneKVMAI' : 1, 'NODEJS' : 1, 'GO' : 1 }",
      connectedObject: {
        JbossStandaloneKVM: 1,
        NginxKVM: 1,
        NginxDocker: 1,
        TomcatDocker: 1,
        JbossStandaloneKVMAI: 1,
        NODEJS: 1,
        GO: 1
      },
      connectedCheck: [],
      exportNumber: 1,
      showLocation: 4,
      status: 1,
      groupName: '策略服务'
    },
    AtlasSLGS: {
      groupLabel: 'strategy',
      groupIndex: 1,
      id: 66,
      compGroupId: 6,
      compType: 'AtlasSLGS',
      compCname: '日志采集',
      compEname: 'AtlasSLGS',
      compDesc: '一键建站日志采集',
      connObj: "{ 'JbossStandaloneKVM' : 1, 'NginxKVM' : 1, 'NginxDocker' : 1, 'TomcatDocker' : 1, 'JbossStandaloneKVMAI' : 1, 'NODEJS' : 1, 'GO' : 1 }",
      connectedObject: {
        JbossStandaloneKVM: 1,
        NginxKVM: 1,
        NginxDocker: 1,
        TomcatDocker: 1,
        JbossStandaloneKVMAI: 1,
        NODEJS: 1,
        GO: 1
      },
      connectedCheck: [],
      exportNumber: -1,
      showLocation: 4,
      status: 1,
      groupName: '策略服务'
    },
    vm: {
      groupLabel: 'common',
      groupIndex: 1,
      id: 19,
      compGroupId: 7,
      compType: 'vm',
      compCname: 'ECS(裸机)',
      compEname: 'ECS',
      compDesc: '通用虚拟机服务，用于申请裸机、JDK、Nginx等非服务化机器',
      connObj: "{'AtlasWindQ': 0 }",
      connectedObject: { AtlasWindQ: 0 },
      connectedCheck: [
        {
          id: 74,
          compModelId: 19,
          connectedCompType: 'LB',
          connectedNum: 0,
          notConnected: '[]',
          groupLabel: 'net',
          status: 1
        }
      ],
      exportNumber: 0,
      showLocation: 0,
      status: 1,
      groupName: '通用服务'
    },
    CommonService: {
      groupLabel: 'customization',
      groupIndex: 1,
      id: 20,
      compGroupId: 8,
      compType: 'CommonService',
      compCname: 'PPTV',
      compEname: 'PPTV',
      compDesc: 'PPTV通用云服务器',
      connObj: '{}',
      connectedObject: {},
      connectedCheck: [],
      exportNumber: -1,
      showLocation: 2,
      status: 1,
      groupName: '定制化服务'
    },
    AtlasFlink: {
      groupLabel: 'data',
      groupIndex: 4,
      id: 63,
      compGroupId: 9,
      compType: 'AtlasFlink',
      compCname: 'Flink',
      compEname: 'Flink',
      compDesc: '大数据Flink服务',
      connObj: '{}',
      connectedObject: {},
      connectedCheck: [],
      exportNumber: -1,
      showLocation: 2,
      status: 1,
      groupName: '数据服务'
    },
    AtlasES: {
      groupLabel: 'data',
      groupIndex: 4,
      id: 64,
      compGroupId: 9,
      compType: 'AtlasES',
      compCname: 'ES',
      compEname: 'ES',
      compDesc: '大数据ES服务',
      connObj: '{}',
      connectedObject: {},
      connectedCheck: [],
      exportNumber: -1,
      showLocation: 2,
      status: 1,
      groupName: '数据服务'
    },
    AtlasKafka: {
      groupLabel: 'data',
      groupIndex: 4,
      id: 65,
      compGroupId: 9,
      compType: 'AtlasKafka',
      compCname: 'Kafka',
      compEname: 'Kafka',
      compDesc: '大数据Kafka服务',
      connObj: '{}',
      connectedObject: {},
      connectedCheck: [],
      exportNumber: -1,
      showLocation: 2,
      status: 1,
      groupName: '数据服务'
    },
    AtlasWindQ: {
      groupLabel: 'data',
      groupIndex: 4,
      id: 67,
      compGroupId: 9,
      compType: 'AtlasWindQ',
      compCname: 'WindQ',
      compEname: 'WindQ',
      compDesc: 'WindQ服务',
      connObj: '{}',
      connectedObject: {},
      connectedCheck: [],
      exportNumber: -1,
      showLocation: 2,
      status: 1,
      groupName: '数据服务'
    }
  }
};

// eslint-disable-next-line react-hooks/exhaustive-deps
export const compTypes = [
  { searchValue: null, createBy: 'admim', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 1, name: '负载均衡', modelCode: 'lb', compGroupId: 1, showLocation: null, connComp: '', icon: '/icon/lb.svg', description: '', dependIpFlag: 1, status: 0, delFlag: 0 },
  { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 2, name: '域名', modelCode: 'dns', compGroupId: 1, showLocation: null, connComp: '', icon: '/icon/dns.svg', description: '', dependIpFlag: 1, status: 0, delFlag: 0 },
  { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 3, name: 'Tomcat', modelCode: 'tomcat', compGroupId: 2, showLocation: null, connComp: '', icon: '/icon/tomcat.svg', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
  { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 6, name: 'xxl-job', modelCode: 'xxljob', compGroupId: 3, showLocation: null, connComp: '', icon: '/icon/tomcat.svg', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
  { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 7, name: 'MySQL', modelCode: 'mysql', compGroupId: 4, showLocation: null, connComp: '', icon: '/icon/mysql.svg', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
  { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 8, name: 'Redis', modelCode: 'redis', compGroupId: 4, showLocation: null, connComp: '', icon: '/icon/redis.svg', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
  { searchValue: null, createBy: 'admin', createTime: '2022-04-11 09:03:47', updateBy: '', updateTime: null, remark: null, params: {}, id: 9, name: '自定义', modelCode: 'custom', compGroupId: 5, showLocation: null, connComp: '', icon: '/icon/zidingyi.svg', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
  { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 10, name: 'OpenJDK', modelCode: 'openjdk', compGroupId: 2, showLocation: null, connComp: '', icon: '', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
  { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 11, name: 'Nginx Web服务器', modelCode: 'nginx', compGroupId: 2, showLocation: null, connComp: '', icon: '', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
  { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 12, name: '分布式消息队列', modelCode: 'rocketmq', compGroupId: 3, showLocation: null, connComp: '', icon: '', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
  { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 13, name: '分布式服务发现和配置管理平台', modelCode: 'nacos', compGroupId: 3, showLocation: null, connComp: '', icon: '', description: '', dependIpFlag: 0, status: 0, delFlag: 0 },
  { searchValue: null, createBy: 'admin', createTime: '2022-04-11 03:45:46', updateBy: '', updateTime: null, remark: null, params: {}, id: 14, name: '应用防火墙', modelCode: 'waf', compGroupId: 1, showLocation: null, connComp: '', icon: '', description: '', dependIpFlag: 0, status: 0, delFlag: 0 }
];
