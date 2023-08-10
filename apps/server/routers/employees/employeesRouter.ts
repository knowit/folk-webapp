import express, { Router } from 'express'
import { getReport } from '../../dataplattform/client'
import { NotFoundError, ParamError } from '../../middlewares/errorHandling'
import { employeeMotivationAndCompetence } from './employeeChartConversion'
import {
  aggregateEmployeeCompetence,
  aggregateEmployeeProfile,
  aggregateEmployeeTable,
  aggregateStructure,
} from './employeesAggregation'
import {
  BasicEmployeeInformationReport,
  EmployeeExperienceReport,
  EmployeeMotivationAndCompetenceReport,
  EmployeeProfileInformationReport,
  EmployeeSkillsReport,
  EmployeeWorkStatusReport,
  JobRotationInformationReport,
  ProjectExperienceReport,
  WorkExperienceReport,
} from './employeesTypes'
import { EmployeeCustomersReport } from '../customer/customerTypes'

import { getFileFromS3 } from '../../dataplattform/databricksS3Call'

const router: Router = express.Router()

router.get('/employeeTable', async (req, res, next) => {
  try {
    // const basicEmployeeInformationPromise =
    //   getReport<BasicEmployeeInformationReport>({
    //     accessToken: req.accessToken,
    //     reportName: 'basicEmployeeInformation',
    //   })

    // const employeeMotivationAndCompetencePromise =
    //   getReport<EmployeeMotivationAndCompetenceReport>({
    //     accessToken: req.accessToken,
    //     reportName: 'employeeMotivationAndCompetence',
    //   })

    // const jobRotationInformationPromise =
    //   getReport<JobRotationInformationReport>({
    //     accessToken: req.accessToken,
    //     reportName: 'jobRotationInformation',
    //   })

    // const employeeWorkStatusPromise = getReport<EmployeeWorkStatusReport>({
    //   accessToken: req.accessToken,
    //   reportName: 'employeeWorkStatus',
    // })

    // const [
    //   basicEmployeeInformation,
    //   employeeMotivationAndCompetence,
    //   jobRotationInformation,
    //   employeeWorkStatus,
    // ] = await Promise.all([
    //   basicEmployeeInformationPromise,
    //   employeeMotivationAndCompetencePromise,
    //   jobRotationInformationPromise,
    //   employeeWorkStatusPromise,
    // ])

    // const aggregatedData = aggregateEmployeeTable(
    //   basicEmployeeInformation,
    //   employeeMotivationAndCompetence,
    //   jobRotationInformation,
    //   employeeWorkStatus
    // )

    // console.log(basicEmployeeInformation[7])
    // res.send(aggregatedData)
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
            // console.log(basic_data[7])
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

      // const employeeProfileInformationPromise =
      //   getReport<EmployeeProfileInformationReport>({
      //     accessToken: req.accessToken,
      //     reportName: 'employeeProfileInformation',
      //     queryParams: {
      //       email: req.query.email,
      //     },
      //   })

      // const employeeSkillsPromise = getReport<EmployeeSkillsReport>({
      //   accessToken: req.accessToken,
      //   reportName: 'employeeSkills',
      //   queryParams: {
      //     email: req.query.email,
      //   },
      // })

      // const workExperiencePromise = getReport<WorkExperienceReport>({
      //   accessToken: req.accessToken,
      //   reportName: 'workExperience',
      //   queryParams: {
      //     email: req.query.email,
      //   },
      // })

      // const projectExperiencePromise = getReport<ProjectExperienceReport>({
      //   accessToken: req.accessToken,
      //   reportName: 'projectExperience',
      //   queryParams: {
      //     email: req.query.email,
      //   },
      // })

      // const employeeExperiencePromise = getReport<EmployeeExperienceReport>({
      //   accessToken: req.accessToken,
      //   reportName: 'ubwExperience',
      //   queryParams: {
      //     email: req.query.email,
      //   },
      // })

      // const [
      //   employeeProfileInformation,
      //   employeeSkills,
      //   workExperience,
      //   projectExperience,
      //   employeeExperience,
      // ] = await Promise.all([
      //   employeeProfileInformationPromise,
      //   employeeSkillsPromise,
      //   workExperiencePromise,
      //   projectExperiencePromise,
      //   employeeExperiencePromise,
      // ])

      // if (
      //   !employeeProfileInformation ||
      //   employeeProfileInformation.length === 0
      // ) {
      //   const err: NotFoundError = {
      //     status: 404,
      //     message: "Employee with email '" + req.query.email + "' not found.",
      //   }

      //   throw err
      // }

      // const aggregatedData = aggregateEmployeeCompetence(
      //   employeeProfileInformation,
      //   employeeSkills,
      //   workExperience,
      //   projectExperience,
      //   employeeExperience
      // )

      // res.send(aggregatedData)
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

      // const data = await getReport<EmployeeMotivationAndCompetenceReport>({
      //   accessToken: req.accessToken,
      //   reportName: 'employeeMotivationAndCompetence',
      //   queryParams: {
      //     email: req.query.email,
      //   },
      // })

      // const aggregatedData = employeeMotivationAndCompetence(data)
      // res.send(aggregatedData)
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

      // const employeeProfileInformationPromise =
      //   getReport<EmployeeProfileInformationReport>({
      //     accessToken: req.accessToken,
      //     reportName: 'employeeProfileInformation',
      //     queryParams: {
      //       email: req.query.email,
      //     },
      //   })

      // const employeeSkillsPromise = getReport<EmployeeSkillsReport>({
      //   accessToken: req.accessToken,
      //   reportName: 'employeeSkills',
      //   queryParams: {
      //     email: req.query.email,
      //   },
      // })

      // const workExperiencePromise = getReport<WorkExperienceReport>({
      //   accessToken: req.accessToken,
      //   reportName: 'workExperience',
      //   queryParams: {
      //     email: req.query.email,
      //   },
      // })

      // const projectExperiencePromise = getReport<ProjectExperienceReport>({
      //   accessToken: req.accessToken,
      //   reportName: 'projectExperience',
      //   queryParams: {
      //     email: req.query.email,
      //   },
      // })

      // const employeeCustomersPromise = getReport<EmployeeCustomersReport>({
      //   accessToken: req.accessToken,
      //   reportName: 'employeeCustomers',
      //   queryParams: {
      //     email: req.query.email,
      //   },
      // })

      // const [
      //   employeeProfileInformation,
      //   employeeSkills,
      //   workExperience,
      //   projectExperience,
      //   employeeCustomers,
      // ] = await Promise.all([
      //   employeeProfileInformationPromise,
      //   employeeSkillsPromise,
      //   workExperiencePromise,
      //   projectExperiencePromise,
      //   employeeCustomersPromise,
      // ])

      // if (
      //   !employeeProfileInformation ||
      //   employeeProfileInformation.length === 0
      // ) {
      //   const err: NotFoundError = {
      //     status: 404,
      //     message: "Employee with email '" + req.query.email + "' not found.",
      //   }

      //   throw err
      // }

      // const aggregatedData = aggregateEmployeeProfile(
      //   employeeProfileInformation,
      //   employeeSkills,
      //   workExperience,
      //   projectExperience,
      //   employeeCustomers
      // )

      // res.send(aggregatedData)
      getFileFromS3('employeeProfileInformation').then((profile) => {
        getFileFromS3('employeeSkills').then((skills) => {
          getFileFromS3('workExperience').then((work) => {
            getFileFromS3('projectExperience').then((project) => {
              getFileFromS3('employeeExperience').then((employee) => {
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
    // const employeeProfileInformationPromise =
    //   await getReport<EmployeeProfileInformationReport>({
    //     accessToken: req.accessToken,
    //     reportName: 'employeeProfileInformation',
    //   })

    // const employeeProfileInformationReport = await Promise.all(
    //   employeeProfileInformationPromise
    // )
    // const aggregatedData = aggregateStructure(employeeProfileInformationReport)

    // res.send(aggregatedData)
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
