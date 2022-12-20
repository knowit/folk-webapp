import express, { Router } from 'express'
import { getReport } from '../../dataplattform/client'
import { NotFoundError, ParamError } from '../../middlewares/errorHandling'
import { employeeMotivationAndCompetence } from './employeeChartConversion'
import {
  aggregateEmployeeCompetence,
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

const router: Router = express.Router()

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

      const employeeProfileInformationPromise =
        getReport<EmployeeProfileInformationReport>({
          accessToken: req.accessToken,
          reportName: 'employeeProfileInformation',
          queryParams: {
            email: req.query.email,
          },
        })

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

      const projectExperiencePromise = getReport<ProjectExperienceReport>({
        accessToken: req.accessToken,
        reportName: 'projectExperience',
        queryParams: {
          email: req.query.email,
        },
      })

      const [
        employeeProfileInformation,
        employeeSkills,
        workExperience,
        projectExperience,
      ] = await Promise.all([
        employeeProfileInformationPromise,
        employeeSkillsPromise,
        workExperiencePromise,
        projectExperiencePromise,
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

      const aggregatedData = aggregateEmployeeCompetence(
        employeeProfileInformation,
        employeeSkills,
        workExperience,
        projectExperience
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

      const data = await getReport<EmployeeMotivationAndCompetenceReport>({
        accessToken: req.accessToken,
        reportName: 'employeeMotivationAndCompetence',
        queryParams: {
          email: req.query.email,
        },
      })

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

      const employeeProfileInformationPromise =
        getReport<EmployeeProfileInformationReport>({
          accessToken: req.accessToken,
          reportName: 'employeeProfileInformation',
          queryParams: {
            email: req.query.email,
          },
        })

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

      const projectExperiencePromise = getReport<ProjectExperienceReport>({
        accessToken: req.accessToken,
        reportName: 'projectExperience',
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
        employeeProfileInformation,
        employeeSkills,
        workExperience,
        projectExperience,
        employeeCustomers,
      ] = await Promise.all([
        employeeProfileInformationPromise,
        employeeSkillsPromise,
        workExperiencePromise,
        projectExperiencePromise,
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
        employeeProfileInformation,
        employeeSkills,
        workExperience,
        projectExperience,
        employeeCustomers
      )

      res.send(aggregatedData)
    } catch (error) {
      next(error)
    }
  }
)

export { router as employeesRouter }
