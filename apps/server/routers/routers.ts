import express, { Router } from 'express'
import dataplattform from '../middlewares/dataplattform'
import { competenceRouter } from './competence/competenceRouter'
import { customerRouter } from './customer/customerRouter'
import { databaseRouter } from './databaseRouter'
import { employeesRouter } from './employees/employeesRouter'
// import { llmRouter } from './llm/llmRouter'

// v2 of API
const apiRouterV2: Router = express.Router()
apiRouterV2.use(dataplattform())

// Could be placed elsewhere
apiRouterV2.get('/privacyPolicy', async (req, res) => {
  const privacypol = `${process.env.STORAGE_URL}/${process.env.PRIVACY_POLICY_KEY}`
  res.send({ urlname: privacypol })
})

// ROUTES
apiRouterV2.use('/competence', competenceRouter)
apiRouterV2.use('/employees', employeesRouter)
apiRouterV2.use('/customer', customerRouter)
apiRouterV2.use('/database', databaseRouter)
// apiRouterV2.use('/llm', llmRouter) (uncomment if generateReply will be used instead of generateStream)

export { apiRouterV2 }
