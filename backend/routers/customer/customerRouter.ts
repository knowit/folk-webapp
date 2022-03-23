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
import {
  groupEmployeesByCustomer,
  createCustomerCardData,
} from './customerAggregation'
import { EmployeeInformation } from '../employees/employeesTypes'

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
    const employeeInformation = await getReport<EmployeeInformation[]>({
      accessToken: req.accessToken,
      reportName: 'employeeInformation',
    })
    const aggregatedData = createCustomerCardData(
      perProject,
      employeeInformation
    )
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
