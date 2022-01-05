import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'
import cookieParser from 'cookie-parser'
import express from 'express'
import authRouter from './routers/authRouter'
import { errorHandler, FourOhFourError } from './routers/errorHandling'
import { apiRouter, apiRouterV2 } from './routers/routers'

const app = express()

// Register middleware
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Register routers
app.use('/auth', authRouter)
app.use('/api/v2', apiRouterV2)
app.use('/api', apiRouter)

// Error handling
app.use((req, res, next) => {
  const err: FourOhFourError = {
    status: 404,
    message: `Endpoint was not found.`,
  }

  next(err)
})

app.use(errorHandler)

export default app
