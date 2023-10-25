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
    getFileFromS3('basicEmployeeInformation').then((basic) => {
      getFileFromS3('employeeMotivationAndCompetence').then((motivation) => {
        getFileFromS3('jobRotationInformation').then((rotation) => {
          getFileFromS3('employeeWorkStatus').then((work) => {
            const basic_data = JSON.parse(basic)
            const motivation_data = JSON.parse(motivation)
            const rotation_data = JSON.parse(rotation)
            const work_data = JSON.parse(work)
            const aggregatedData = aggregateEmployeeTable(
              basic_data,
              motivation_data,
              rotation_data,
              work_data
            )
            res.send(aggregatedData)
          })
        })
      })
    })
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

      getFileFromS3('employeeProfileInformation').then((profile) => {
        getFileFromS3('employeeSkills').then((skills) => {
          getFileFromS3('workExperience').then((work) => {
            getFileFromS3('projectExperience').then((project) => {
              getFileFromS3('ubwExperience').then((employee) => {
                let profile_data = JSON.parse(profile)
                profile_data = profile_data.filter(
                  (i) => i.email == req.query.email
                )
                let skills_data = JSON.parse(skills)
                skills_data = skills_data.filter(
                  (i) => i.email == req.query.email
                )
                let work_data = JSON.parse(work)
                work_data = work_data.filter((i) => i.email == req.query.email)
                let project_data = JSON.parse(project)
                project_data = project_data.filter(
                  (i) => i.email == req.query.email
                )
                let employee_data = JSON.parse(employee)
                employee_data = employee_data.filter(
                  (i) => i.email == req.query.email
                )
                const aggregatedData = aggregateEmployeeCompetence(
                  profile_data,
                  skills_data,
                  work_data,
                  project_data,
                  employee_data
                )

                res.send(aggregatedData)
              })
            })
          })
        })
      })
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

      getFileFromS3('employeeMotivationAndCompetence').then((result) => {
        let data = JSON.parse(result)
        data = data.filter((i) => i.email == req.query.email)
        const aggregatedData = employeeMotivationAndCompetence(data)
        res.send(aggregatedData)
      })
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

      getFileFromS3('employeeProfileInformation').then((profile) => {
        getFileFromS3('employeeSkills').then((skills) => {
          getFileFromS3('workExperience').then((work) => {
            getFileFromS3('projectExperience').then((project) => {
              getFileFromS3('employeeCustomers').then((employee) => {
                let profile_data = JSON.parse(profile)
                profile_data = profile_data.filter(
                  (i) => i.email == req.query.email
                )
                let skills_data = JSON.parse(skills)
                skills_data = skills_data.filter(
                  (i) => i.email == req.query.email
                )
                let work_data = JSON.parse(work)
                work_data = work_data.filter((i) => i.email == req.query.email)
                let project_data = JSON.parse(project)
                project_data = project_data.filter(
                  (i) => i.email == req.query.email
                )
                let employee_data = JSON.parse(employee)
                employee_data = employee_data.filter(
                  (i) => i.email == req.query.email
                )
                const aggregatedData = aggregateEmployeeProfile(
                  profile_data,
                  skills_data,
                  work_data,
                  project_data,
                  employee_data
                )
                res.send(aggregatedData)
              })
            })
          })
        })
      })
    } catch (error) {
      next(error)
    }
  }
)

router.get('/employeeStructure', async (req, res, next) => {
  try {
    getFileFromS3('employeeProfileInformation').then((result) => {
      const data = JSON.parse(result)
      const aggregatedData = aggregateStructure(data)
      res.send(aggregatedData)
    })
  } catch (error) {
    next(error)
  }
})

export { router as employeesRouter }
