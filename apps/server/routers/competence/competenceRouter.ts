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
import {
  AgeDistribution,
  AgeGroupDistribution,
  CategoryAverage,
  CompetenceAmount,
  CompetenceFilterRawData,
  DegreeDistribution,
  FagEventData,
  FagtimeStats,
  YearsWorkingDistributionCount,
} from './competenceTypes'

const router: Router = express.Router()

router.get('/experienceDistribution', async (req, res, next) => {
  try {
    const data = await getReport<YearsWorkingDistributionCount[]>({
      accessToken: req.accessToken,
      reportName: 'workExperienceDistributedInYears',
    })
    const aggregatedData = experienceDistribution(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/competenceAmount', async (req, res, next) => {
  try {
    const data = await getReport<CompetenceAmount[]>({
      accessToken: req.accessToken,
      reportName: 'competenceAmountAggregated',
    })
    const aggregatedData = competenceAmount(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/competenceAreas', async (req, res, next) => {
  try {
    const data = await getReport<CategoryAverage[]>({
      accessToken: req.accessToken,
      reportName: 'averageCompetenceAndMotivation',
    })
    const aggregatedData = competenceAreas(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/ageDistribution', async (req, res, next) => {
  try {
    const ageDistributionPromise = getReport<AgeDistribution[]>({
      accessToken: req.accessToken,
      reportName: 'ageDistribution',
    })

    const ageDistributionGroupsPromise = getReport<AgeGroupDistribution[]>({
      accessToken: req.accessToken,
      reportName: 'ageDistributionGroups',
    })

    const [ageDistributionData, ageDistributionGroups] = await Promise.all([
      ageDistributionPromise,
      ageDistributionGroupsPromise,
    ])

    const aggregatedData = ageDistribution([
      ageDistributionData,
      ageDistributionGroups,
    ])

    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/fagtimer', async (req, res, next) => {
  try {
    const data = await getReport<FagtimeStats[]>({
      accessToken: req.accessToken,
      reportName: 'fagActivity',
    })

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
  } catch (error) {
    next(error)
  }
})

router.get('/education', async (req, res, next) => {
  try {
    const data = await getReport<DegreeDistribution[]>({
      accessToken: req.accessToken,
      reportName: 'degreeDist',
    })

    const aggregatedData = educationPie(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/competenceMapping', async (req, res, next) => {
  try {
    const data = await getReport<CategoryAverage[]>({
      accessToken: req.accessToken,
      reportName: 'newCompetenceMotivationAverages',
    })

    const aggregatedData = competenceMappingConversion(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/competenceFilter', async (req, res, next) => {
  try {
    const data = await getReport<CompetenceFilterRawData[]>({
      accessToken: req.accessToken,
      reportName: 'newCategories',
    })

    const aggregatedData = data.map((e) => ({
      category: e.category,
      subCategories: JSON.parse(e.subCategories),
    }))

    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

export { router as competenceRouter }
