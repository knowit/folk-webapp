import express, { Router } from 'express'
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

import { getFileFromS3 } from '../../dataplattform/databricksS3Call'

const router: Router = express.Router()

router.get('/hoursBilledPerCustomer', async (req, res, next) => {
  try {
    // const data = await getReport<BilledCustomerHours[]>({
    //   accessToken: req.accessToken,
    //   reportName: 'perProject',
    // })
    // const aggregatedData = hoursBilledPerCustomer(data)
    // res.send(aggregatedData)
    getFileFromS3('perProject').then((result) => {
      const data = JSON.parse(result)
      const aggregatedData = hoursBilledPerCustomer(data)
      res.send(aggregatedData)
    })
  } catch (error) {
    next(error)
  }
})

router.get('/hoursBilledPerWeek', async (req, res, next) => {
  try {
    // const data = await getReport<BilledCustomerHours[]>({
    //   accessToken: req.accessToken,
    //   reportName: 'perProject',
    // })

    // const aggregatedData = hoursBilledPerWeek(data)
    // res.send(aggregatedData)
    getFileFromS3('perProject').then((result) => {
      const data = JSON.parse(result)
      const aggregatedData = hoursBilledPerWeek(data)
      res.send(aggregatedData)
    })
  } catch (error) {
    next(error)
  }
})

router.get('/customerCards', async (req, res, next) => {
  try {
    // const perProject = await getReport<BilledCustomerHours[]>({
    //   accessToken: req.accessToken,
    //   reportName: 'perProject',
    // })
    // const employeeCustomers = await getReport<EmployeeCustomersReport>({
    //   accessToken: req.accessToken,
    //   reportName: 'employeeCustomers',
    // })
    // const aggregatedData = createCustomerCardData(perProject, employeeCustomers)
    // res.send(aggregatedData)
    getFileFromS3('perProject').then((project) => {
      getFileFromS3('employeeCustomers').then((customer) => {
        const project_data = JSON.parse(project)
        const customer_data = JSON.parse(customer)
        const aggregatedData = createCustomerCardData(
          project_data,
          customer_data
        )
        res.send(aggregatedData)
      })
    })
  } catch (error) {
    next(error)
  }
})

router.get('/employeesByCustomer', async (req, res, next) => {
  try {
    // const data = await getReport<EmployeeWithPrimaryCustomer[]>({
    //   accessToken: req.accessToken,
    //   reportName: 'employeesWithPrimaryCustomer',
    // })

    // const aggregatedData = groupEmployeesByCustomer(data)
    // res.send(aggregatedData)
    getFileFromS3('employeesWithPrimaryCustomer').then((result) => {
      const data = JSON.parse(result)
      const aggregatedData = groupEmployeesByCustomer(data)
      res.send(aggregatedData)
    })
  } catch (error) {
    next(error)
  }
})

export { router as customerRouter }
