const express = require('express')
const { Issuer } = require('openid-client')
const URL = require('url')
const reporting = require('../reporting')
const router = express.Router()

const authEndpoint = process.env.OAUTH_URL
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

const dpIssuer = new Issuer({
  authorization_endpoint: `${authEndpoint}/oauth2/authorize`,
  token_endpoint: `${authEndpoint}/oauth2/token`,
  userinfo_endpoint: `${authEndpoint}/oauth2/userInfo`,
})

const getClient = (applicationUrl = '') =>
  new dpIssuer.Client({
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

router.get('/login', function (req, res) {
  const { referer } = req.headers
  const authorizationUrl = getClient(getOrigin(referer)).authorizationUrl({
    scope: 'email openid profile',
  })

  res.cookie('authReferer', referer, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  })
  res.redirect(302, authorizationUrl)
})

router.get('/callback', async function (req, res) {
  const { authReferer: referer } = req.cookies

  const origin = getOrigin(referer)

  const tokens = await getClient(origin).oauthCallback(
    `${origin}/auth/callback`,
    req.query
  )
  const cookieSettings = {
    sameSite: true,
    secure: true,
    path: '/',
  }

  res.cookie('accessToken', tokens.access_token, {
    httpOnly: false,
    maxAge: tokens.expires_in * 1000,
    ...cookieSettings,
  })
  res.cookie('refreshToken', tokens.refresh_token, {
    httpOnly: false,
    ...cookieSettings,
  })
  res.clearCookie('authReferer')
  res.redirect(302, getPath(referer))
})

router.get('/userInfo', async function (req, res) {
  const accessToken = req.headers.authorization
    .split(/bearer/i)
    .pop()
    .trim()

  const userInfo = await getClient().userinfo(accessToken)
    .catch(err =>
      reporting({
        message: 'Auth failed userInfo on /userInfo',
        data: err
      })
    )
  res.send({
    name: [userInfo.given_name || '', userInfo.family_name || ''].join(' '),
    email: userInfo.email,
    picture: userInfo.picture,
  })
})

router.post('/refresh', async function (req, res) {
  const { refreshToken = null } = req.body

  if (!refreshToken) {
    return res.statusCode(403)
  }

  const tokens = await getClient().grant({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }).catch(err =>
    reporting({
      message: 'Auth failed grant on /refresh',
      data: err
    })
  )

  res.send({
    accessToken: tokens.access_token,
    expiration: tokens.expires_in,
    sameSite: true,
    secure: true
  })
})

module.exports = router