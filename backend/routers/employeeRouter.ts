import express from 'express'

export const employeeRouter = express.Router()

employeeRouter.get('/ping', (req, res) => res.send({ response: 'pong!' }))
