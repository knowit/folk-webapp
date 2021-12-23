import express from 'express'

export const competenceRouter = express.Router()

competenceRouter.get('/ping', (req, res) => res.send({ response: 'pong!' }))
