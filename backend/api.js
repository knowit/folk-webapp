const { DataplattformClient } = require('./dataplattform/lib');
const dataRepository = require('./repository/data');

const apiFunction = (func) => {
  return async (event) => {
    const { headers, queryStringParameters = {}, pathParameters = {} } = event;

    const authorizationHeader =
      headers['Authorization'] || headers['authorization'];

    if (!authorizationHeader) {
      return { statusCode: '403' };
    }

    const accessToken = authorizationHeader
      .split(/bearer/i)
      .pop()
      .trim();

    return await func({
      queryStringParameters,
      pathParameters,
      headers,
      dataplattformClient: new DataplattformClient({ accessToken }),
      accessToken,
      event,
    });
  };
};

exports.data = apiFunction(async ({ pathParameters, ...params }) => {
  const { name } = pathParameters;

  const data = await dataRepository[name](params);

  return {
    statusCode: '200',
    body: Buffer.isBuffer(data) ? data : JSON.stringify(data),
  };
});

exports.pages = apiFunction(async () => {
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const pages = [
    'ansatte',
    'kunder',
    'kompetanse',
    'arbeidsmiljø',
    'rekruttering',
  ].map((page, i) => ({
    title: capitalize(page),
    path: `/${page}`,
    layout: 'normalLayout',
    dataPath: `/api/pages/${page}`,
    sortIndex: i,
  }));

  return {
    statusCode: '200',
    body: JSON.stringify({ pages }),
  };
});

const pageLayout = {
  ansatte: {
    content: [
      {
        dataUrl: '/api/data/inbound',
        title: 'På vei inn',
        component: 'DDChart',
        componentProps: {
          yLabels: ['y1', 'y2'],
        },
      },
      {
        dataUrl: '/api/data/outbound',
        title: 'På vei ut',
        component: 'DDChart',
        componentProps: {
          yLabels: ['y1', 'y2'],
        },
      },
      {
        dataUrl: '/api/data/experience',
        title: 'Erfaringsnivå',
        component: 'DDChart',
        componentProps: {
          yLabels: ['a', 'a', 'c'],
        },
      },
      {
        dataUrl: '/api/data/resourceType',
        title: 'Ressurstype',
        component: 'DDChart',
      },
      {
        dataUrl: '/api/data/projectStatus',
        title: 'Prosjektstatus',
        component: 'DDTable',
        fullSize: true,
        dataComponentProps: {
          // ...
        },
      },
    ],
  },
};

exports.pageData = apiFunction(async ({ pathParameters, accessToken }) => {
  const { page } = pathParameters;
  const pageLayoutData = pageLayout[page] || {};

  return {
    statusCode: '200',
    body: JSON.stringify(pageLayoutData),
  };
});
