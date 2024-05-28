import { Issuer } from 'openid-client'
import express, { Request, Response, Router } from 'express'
import reporting from '../reporting'

const router: Router = express.Router()
const authEndpoint = process.env.OAUTH_URL
const clientId = process.env.CLIENT_ID

const dpIssuer = new Issuer({
  issuer: `${authEndpoint}/oauth2/`,
  authorization_endpoint: `${authEndpoint}/oauth2/authorize`,
  token_endpoint: `${authEndpoint}/oauth2/token`,
  userinfo_endpoint: `${authEndpoint}/oauth2/userInfo`,
  end_session_endpoint: `${authEndpoint}/logout`,
})

const getClient = (applicationUrl = '') =>
  new dpIssuer.Client({
    client_id: clientId,
    redirect_uris: [`${applicationUrl}`],
    response_types: ['code'],
  })

router.get('/userInfo', async function (req: Request, res: Response) {
  const accessToken: string = req.headers.authorization
    .split(/bearer/i)
    .pop()
    .trim()

  const userInfo: any = await getClient()
    .userinfo(accessToken)
    .catch((err) =>
      reporting({
        message: 'Auth failed userInfo on /userInfo',
        data: err,
      })
    )

  res.send({
    name: userInfo.name,
    email: userInfo.email,
  })
})

export default router
