import { GraphData } from '@antv/g6';

export const TopoData: GraphData = {
  combos: [],
  nodes: [
    {
      id: 'c4aa2aa1-72c6-4c36-82c2-06b1e0739c3e',
      x: 540,
      y: 0,
      type: 'okdNodeCircle',
      label: 'Wildfly_01',
      model: {
        compType: 'tomcat',
        status: 'wait',
        tooltip: 'ss'
      },
      img: 'ss'
    },
    {
      id: '958803bf-1f47-4e88-9977-71e6ef10107f',
      x: 360,
      y: 0,
      type: 'okdNodeCircle',
      label: 'Suengine_01',
      model: {
        compType: 'NginxKVM',
        status: 'wait'
      }
      // comboId: "eed702c6",
      // uuid: "958803bf-1f47-4e88-9977-71e6ef10107f",
    },
    {
      id: '83b43de2-6477-48b2-b3c6-d19a05657a3c',
      x: 540,
      y: 240,
      type: 'okdNodeCircle',
      label: 'Wildfly_02',
      model: {
        compType: 'JbossStandaloneKVM',
        status: 'wait'
      }
      // comboId: "25775510",
      // uuid: "83b43de2-6477-48b2-b3c6-d19a05657a3c",
    },
    {
      id: '8e230780-3714-4812-b328-0959865a0792',
      x: 360,
      y: 240,
      type: 'okdNodeCircle',
      label: 'Suengine_02',
      model: {
        compType: 'NginxKVM',
        status: 'wait'
      }
      // comboId: '924d5516',
      // uuid: '8e230780-3714-4812-b328-0959865a0792',
    },
    {
      id: '86917129-84d9-436f-aae6-5eb02d321232',
      x: -360,
      y: 0,
      type: 'okdNodeCircle',
      label: 'ALBExtranet_01',
      model: {
        compType: 'ALBExtranet',
        status: 'wait'
      }
      // comboId: '',
      // uuid: '86917129-84d9-436f-aae6-5eb02d321232'
    },
    {
      id: '8416280c-15a2-4b6b-808c-aa83ba332634',
      x: -180,
      y: 0,
      type: 'okdNodeCircle',
      label: 'ALBIntranet_01',
      model: {
        compType: 'ALBIntranet',
        status: 'wait'
      }
      // comboId: '',
      // uuid: '8416280c-15a2-4b6b-808c-aa83ba332634',
    },
    {
      id: '27c72bb9-9078-4e16-88e1-69db7bab9037',
      x: -180,
      y: 120,
      type: 'okdNodeCircle',
      label: 'ALBIntranet_02',
      model: {
        compType: 'ALBIntranet',
        status: 'wait'
      }
      // comboId: '',
      // uuid: '27c72bb9-9078-4e16-88e1-69db7bab9037',
    },
    {
      id: '72854538-6e33-406e-8244-827bf830aa80',
      x: -360,
      y: 120,
      type: 'okdNodeCircle',
      label: 'ALBExtranet_02',
      model: {
        compType: 'ALBExtranet',
        status: 'wait'
      }
      // comboId: '',
      // uuid: '72854538-6e33-406e-8244-827bf830aa80',
    }
  ],
  edges: [
    {
      id: 'a5640f40',
      source: '958803bf-1f47-4e88-9977-71e6ef10107f',
      target: 'c4aa2aa1-72c6-4c36-82c2-06b1e0739c3e'
    },
    {
      id: '217f341c',
      source: '8e230780-3714-4812-b328-0959865a0792',
      target: '83b43de2-6477-48b2-b3c6-d19a05657a3c'
    },
    {
      id: '95d58ff2',
      source: '8416280c-15a2-4b6b-808c-aa83ba332634',
      target: '958803bf-1f47-4e88-9977-71e6ef10107f'
    },
    {
      id: '9502c10b',
      source: '86917129-84d9-436f-aae6-5eb02d321232',
      target: '8416280c-15a2-4b6b-808c-aa83ba332634'
    },
    {
      id: '55da64e6',
      source: '27c72bb9-9078-4e16-88e1-69db7bab9037',
      target: '8e230780-3714-4812-b328-0959865a0792'
    },
    {
      id: 'd2fe2ee4',
      source: '72854538-6e33-406e-8244-827bf830aa80',
      target: '27c72bb9-9078-4e16-88e1-69db7bab9037'
    }
  ]
};

export const datalist = {
  combos: [],
  nodes: [
    {
      id: '23',
      x: 540,
      y: 0,
      label: 'wildfly_01',
      model: { compType: 'Node.js', status: '1', tooltip: '1', img: '/icon/tomcat.svg' }
    },
    {
      id: '24',
      x: 360,
      y: 0,
      label: 'suengine_01',
      model: { compType: 'Node.js', status: '1', tooltip: '1', img: '1' }
    },
    {
      id: '25',
      x: 540,
      y: 240,
      label: 'widlfly_02',
      model: { compType: 'Node.js', status: '1', tooltip: '1', img: '/icon/tomcat.svg' }
    },
    {
      id: '26',
      x: 360,
      y: 240,
      label: 'suengine_02',
      model: { compType: 'Node.js', status: '1', tooltip: '1', img: '1' }
    },
    {
      id: '27',
      x: -360,
      y: 0,
      label: 'AlbExtranet_01',
      model: { compType: 'AlbExtranet', status: '1', tooltip: '1', img: '1' }
    },
    {
      id: '28',
      x: -180,
      y: 120,
      label: 'AlbIntranet_02',
      model: { compType: 'AlbIntranet', status: '1', tooltip: '1', img: '1' }
    },
    {
      id: '29',
      x: -360,
      y: 120,
      label: 'AlbExtranet_02',
      model: { compType: 'AlbExtranet', status: '1', tooltip: '1', img: '1' }
    },
    {
      id: '30',
      x: -180,
      y: 0,
      label: 'AlbIntranet_01',
      model: { compType: 'AlbIntranet', status: '1', tooltip: '1', img: '1' }
    }
  ],
  edges: [
    { id: '10', source: '27', target: '30' },
    { id: '11', source: '30', target: '24' },
    { id: '12', source: '24', target: '23' },
    { id: '13', source: '29', target: '28' },
    { id: '14', source: '28', target: '26' },
    { id: '15', source: '26', target: '25' }
  ]
};

export const data3 = {
  combos: [],
  nodes: [
    {
      id: 'b',
      serviceId: '23',
      x: 540,
      y: 0,
      label: 'wildfly_01',
      model: { compType: 'Node.js', status: '1', tooltip: '1', img: '/icon/tomcat.svg' }
    },
    {
      id: 'c',
      serviceId: '24',
      x: 360,
      y: 0,
      label: 'suengine_01',
      model: { compType: 'Node.js', status: '1', tooltip: '1', img: '1' }
    },
    {
      id: 'd',
      serviceId: '25',
      x: 540,
      y: 240,
      label: 'widlfly_02',
      model: { compType: 'Node.js', status: '1', tooltip: '1', img: '/icon/tomcat.svg' }
    },
    {
      id: 'e',
      serviceId: '26',
      x: 360,
      y: 240,
      label: 'suengine_02',
      model: { compType: 'Node.js', status: '1', tooltip: '1', img: '1' }
    },
    {
      id: 'f',
      serviceId: '27',
      x: -360,
      y: 0,
      label: 'AlbExtranet_01',
      model: { compType: 'AlbExtranet', status: '1', tooltip: '1', img: '1' }
    },
    {
      id: 'g',
      serviceId: '28',
      x: -180,
      y: 120,
      label: 'AlbIntranet_02',
      model: { compType: 'AlbIntranet', status: '1', tooltip: '1', img: '1' }
    },
    {
      id: 'h',
      serviceId: '29',
      x: -360,
      y: 120,
      label: 'AlbExtranet_02',
      model: { compType: 'AlbExtranet', status: '1', tooltip: '1', img: '1' }
    },
    {
      id: 'i',
      serviceId: '30',
      x: -180,
      y: 0,
      label: 'AlbIntranet_01',
      model: { compType: 'AlbIntranet', status: '1', tooltip: '1', img: '1' }
    }
  ],
  edges: [
    { id: '10', source: 'f', target: 'i' },
    { id: '11', source: 'i', target: 'c' },
    { id: '12', source: 'c', target: 'b' },
    { id: '13', source: 'h', target: 'g' },
    { id: '14', source: 'g', target: 'e' },
    { id: '15', source: 'e', target: 'b' }
  ]
};

export default {};
