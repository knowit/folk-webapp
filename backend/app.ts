import express from 'express'
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'
import cookieParser from 'cookie-parser'
import authRouter from './routers/authRouter'
import { apiRouter, apiRouterV2 } from './routers/routers'

const app = express()

// Register middleware
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Register routers
app.use('/auth', authRouter)
app.use('/api/v2/', apiRouterV2)
app.use('/api', apiRouter)

export default app
