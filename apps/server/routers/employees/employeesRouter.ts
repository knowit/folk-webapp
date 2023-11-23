import express, { Router } from 'express'
import { ParamError } from '../../middlewares/errorHandling'
import { employeeMotivationAndCompetence } from './employeeChartConversion'
import {
  aggregateEmployeeCompetence,
  aggregateEmployeeProfile,
  aggregateEmployeeTable,
  aggregateStructure,
} from './employeesAggregation'

import { getFileFromS3 } from '../../dataplattform/databricksS3Call'

const router: Router = express.Router()

router.get('/employeeTable', async (req, res, next) => {
  try {
    const basicEmployeeInformation = await getFileFromS3(
      'basicEmployeeInformation'
    )
    const employeeMotivationAndCompetence = await getFileFromS3(
      'employeeMotivationAndCompetence'
    )
    const jobRotationInformation = await getFileFromS3('jobRotationInformation')
    const employeeWorkStatus = await getFileFromS3('employeeWorkStatus')

    const basic_data = JSON.parse(basicEmployeeInformation)
    const motivation_data = JSON.parse(employeeMotivationAndCompetence)
    const rotation_data = JSON.parse(jobRotationInformation)
    const work_data = JSON.parse(employeeWorkStatus)

    const aggregatedData = await aggregateEmployeeTable(
      basic_data,
      motivation_data,
      rotation_data,
      work_data
    )
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

interface EmailParam {
  email?: string
}

router.get<unknown, unknown, unknown, EmailParam>(
  '/employeeCompetence',
  async (req, res, next) => {
    try {
      if (!req.query.email) {
        const err: ParamError = {
          status: 400,
          message: "Param 'email' is missing.",
        }

        throw err
      }

      const employeeProfileInformation = await getFileFromS3(
        'employeeProfileInformation'
      )
      const employeeSkills = await getFileFromS3('employeeSkills')
      const workExperience = await getFileFromS3('workExperience')
      const projectExperience = await getFileFromS3('projectExperience')
      const ubwExperience = await getFileFromS3('ubwExperience')

      let profile_data = JSON.parse(employeeProfileInformation)
      profile_data = profile_data.filter((i) => i.email == req.query.email)
      let skills_data = JSON.parse(employeeSkills)
      skills_data = skills_data.filter((i) => i.email == req.query.email)
      let work_data = JSON.parse(workExperience)
      work_data = work_data.filter((i) => i.email == req.query.email)
      let project_data = JSON.parse(projectExperience)
      project_data = project_data.filter((i) => i.email == req.query.email)
      let employee_data = JSON.parse(ubwExperience)
      employee_data = employee_data.filter((i) => i.email == req.query.email)
      const aggregatedData = aggregateEmployeeCompetence(
        profile_data,
        skills_data,
        work_data,
        project_data,
        employee_data
      )

      res.send(aggregatedData)
    } catch (error) {
      next(error)
    }
  }
)

router.get<unknown, unknown, unknown, EmailParam>(
  '/employeeMotivationAndCompetence',
  async (req, res, next) => {
    try {
      if (!req.query.email) {
        throw {
          status: 400,
          message: "Param 'email' is missing.",
        } as ParamError
      }

      const employeeMotivationAndComp = await getFileFromS3(
        'employeeMotivationAndCompetence'
      )
      let data = JSON.parse(employeeMotivationAndComp)
      data = data.filter((i) => i.email == req.query.email)
      const aggregatedData = employeeMotivationAndCompetence(data)
      res.send(aggregatedData)
    } catch (error) {
      next(error)
    }
  }
)

router.get<unknown, unknown, unknown, EmailParam>(
  '/employeeProfile',
  async (req, res, next) => {
    try {
      if (!req.query.email) {
        const err: ParamError = {
          status: 400,
          message: "Param 'email' is missing.",
        }

        throw err
      }

      const employeeProfileInformation = await getFileFromS3(
        'employeeProfileInformation'
      )
      const employeeSkills = await getFileFromS3('employeeSkills')
      const workExperience = await getFileFromS3('workExperience')
      const projectExperience = await getFileFromS3('projectExperience')
      const employeeCustomers = await getFileFromS3('employeeCustomers')

      let profile_data = JSON.parse(employeeProfileInformation)
      profile_data = profile_data.filter((i) => i.email == req.query.email)
      let skills_data = JSON.parse(employeeSkills)
      skills_data = skills_data.filter((i) => i.email == req.query.email)
      let work_data = JSON.parse(workExperience)
      work_data = work_data.filter((i) => i.email == req.query.email)
      let project_data = JSON.parse(projectExperience)
      project_data = project_data.filter((i) => i.email == req.query.email)
      let employee_data = JSON.parse(employeeCustomers)
      employee_data = employee_data.filter((i) => i.email == req.query.email)
      const aggregatedData = aggregateEmployeeProfile(
        profile_data,
        skills_data,
        work_data,
        project_data,
        employee_data
      )
      res.send(aggregatedData)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/employeeStructure', async (req, res, next) => {
  try {
    const employeeProfileInformation = await getFileFromS3(
      'employeeProfileInformation'
    )
    const data = JSON.parse(employeeProfileInformation)
    const aggregatedData = aggregateStructure(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

export { router as employeesRouter }
