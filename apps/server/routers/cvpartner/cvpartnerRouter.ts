import express, { Router } from 'express'
import { CVPartnerRepository } from '../../repository/cv-partner-repository'
import { CVPartnerRepositoryImpl } from '../../implementations/cv-partner-repository-impl'

const router: Router = express.Router()

const cvPartnerRepo: CVPartnerRepository = new CVPartnerRepositoryImpl()

router.get('/cvPartnerData', async (req, res, next) => {
  try {
    const result = await cvPartnerRepo.getEmployeeInformation()
    res.json(result)
  } catch (error) {
    console.log('Error:' + error)
    next(error)
  }
})

router.get('/cvWorkStatus', async (req, res, next) => {
  try {
    const result = await cvPartnerRepo.getEmployeeWorkStatus()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/cvWorkExperience', async (req, res, next) => {
  try {
    const result = await cvPartnerRepo.getEmployeeWorkInformation()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

export { router as cvPartnerRouter }
