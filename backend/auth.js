const { Issuer } = require('openid-client')

const apiUrl = process.env.API_URL
const applicationUrl = process.env.HOST_URL
const authEndpoint = process.env.OAUTH_URL
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET


const dpIssuer = new Issuer({
    authorization_endpoint: `${authEndpoint}/oauth2/authorize`,
    token_endpoint: `${authEndpoint}/oauth2/token`,
    userinfo_endpoint: `${authEndpoint}/oauth2/userInfo`,
})

const dpClient = new dpIssuer.Client({
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uris: [`${apiUrl}/callback`],
    response_types: ['code'],
})


exports.login = async () => {    
    return {
        statusCode: '302',
        headers: {
            Location: dpClient.authorizationUrl({
                scope: 'email openid'
            })
        }
    }
}


exports.callback = async (event) => {
    const tokens = await dpClient.oauthCallback(`${apiUrl}/callback`, event.queryStringParameters)

    return {
        statusCode: '302',
        headers: {
            Location: applicationUrl,
            'Set-Cookie': `accessToken=${tokens.access_token}; Lax`
        }
    }
}

