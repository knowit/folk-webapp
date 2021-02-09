const fetch = require('node-fetch');

/*exports.query = async (
    {
      querySql,
      accessToken = null,
      apiUrl = process.env.API_URL || 'https://dev-api.dataplattform.knowit.no',
      format = 'json',
    }
  ) => {
    const queryUrl = `${apiUrl || this.apiUrl}/data/query`;
    return await fetch(queryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken || this.accessToken}`,
      },
      body: JSON.stringify({
        sql: querySql,
        format,
      }),
    });
  }*/

async function report(
    {
      reportName,
      filter = {},
      accessToken = null,
      apiUrl = process.env.API_URL || 'https://dev-api.dataplattform.knowit.no',
    }
  ) {
  //console.log("name ETC", reportName, filter, accessToken, apiUrl)
    const filters = Object.entries(filter).map(([key, value]) => {
      const val = typeof value === 'string' ? `'${value}'` : value;
      return `filter=${encodeURIComponent(key)}:${encodeURIComponent(val)}`;
    });
    const filterString = filters.length > 0 ? `?${filters.join('&')}` : '';

    const reportUrl = `${
      apiUrl || this.apiUrl
    }/data/query/report/${reportName}${filterString}`;

    console.log("REPORRT URL", reportUrl)

    const response = await fetch(reportUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status == 200) {
      return response
    } else {
      throw {
        message: response.status + " " + response.statusText,
        status: 1,
        type: "error"
      }
    }
  }
exports.reports = async (accessToken, reports, parameters) => {
  console.log("reports params", parameters)
  // Check and resolve parameters type
  if (typeof reports === 'function') {
    if (parameters) {
      reports = reports({parameters})
    } else {
      console.warn('Reports export should only be a function when using pre-processing (e.g. parameters)')
      reports = reports()
    }
  }

  // Iterate and fetch all reports
  const reportRequests = reports.map(reportElement => {
    const reportName = reportElement.reportName;
    const filter = reportElement.filter;

    return report({reportName, filter, accessToken})
      .catch(err => Promise.reject(err))
  })

  const request = await Promise.all(reportRequests)
    .catch(err => { throw err });

  // Handle fetched data
  const data = await Promise.all(
    request.map(
      req => req.json()
        .catch(
          err => {
            throw err
          }
        )
    )
  )

  return data
}