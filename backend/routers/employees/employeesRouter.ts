import express from 'express'
import { getReport } from '../../dataplattform/client'
import { ParamError } from '../errorHandling'
import {
  aggregateEmployeeProfile,
  aggregateEmployeeExperience,
  aggregateEmployeeRadar,
  aggregateEmployeeTable,
} from './employeesAggregation'
import {
  CompetenceAreasResponse,
  EmployeeExperience,
  EmployeeInformation,
  EmployeeSkills,
} from './employeesTypes'

const router = express.Router()

router.get('/employeeTable', async (req, res, next) => {
  try {
    const employeeInformationPromise = getReport<any[]>({
      accessToken: req.accessToken,
      reportName: 'employeeInformation',
    })

    const employeeMotivationAndCompetencePromise = getReport<any[]>({
      accessToken: req.accessToken,
      reportName: 'employeeMotivationAndCompetence',
    })

    const jobRotationInformationPromise = getReport<any[]>({
      accessToken: req.accessToken,
      reportName: 'jobRotationInformation',
    })

    const [
      employeeInformation,
      employeeMotivationAndCompetence,
      jobRotationInformation,
    ] = await Promise.all([
      employeeInformationPromise,
      employeeMotivationAndCompetencePromise,
      jobRotationInformationPromise,
    ])

    const aggregatedData = aggregateEmployeeTable(
      employeeInformation,
      employeeMotivationAndCompetence,
      jobRotationInformation
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

      const data = await getReport<EmployeeExperience[]>({
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
  '/employeeRadar/bar',
  async (req, res, next) => {
    try {
      res.send('BarChart for employeeRadar')
    } catch (error) {
      next(error)
    }
  }
)

router.get<unknown, unknown, unknown, EmailParam>(
  '/employeeRadar/radar',
  async (req, res, next) => {
    try {
      res.send('RadarChart for employeeRadar')
    } catch (error) {
      next(error)
    }
  }
)

// To be deleted
router.get<unknown, unknown, unknown, EmailParam>(
  '/employeeRadar',
  async (req, res, next) => {
    try {
      if (!req.query.email) {
        const err: ParamError = {
          status: 400,
          message: "Param 'email' is missing.",
        }

        throw err
      }

      const data = await getReport<CompetenceAreasResponse[]>({
        accessToken: req.accessToken,
        reportName: 'employeeMotivationAndCompetence',
        queryParams: {
          email: req.query.email,
        },
      })

      const aggregatedData = aggregateEmployeeRadar(data)
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

      const employeeSkillsPromise = getReport<EmployeeSkills[]>({
        accessToken: req.accessToken,
        reportName: 'employeeSkills',
        queryParams: {
          email: req.query.email,
        },
      })

      const workExperiencePromise = getReport<EmployeeExperience[]>({
        accessToken: req.accessToken,
        reportName: 'workExperience',
        queryParams: {
          email: req.query.email,
        },
      })

      const employeeInformationPromise = getReport<EmployeeInformation[]>({
        accessToken: req.accessToken,
        reportName: 'employeeInformation',
        queryParams: {
          email: req.query.email,
        },
      })

      const [employeeSkills, workExperience, employeeInformation] =
        await Promise.all([
          employeeSkillsPromise,
          workExperiencePromise,
          employeeInformationPromise,
        ])

      // TODO: Should probably return 404/Not found if employeeInformation is empty?

      const aggregatedData = aggregateEmployeeProfile(
        employeeSkills,
        workExperience,
        employeeInformation
      )

      res.send(aggregatedData)
    } catch (error) {
      next(error)
    }
  }
)

export { router as employeesRouter }
