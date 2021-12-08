import express from 'express'
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'
import cookieParser from 'cookie-parser'
import authRouter from './routers/auth'
import apiRouter from './routers/api'

const app = express()

// Register middleware
app.use(awsServerlessExpressMiddleware.eventContext())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// register routes
app.use('/auth', authRouter)
app.use('/api', apiRouter)

export default app
