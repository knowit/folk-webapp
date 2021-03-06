const { reports } = require('../dataplattform/lib')
const aggregation = require('../repository/data')
const reporting = require('../reporting')

module.exports = async (req) => {
  // Request data
  const endpoint = req.params.source
  const parameters = req.query
  const accessToken = req.accessToken

  // Reporting
  reporting({
    message: 'Handler received request: ',
    data: { endpoint, parameters },
    type: 'info'
  })

  // Check endpoint's handler and reports
  const endpointHandler = aggregation[endpoint]
  const endpointReports = aggregation[endpoint + 'Reports']

  if (!endpointHandler) {
    throw reporting({
      status: 404,
      message: 'No endpoint with name'
    })
  } else if (!endpointReports) {
    // Return endpoint without making any requests
    reporting({
      status: 202,
      message: 'No reports given for endpoint',
      type: 'warning'
    })

    return await endpointHandler()
  }

  // Get endpoint's reports data
  const data = await reports(accessToken, endpointReports, parameters)
    .catch(err => {
      throw err
    })

  // Run data aggregation for endpoint
  const result = await endpointHandler({data, parameters})
    .catch(err => {
      throw reporting({
        message: err,
        external: false
      })
    })

  return result
}