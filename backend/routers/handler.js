const { reports } = require('../dataplattform/lib');
const aggregation = require('../repository/data')

const responses = {
  noEndpoint: {
  	data: null,
  	message: 'No endpoint with name'
  },
  noReports: {
  	data: null,
  	message: 'No reports given for endpoint'
  }
}

// Handleralways returns response value 
exports.handler = async (req) => {
  //console.log("handler", req)
  // Request data
  const endpoint = req.params.source
  const parameters = req.query
  const accessToken = req.accessToken

  //console.log("the end is", endpoint, parameters)

  // Check endpoint's handler and reports
  const endpointHandler = aggregation[endpoint]
  const endpointReports = aggregation[endpoint + 'Reports']
  if (!endpointHandler) {
    console.log("endpoint err", responses.noEndpoint)
    return responses.noEndpoint
  } else if (!endpointReports) {
    console.log("endpoint warn", responses.noReports)
    return await endpointHandler() //responses.noReports
  }

  // Get endpoint's reports data
  var error
  const data = await reports(accessToken, endpointReports, parameters)
  	.catch(err => {
      error = err
      console.log("data err", error)
    })
  if (error)
  	return error

  // Run data aggregation for endpoint
  const result = await endpointHandler({data, parameters})
  	.catch(err => {
      error = err
      console.log("result err", error)
    })
  if (error)
  	return error

  return result
}