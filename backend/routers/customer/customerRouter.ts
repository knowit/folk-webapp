import express from 'express'
import { getReport } from '../../dataplattform/client'
import {
  hoursBilledPerCustomerBar,
  hoursBilledPerWeekLine,
} from './customerChartConversion'
import {
  BilledCustomerHours,
  EmployeeWithPrimaryCustomer,
} from './customerTypes'

const router = express.Router()

router.get('/hoursBilledPerCustomer/bar', async (req, res, next) => {
  try {
    const data = await getReport<BilledCustomerHours[]>({
      accessToken: req.accessToken,
      reportName: 'perProject',
    })

    const aggregatedData = hoursBilledPerCustomerBar(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/hoursBilledPerWeek/line', async (req, res, next) => {
  try {
    const data = await getReport<BilledCustomerHours[]>({
      accessToken: req.accessToken,
      reportName: 'perProject',
    })

    const aggregatedData = hoursBilledPerWeekLine(data)
    res.send(aggregatedData)
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

router.get('/employeesByCustomer', async (req, res, next) => {
  try {
    const data = await getReport<EmployeeWithPrimaryCustomer[]>({
      accessToken: req.accessToken,
      reportName: 'employeesWithPrimaryCustomer',
    })

    res.send(data)
  } catch (error) {
    next(error)
  }
})

export { router as customerRouter }
