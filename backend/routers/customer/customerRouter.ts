import express from 'express'
import { getReport } from '../../dataplattform/client'
import {
  hoursBilledPerCustomerBar,
  hoursBilledPerWeekLine,
} from './customerChartConversion'
import {
  BilledCustomerHours,
  EmployeeWithPrimaryCustomer,
  EmployeeCustomers,
} from './customerTypes'
import {
  groupEmployeesByCustomer,
  createCustomerCardData,
} from './customerAggregation'

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
    const perProject = await getReport<BilledCustomerHours[]>({
      accessToken: req.accessToken,
      reportName: 'perProject',
    })
    const employeeCustomers = await getReport<EmployeeCustomers[]>({
      accessToken: req.accessToken,
      reportName: 'employeeCustomers',
    })
    const aggregatedData = createCustomerCardData(perProject, employeeCustomers)
    res.send(aggregatedData)
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

    const aggregatedData = groupEmployeesByCustomer(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

export { router as customerRouter }
