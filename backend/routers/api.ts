import express from 'express'
import dataplattform from '../middlewares/dataplattform'
import handler from './handler'

const router = express.Router()

router.use(dataplattform())
router.get('/data/:source', async (req: express.Request, res: express.Response) =>
  handler(req)
    .then(data => res.send(data))
    .catch(err => {
      res.status(err.status || 500)
      res.send(err.message)
    })
)

router.get('/privacyPolicy', async (req, res) => {
  const privacypol = `${process.env.STORAGE_URL}/${process.env.PRIVACY_POLICY_KEY}`
  res.send({urlname: privacypol})
}
)

export default router