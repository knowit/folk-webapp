import cookieParser from 'cookie-parser'
import express from 'express'
import authRouter from './routers/authRouter'
import { errorHandler, NotFoundError } from './middlewares/errorHandling'
import { apiRouterV2 } from './routers/routers'

const app = express()

// Register Middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Register routers
app.use('/auth', authRouter)
app.use('/api/v2', apiRouterV2)
// app.use('/api', apiRouter)

// Error handling
app.use((req, res, next) => {
  const err: NotFoundError = {
    status: 404,
    message: `Endpoint was not found.`,
  }
  next(err)
})

app.use(errorHandler)

export default app
