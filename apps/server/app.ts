import cookieParser from 'cookie-parser'
import express, { Express } from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'
import authRouter from './routers/authRouter'
import { errorHandler, NotFoundError } from './middlewares/errorHandling'
import { apiRouterV2 } from './routers/routers'
import { llmSocketHandler } from './routers/llm/llmSocketHandler'

const app: Express = express()

// Middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS Configuration
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  })
)

// HTTP Routes
app.use('/auth', authRouter)
app.use('/api/v2', apiRouterV2)

// HTTP Test Route
app.get('/', (req, res) => {
  res.send('Hello from the Express server!')
})

// Create HTTP server
const httpServer = http.createServer(app)

// Attach Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST'],
  },
})

// Register the LLM socket handler
llmSocketHandler(io)

// Error Handling Middleware
app.use((req, res, next) => {
  const err: NotFoundError = {
    status: 404,
    message: `Endpoint was not found.`,
  }
  next(err)
})
app.use(errorHandler)

// Start the server
const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export default app
