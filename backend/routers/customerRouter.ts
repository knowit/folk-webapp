import express from 'express'

export const customerRouter = express.Router()

customerRouter.get('/ping', (req, res) => res.send({ response: 'pong!' }))
