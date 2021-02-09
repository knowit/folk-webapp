import 'regenerator-runtime/runtime'
const { handler } = require('../../routers/handler.js');

describe('Check', function() {
  it('test', async function() {
  	const req = {
  		params: {
  			source: "testing"
  		},
  		query: {},
  		accessToken: "testToken"
  	}

  	const response = await handler(req)
  	console.log("test response", response)

  	expect(response).toBeDefined()
    expect(response).toEqual(
		expect.objectContaining({
			data: null,
			message: expect.any(String)
		})
	)
  });
});



describe('Check', function() {
  it('test', async function() {
  	const req = {
  		params: {
  			source: "competenceMapping"
  		},
  		query: {},
  		accessToken: "testToken"
  	}

  	const response = await handler(req)
  	console.log("test response", response)

  	expect(response).toBeDefined()
    expect(response).toEqual(
		expect.objectContaining({
			data: null,
			message: expect.any(String)
		})
	)
  });
});
