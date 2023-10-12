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
    getFileFromS3('workExperienceDistributedInYears').then((result) => {
      const data = JSON.parse(result)
      const aggregatedData = experienceDistribution(data)
      res.send(aggregatedData)
    })
  } catch (error) {
    next(error)
  }
})

router.get('/competenceAmount', async (req, res, next) => {
  try {
    getFileFromS3('competenceAmountAggregated').then((result) => {
      const data = JSON.parse(result)
      const aggregatedData = competenceAmount(data)
      res.send(aggregatedData)
    })
  } catch (error) {
    next(error)
  }
})

router.get('/competenceAreas', async (req, res, next) => {
  try {
    getFileFromS3('averageCompetenceAndMotivation').then((result) => {
      const data = JSON.parse(result)
      const aggregatedData = competenceAreas(data)
      res.send(aggregatedData)
    })
  } catch (error) {
    next(error)
  }
})

router.get('/ageDistribution', async (req, res, next) => {
  try {
    getFileFromS3('ageDistribution').then((age) => {
      getFileFromS3('ageDistributionGroups').then((groups) => {
        const age_data = JSON.parse(age)
        const groups_data = JSON.parse(groups)
        const aggregatedData = ageDistribution([age_data, groups_data])
        res.send(aggregatedData)
      })
    })
  } catch (error) {
    next(error)
  }
})

router.get('/fagtimer', async (req, res, next) => {
  try {
    getFileFromS3('fagActivity').then((result) => {
      const data = JSON.parse(result)
      const aggregatedData = fagtimer(data)
      res.send(aggregatedData)
    })
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
    getFileFromS3('degreeDist').then((degree) => {
      getFileFromS3('countEmployees').then((count) => {
        const degree_data = JSON.parse(degree)
        const count_data = JSON.parse(count)
        const aggregatedData = educationPie(degree_data, count_data)
        res.send(aggregatedData)
      })
    })
  } catch (error) {
    next(error)
  }
})

router.get('/competenceMapping', async (req, res, next) => {
  try {
    getFileFromS3('newCompetenceMotivationAverages').then((result) => {
      const data = JSON.parse(result)
      const aggregatedData = competenceMappingConversion(data)
      res.send(aggregatedData)
    })
  } catch (error) {
    next(error)
  }
})

router.get('/competenceFilter', async (req, res, next) => {
  try {
    getFileFromS3('newCategories').then((result) => {
      const data = JSON.parse(result)
      res.send(data)
    })
  } catch (error) {
    next(error)
  }
})

export { router as competenceRouter }
