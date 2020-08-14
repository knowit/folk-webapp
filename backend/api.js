const dummyData = {
  projectStatus: [
    {
      rowData: [
        'Trude Vennesla',
        'Utvikler',
        100,
        { value: 'Ruter', status: 'red' },
      ],
    },
    {
      rowData: [
        'Tore Bjørn Amundsen',
        'Utvikler',
        100,
        { value: 'Entur', status: 'red' },
      ],
    },
    {
      rowData: [
        'Trond Ragde',
        'Senior Interaksjonsdesigner',
        75,
        { value: 'Nasjonalbiblioteket', status: 'red' },
      ],
    },
    {
      rowData: [
        'Terje Vigeland',
        'UX designer',
        0,
        { value: null, status: 'green' },
      ],
    },
    {
      rowData: [
        'Tine Hansen',
        'Senior utvikler',
        50,
        { value: 'Oslo Kommune Bymiljøetaten', status: 'red' },
      ],
    },
    {
      rowData: [
        'Trine Greiger Ovesens Dottir',
        'Android utvikler',
        0,
        { value: null, status: 'green' },
      ],
    },
  ],
  resourceType: {
    componentType: 'Pie',
    setNames: ['Mobilutvikler', 'Systemutvikler'],
    sets: {
      Mobilutvikler: [
        { group: 'Group A', value: 400 },
        { group: 'Group B', value: 300 },
        { group: 'Group C', value: 300 },
        { group: 'Group D', value: 200 },
      ],
      Systemutvikler: [
        { group: 'Group A', value: 200 },
        { group: 'Group B', value: 300 },
        { group: 'Group C', value: 200 },
        { group: 'Group D', value: 100 },
      ],
    },
  },
  experience: {
    componentType: 'PercentArea',
    setNames: ['Gjennomsnitt', 'Median'],
    sets: {
      Gjennomsnitt: [
        { x: '2015.01', a: 4000, b: 2400, c: 2400 },
        { x: '2015.02', a: 3000, b: 1398, c: 2210 },
        { x: '2015.03', a: 2000, b: 9800, c: 2290 },
        { x: '2015.04', a: 2780, b: 3908, c: 2000 },
        { x: '2015.05', a: 1890, b: 4800, c: 2181 },
        { x: '2015.06', a: 2390, b: 3800, c: 2500 },
        { x: '2015.07', a: 3490, b: 4300, c: 2100 },
      ],
      Median: [
        { x: '2015.01', c: 4000, b: 2400, a: 2400 },
        { x: '2015.02', c: 3000, b: 1398, a: 2210 },
        { x: '2015.03', c: 2000, b: 9800, a: 2290 },
        { x: '2015.04', c: 2780, b: 3908, a: 2000 },
        { x: '2015.05', c: 1890, b: 4800, a: 2181 },
        { x: '2015.06', c: 2390, b: 3800, a: 2500 },
        { x: '2015.07', c: 3490, b: 4300, a: 2100 },
      ],
    },
  },
  outbound: {
    componentType: 'Bar',
    setNames: ['Uke 10', 'Uke 11'],
    sets: {
      'Uke 10': [
        { x: 'A', y1: 4000, y2: 2400 },
        { x: 'B', y1: 3000, y2: 1398 },
        { x: 'C', y1: 2000, y2: 9800 },
        { x: 'D', y1: 2780, y2: 3908 },
        { x: 'E', y1: 1890, y2: 4800 },
        { x: 'F', y1: 2390, y2: 3800 },
        { x: 'G', y1: 3490, y2: 4300 },
      ],
      'Uke 11': [
        { x: 'A', y2: 4000, y1: 2400 },
        { x: 'B', y2: 3000, y1: 1398 },
        { x: 'C', y2: 2000, y1: 9800 },
        { x: 'D', y2: 2780, y1: 3908 },
        { x: 'E', y2: 1890, y1: 4800 },
        { x: 'F', y2: 2390, y1: 3800 },
        { x: 'G', y2: 3490, y1: 4300 },
      ],
    },
  },
  inbound: {
    componentType: 'Line',
    setNames: ['Uke 10', 'Uke 11'],
    sets: {
      'Uke 10': [
        { x: 'A', y1: 4000, y2: 2400 },
        { x: 'B', y1: 3000, y2: 1398 },
        { x: 'C', y1: 2000, y2: 9800 },
        { x: 'D', y1: 2780, y2: 3908 },
        { x: 'E', y1: 1890, y2: 4800 },
        { x: 'F', y1: 2390, y2: 3800 },
        { x: 'G', y1: 3490, y2: 4300 },
      ],
      'Uke 11': [
        { x: 'A', y2: 4000, y1: 2400 },
        { x: 'B', y2: 3000, y1: 1398 },
        { x: 'C', y2: 2000, y1: 9800 },
        { x: 'D', y2: 2780, y1: 3908 },
        { x: 'E', y2: 1890, y1: 4800 },
        { x: 'F', y2: 2390, y1: 3800 },
        { x: 'G', y2: 3490, y1: 4300 },
      ],
    },
  },
};

exports.data = async (event) => {
  const { name } = event.pathParameters;

  return {
    statusCode: '200',
    body: JSON.stringify(dummyData[name]),
  };
};
