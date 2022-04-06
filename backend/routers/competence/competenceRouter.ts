import express from 'express'
import { getReport } from '../../dataplattform/client'
import {
  ageDistributionBar,
  competenceAmountBar,
  competenceAreas,
  competenceMappingBar,
  competenceMappingSunburst,
  educationPie,
  experienceDistribution,
  fagEventsLine,
  fagtimerLine,
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

const router = express.Router()

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

router.get('/competenceAmount/bar', async (req, res, next) => {
  try {
    const data = await getReport<CompetenceAmount[]>({
      accessToken: req.accessToken,
      reportName: 'competenceAmountAggregated',
    })
    const aggregatedData = competenceAmountBar(data)
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

router.get('/ageDistribution/bar', async (req, res, next) => {
  try {
    const ageDistributionPromise = getReport<AgeDistribution[]>({
      accessToken: req.accessToken,
      reportName: 'ageDistribution',
    })

    const ageDistributionGroupsPromise = getReport<AgeGroupDistribution[]>({
      accessToken: req.accessToken,
      reportName: 'ageDistributionGroups',
    })

    const [ageDistribution, ageDistributionGroups] = await Promise.all([
      ageDistributionPromise,
      ageDistributionGroupsPromise,
    ])

    const aggregatedData = ageDistributionBar([
      ageDistribution,
      ageDistributionGroups,
    ])

    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/fagtimer/line', async (req, res, next) => {
  try {
    const data = await getReport<FagtimeStats[]>({
      accessToken: req.accessToken,
      reportName: 'fagActivity',
    })

    const aggregatedData = fagtimerLine(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/fagEvents/line', async (req, res, next) => {
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

router.get('/education/pie', async (req, res, next) => {
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

router.get('/competenceMapping/bar', async (req, res, next) => {
  try {
    const data = await getReport<CategoryAverage[]>({
      accessToken: req.accessToken,
      reportName: 'newCompetenceMotivationAverages',
    })

    const aggregatedData = competenceMappingBar(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

router.get('/competenceMapping/sunburst', async (req, res, next) => {
  try {
    const data = await getReport<CategoryAverage[]>({
      accessToken: req.accessToken,
      reportName: 'newCompetenceMotivationAverages',
    })

    const aggregatedData = competenceMappingSunburst(data)
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
