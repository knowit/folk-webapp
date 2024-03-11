import express, { Router } from 'express'
import {
  createCustomerCardData,
  groupEmployeesByCustomer,
} from './customerAggregation'
import {
  hoursBilledPerCustomer,
  hoursBilledPerWeek,
} from './customerChartConversion'
import { getFileFromS3 } from '../../dataplattform/databricksS3Call'

const router: Router = express.Router()

router.get('/hoursBilledPerCustomer', async (req, res, next) => {
  try {
    const perProject = await getFileFromS3('perProject')
    const data = JSON.parse(perProject)
    const aggregatedData = hoursBilledPerCustomer(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/hoursBilledPerWeek', async (req, res, next) => {
  try {
    const perProject = await getFileFromS3('perProject')
    const data = JSON.parse(perProject)
    const aggregatedData = hoursBilledPerWeek(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/customerCards', async (req, res, next) => {
  try {
    const perProject = await getFileFromS3('perProject')
    const employeeCustomers = await getFileFromS3('employeeCustomers')
    const accountManager = await getFileFromS3('accountManager')
    const project_data = JSON.parse(perProject)
    const customer_data = JSON.parse(employeeCustomers)
    const accountManagerTable = JSON.parse(accountManager)

    const aggregatedData = createCustomerCardData(
      project_data,
      customer_data,
      accountManagerTable
    )
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/employeesByCustomer', async (req, res, next) => {
  try {
    const result = await getFileFromS3('employeesWithPrimaryCustomer')
    const data = JSON.parse(result)
    const aggregatedData = await groupEmployeesByCustomer(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

export { router as customerRouter }
