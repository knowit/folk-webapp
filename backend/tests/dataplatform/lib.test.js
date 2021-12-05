import 'regenerator-runtime/runtime'
const { DataplattformClient } = require('../../dataplattform/lib')

const accessToken = require('../token')['token']
const dataplatformClient = new DataplattformClient({ accessToken })

describe('Check dataplatformClient integrity', () => {
  it('should approve promise with competence data', () => {
    expect(dataplatformClient.apiUrl).toEqual(
      'https://dev-api.dataplattform.knowit.no'
    )
    expect(dataplatformClient.accessToken).toEqual(accessToken)
  })
})

describe('Perform request with dataplatformClient', () => {
  it('should return fetch promise with valid data', () => {
    // Fetch report
    const reportName = 'competence'

    return dataplatformClient
      .report({ reportName })
      .then(
        (response) => {
          // Check status code
          expect(response.status).toEqual(200)

          return response.json()
        },
        (error) => {
          console.log('error', error)
        }
      )
      .then((data) => {
        // Check data
        expect(Array.isArray(data)).toBeTruthy()
      })
  })
})
