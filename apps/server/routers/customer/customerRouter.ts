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
