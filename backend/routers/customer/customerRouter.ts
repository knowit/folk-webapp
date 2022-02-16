import express from 'express'

const router = express.Router()

router.get('/hoursBilledPerCustomer/bar', async (req, res, next) => {
  try {
    res.send('BarChart for hoursBilledPerCustomer')
  } catch (error) {
    next(error)
  }
})

router.get('/hoursBilledPerWeek/line', async (req, res, next) => {
  try {
    res.send('LineChart for hoursBilledPerWeek')
  } catch (error) {
    next(error)
  }
})

router.get('/customerCards', async (req, res, next) => {
  try {
    res.send('Customer cards')
  } catch (error) {
    next(error)
  }
})
export { router as customerRouter }
