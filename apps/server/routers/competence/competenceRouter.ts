import express, { Router } from 'express'
import { getReport } from '../../dataplattform/client'
import {
  ageDistribution,
  competenceAmount,
  competenceAreas,
  competenceMappingConversion,
  educationPie,
  experienceDistribution,
  fagEventsLine,
  fagtimer,
} from './competenceChartConversion'
import { FagEventData } from './competenceTypes'
import { getFileFromS3 } from '../../dataplattform/databricksS3Call'

const router: Router = express.Router()

router.get('/experienceDistribution', async (req, res, next) => {
  try {
    const workExperienceDistributedInYears = await getFileFromS3(
      'workExperienceDistributedInYears'
    )
    const data = JSON.parse(workExperienceDistributedInYears)
    const aggregatedData = experienceDistribution(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/competenceAmount', async (req, res, next) => {
  try {
    const competenceAmountAggregated = await getFileFromS3(
      'competenceAmountAggregated'
    )
    const data = JSON.parse(competenceAmountAggregated)
    const aggregatedData = competenceAmount(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/competenceAreas', async (req, res, next) => {
  try {
    const averageCompetenceAndMotivation = await getFileFromS3(
      'averageCompetenceAndMotivation'
    )
    const data = JSON.parse(averageCompetenceAndMotivation)
    const aggregatedData = competenceAreas(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/ageDistribution', async (req, res, next) => {
  try {
    const ageDist = await getFileFromS3('ageDistribution')
    const ageDistributionGroups = await getFileFromS3('ageDistributionGroups')
    const age_data = JSON.parse(ageDist)
    const groups_data = JSON.parse(ageDistributionGroups)
    const aggregatedData = ageDistribution([age_data, groups_data])
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/fagtimer', async (req, res, next) => {
  try {
    const fagActivity = await getFileFromS3('fagActivity')
    const data = JSON.parse(fagActivity)
    const aggregatedData = fagtimer(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/fagEvents', async (req, res, next) => {
  try {
    const data = await getReport<FagEventData[]>({
      accessToken: req.accessToken,
      reportName: 'fagEvents',
    })

    const aggregatedData = fagEventsLine(data)
    res.send(aggregatedData)
    // getFileFromS3('fagEvents').then((result) => {
    //   const data = JSON.parse(result)
    //   const aggregatedData = fagEventsLine(data)
    //   res.send(aggregatedData)
    // })
  } catch (error) {
    next(error)
  }
})

router.get('/education', async (req, res, next) => {
  try {
    const degreeDist = await getFileFromS3('degreeDist')
    const countEmployees = await getFileFromS3('countEmployees')
    const degree_data = JSON.parse(degreeDist)
    const count_data = JSON.parse(countEmployees)
    const aggregatedData = educationPie(degree_data, count_data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/competenceMapping', async (req, res, next) => {
  try {
    const newCompetenceMotivationAverages = await getFileFromS3(
      'newCompetenceMotivationAverages'
    )
    const data = JSON.parse(newCompetenceMotivationAverages)
    const aggregatedData = competenceMappingConversion(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/competenceFilter', async (req, res, next) => {
  try {
    const newCategories = await getFileFromS3('newCategories')
    const data = JSON.parse(newCategories)
    res.send(data)
  } catch (error) {
    next(error)
  }
})

export { router as competenceRouter }
