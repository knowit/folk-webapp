import 'regenerator-runtime/runtime'
const { DataplattformClient } = require('../../dataplattform/lib');
import Data from '../../repository/data.js';

const accessToken = require('../token')['token']
const dataplatformClient = new DataplattformClient({ accessToken })

describe('competence() using promise', () => {
  it('should approve promise with competence data', () => {
    return Data.competence(
      {
        dataplattformClient: dataplatformClient
  	  }
  	).then(data => {
      expect(data).toBeDefined()

      expect(data).toEqual(
				expect.arrayContaining([
						expect.objectContaining({
							rowId: expect.any(String)
						})
		  	])
			)
    }).catch(error => {
    	console.log(error)
    })
  })
})

describe('competence() using promise', () => {
  it('should approve promise with competence data', () => {
    return Data.competence(
      {
        dataplattformClient: dataplatformClient
  	  }
  	).then(data => {
      expect(data).toBeDefined()

      expect(data).toEqual(
				expect.arrayContaining([
						expect.objectContaining({
							rowId: expect.any(String)
						})
		  	])
			)
    }).catch(error => {
    	console.log(error)
    })
  })
})