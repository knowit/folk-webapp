import express from 'express'
import dataplattform from '../middlewares/dataplattform'
import { competenceRouter } from './competence/competenceRouter'
import { employeesRouter } from './employees/employeesRouter'
import handler from './handler'

const apiRouter = express.Router()

apiRouter.use(dataplattform())

apiRouter.get('/data/:source', async (req, res) =>
  handler(req)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(err.status || 500)
      res.send(err.message)
    })
)
apiRouter.get('/privacyPolicy', async (req, res) => {
  const privacypol = `${process.env.STORAGE_URL}/${process.env.PRIVACY_POLICY_KEY}`
  res.send({ urlname: privacypol })
})

// v2 of /api
const apiRouterV2 = express.Router()

apiRouterV2.use(dataplattform())
apiRouterV2.use('/competence', competenceRouter)
apiRouterV2.use('/employees', employeesRouter)

export { apiRouter, apiRouterV2 }
