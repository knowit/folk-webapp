import express from 'express'
import { getReport } from '../../dataplattform/client'
import {
  createCustomerCardData,
  groupEmployeesByCustomer,
} from './customerAggregation'
import {
  hoursBilledPerCustomer,
  hoursBilledPerWeek,
} from './customerChartConversion'
import {
  BilledCustomerHours,
  EmployeeCustomersReport,
  EmployeeWithPrimaryCustomer,
} from './customerTypes'

const router = express.Router()

router.get('/hoursBilledPerCustomer', async (req, res, next) => {
  try {
    const data = await getReport<BilledCustomerHours[]>({
      accessToken: req.accessToken,
      reportName: 'perProject',
    })

    const aggregatedData = hoursBilledPerCustomer(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/hoursBilledPerWeek', async (req, res, next) => {
  try {
    const data = await getReport<BilledCustomerHours[]>({
      accessToken: req.accessToken,
      reportName: 'perProject',
    })

    const aggregatedData = hoursBilledPerWeek(data)
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
    const employeeCustomers = await getReport<EmployeeCustomersReport>({
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