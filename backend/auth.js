const { Issuer } = require('openid-client')
const cookie = require('cookie')
const URL = require('url')


const authEndpoint = process.env.OAUTH_URL
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET


const dpIssuer = new Issuer({
    authorization_endpoint: `${authEndpoint}/oauth2/authorize`,
    token_endpoint: `${authEndpoint}/oauth2/token`,
    userinfo_endpoint: `${authEndpoint}/oauth2/userInfo`,
})


const getClient = (applicationUrl) => new dpIssuer.Client({
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uris: [`${applicationUrl}/auth/callback`],
    response_types: ['code'],
})


const getOrigin = (url) => {
    const parsed = URL.parse(url)
    return `${parsed.protocol}//${parsed.host}`
}
const getPath = (url) => URL.parse(url).path

exports.login = async (event) => {    
    const { headers } = event
    const referer = headers['referer']
    
    return {
        statusCode: '302',
        headers: {
            Location: getClient(getOrigin(referer)).authorizationUrl({
                scope: 'email openid'
            }),
            'Cache-Control': 'no-cache="Set-Cookie"'
        },
        multiValueHeaders: {
            'Set-Cookie': [
                cookie.serialize('authReferer', referer, { 
                    path: '/', 
                    httpOnly: true, 
                    secure: true, 
                    sameSite: 'lax' 
                })
            ]
        }
    }
}


exports.callback = async (event) => {
    const { headers } = event
    const referer = cookie.parse(headers['cookie']).authReferer
    const origin = getOrigin(referer)

    const tokens = await getClient(origin).oauthCallback(`${origin}/auth/callback`, event.queryStringParameters)

    return {
        statusCode: '302',
        headers: {
            Location: getPath(referer),
            'Cache-Control': 'no-cache="Set-Cookie"'
        },
        multiValueHeaders: {
            'Set-Cookie': [
                cookie.serialize('accessToken', tokens.access_token, {
                    maxAge: tokens.expires_in,
                    httpOnly: false, 
                    sameSite: true,
                    secure: true,
                    path: '/'
                }),
                // cookie.serialize('refreshToken', tokens.refresh_token, {
                //     maxAge: tokens.expires_in,
                //     httpOnly: false, 
                //     sameSite: true,
                //     secure: true,
                //     path: '/'
                // })
            ]
        }
    }
}

