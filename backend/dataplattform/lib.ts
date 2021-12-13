import fetch from 'node-fetch'
import reporting from '../reporting'

type ReportParams = {
  reportName: string
  filter: { email?: string; user_id?: string }
  accessToken: string | null
  apiUrl?: string
}

async function report({
  reportName,
  filter = {},
  accessToken = null,
  apiUrl = process.env.API_URL || 'https://api.new-dev.dataplattform.knowit.no',
}: ReportParams) {
  // Reporting
  reporting({
    message: 'Report received instruction: ',
    data: { reportName, filter, hasToken: accessToken ? true : false },
    type: 'info',
  })

  const filters = Object.entries(filter).map(([key, value]) => {
    const val = typeof value === 'string' ? `'${value}'` : value
    return `filter=${encodeURIComponent(key)}:${encodeURIComponent(val)}`
  })

  const filterString = filters.length > 0 ? `?${filters.join('&')}` : ''

  const reportUrl = `${
    apiUrl || this.apiUrl
  }/data/query/report/${reportName}${filterString}`

  // Reporting
  reporting({
    message: 'Report processed request metadata: ',
    data: { filterString, reportUrl },
    type: 'info',
  })

  console.log(`API call at: ${reportUrl}`)

  const response: { status: number; statusText: string } = await fetch(
    reportUrl,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  console.log(
    `Fetched data for ${reportName}: ${JSON.stringify(response, null, 2)}`
  )

  // Reporting
  reporting({
    message: 'Report request responded: ',
    data: {
      reportName,
      status: response.status,
      response: response.statusText,
    },
    type: 'info',
  })

  if (response.status == 200) {
    return response
  } else {
    throw reporting({
      status: response.status,
      message: response.statusText,
      external: response.status >= 500 && response.status < 600,
      data: { reportName },
    })
  }
}

async function reports(
  accessToken: string,
  reports: any,
  parameters: { email?: string; user_id?: string }
) {
  // Reporting
  reporting({
    message: 'Reports received instruction for reports: ',
    data: { accessToken, reports, parameters },
    type: 'info',
  })

  // Check and resolve parameters type
  if (typeof reports === 'function') {
    if (parameters) {
      reports = reports({ parameters })
    } else {
      console.warn(
        'Reports export should only be a function when using pre-processing (e.g. parameters)'
      )
      reports = reports()
    }
  }

  // Iterate and fetch all reports
  const reportRequests = reports.map(
    async (reportElement: {
      reportName: string
      filter?: { email?: string; user_id?: string }
    }) => {
      const reportName = reportElement.reportName
      const filter = reportElement.filter

      try {
        return await report({ reportName, filter, accessToken })
      } catch (err) {
        return await Promise.reject(err)
      }
    }
  )

  const request = await Promise.all(reportRequests).catch((err) => {
    throw err
  })

  // Reporting
  reporting({
    message: 'Reports have fetched: ',
    data: reports,
    type: 'info',
  })

  // Handle fetched data
  const data = await Promise.all(
    request.map((req: any) =>
      req.json().catch((err: string) => {
        throw reporting({
          message: err,
          external: false,
        })
      })
    )
  )

  // Return single object for single report queries
  if (data.length == 1) return data[0]
  else if (data.length == 0)
    reporting({
      message: 'Server response is empty for reports: ',
      data: { reports },
      type: 'warning',
    })

  return data
}

export default reports
