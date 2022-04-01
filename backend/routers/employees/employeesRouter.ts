import express from 'express'
import { getReport } from '../../dataplattform/client'
import { NotFoundError, ParamError } from '../errorHandling'
import {
  employeeMotivationAndCompetenceBar,
  employeeMotivationAndCompetenceRadar,
} from './employeeChartConversion'
import {
  aggregateEmployeeExperience,
  aggregateEmployeeProfile,
  aggregateEmployeeTable,
} from './employeesAggregation'
import {
  BasicEmployeeInformationReport,
  ProjectExperienceReport,
  EmployeeProfileInformationReport,
  EmployeeMotivationAndCompetenceReport,
  EmployeeSkillsReport,
  EmployeeWorkStatusReport,
  JobRotationInformationReport,
  WorkExperienceReport,
} from './employeesTypes'
import { EmployeeCustomersReport } from '../customer/customerTypes'

const router = express.Router()

router.get('/employeeTable', async (req, res, next) => {
  try {
    const basicEmployeeInformationPromise =
      getReport<BasicEmployeeInformationReport>({
        accessToken: req.accessToken,
        reportName: 'basicEmployeeInformation',
      })

    const employeeMotivationAndCompetencePromise =
      getReport<EmployeeMotivationAndCompetenceReport>({
        accessToken: req.accessToken,
        reportName: 'employeeMotivationAndCompetence',
      })

    const jobRotationInformationPromise =
      getReport<JobRotationInformationReport>({
        accessToken: req.accessToken,
        reportName: 'jobRotationInformation',
      })

    const employeeWorkStatusPromise = getReport<EmployeeWorkStatusReport>({
      accessToken: req.accessToken,
      reportName: 'employeeWorkStatus',
    })

    const [
      basicEmployeeInformation,
      employeeMotivationAndCompetence,
      jobRotationInformation,
      employeeWorkStatus,
    ] = await Promise.all([
      basicEmployeeInformationPromise,
      employeeMotivationAndCompetencePromise,
      jobRotationInformationPromise,
      employeeWorkStatusPromise,
    ])

    const aggregatedData = aggregateEmployeeTable(
      basicEmployeeInformation,
      employeeMotivationAndCompetence,
      jobRotationInformation,
      employeeWorkStatus
    )

    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

interface UserIdParam {
  user_id?: string
}

router.get<unknown, unknown, unknown, UserIdParam>(
  '/employeeExperience',
  async (req, res, next) => {
    try {
      if (!req.query.user_id) {
        const err: ParamError = {
          status: 400,
          message: "Param 'user_id' is missing.",
        }

        throw err
      }

      const data = await getReport<ProjectExperienceReport>({
        accessToken: req.accessToken,
        reportName: 'projectExperience',
        queryParams: {
          user_id: req.query.user_id,
        },
      })

      const aggregatedData = aggregateEmployeeExperience(data)
      res.send(aggregatedData)
    } catch (error) {
      next(error)
    }
  }
)

interface EmailParam {
  email?: string
}

router.get<unknown, unknown, unknown, EmailParam>(
  '/employeeMotivationAndCompetence/bar',
  async (req, res, next) => {
    try {
      if (!req.query.email) {
        throw {
          status: 400,
          message: "Param 'email' is missing.",
        } as ParamError
      }

      const data = await getReport<EmployeeMotivationAndCompetenceReport>({
        accessToken: req.accessToken,
        reportName: 'employeeMotivationAndCompetence',
        queryParams: {
          email: req.query.email,
        },
      })

      const aggregatedData = employeeMotivationAndCompetenceBar(data)

      res.send(aggregatedData)
    } catch (error) {
      next(error)
    }
  }
)

router.get<unknown, unknown, unknown, EmailParam>(
  '/employeeMotivationAndCompetence/radar',
  async (req, res, next) => {
    try {
      if (!req.query.email) {
        throw {
          status: 400,
          message: "Param 'email' is missing.",
        } as ParamError
      }

      const data = await getReport<EmployeeMotivationAndCompetenceReport>({
        accessToken: req.accessToken,
        reportName: 'employeeMotivationAndCompetence',
        queryParams: {
          email: req.query.email,
        },
      })

      const aggregatedData = employeeMotivationAndCompetenceRadar(data)

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

      const employeeSkillsPromise = getReport<EmployeeSkillsReport>({
        accessToken: req.accessToken,
        reportName: 'employeeSkills',
        queryParams: {
          email: req.query.email,
        },
      })

      const workExperiencePromise = getReport<WorkExperienceReport>({
        accessToken: req.accessToken,
        reportName: 'workExperience',
        queryParams: {
          email: req.query.email,
        },
      })

      const employeeProfileInformationPromise =
        getReport<EmployeeProfileInformationReport>({
          accessToken: req.accessToken,
          reportName: 'employeeProfileInformation',
          queryParams: {
            email: req.query.email,
          },
        })

      const employeeCustomersPromise = getReport<EmployeeCustomersReport>({
        accessToken: req.accessToken,
        reportName: 'employeeCustomers',
        queryParams: {
          email: req.query.email,
        },
      })

      const [
        employeeSkills,
        workExperience,
        employeeProfileInformation,
        employeeCustomers,
      ] = await Promise.all([
        employeeSkillsPromise,
        workExperiencePromise,
        employeeProfileInformationPromise,
        employeeCustomersPromise,
      ])

      if (
        !employeeProfileInformation ||
        employeeProfileInformation.length === 0
      ) {
        const err: NotFoundError = {
          status: 404,
          message: "Employee with email '" + req.query.email + "' not found.",
        }

        throw err
      }

      const aggregatedData = aggregateEmployeeProfile(
        employeeSkills,
        workExperience,
        employeeProfileInformation,
        employeeCustomers
      )

      res.send(aggregatedData)
    } catch (error) {
      next(error)
    }
  }
)

export { router as employeesRouter }
