import express from 'express'
import { getReport } from '../../dataplattform/client'
import {
  aggregateCompetenceAmount,
  aggregateCompetenceAreas,
  aggregateCompetenceMapping,
  aggregateExperienceDistribution,
  aggregateFagEvents,
  aggregateFagtimer,
} from './competenceAggregation'
import {
  AgeDistribution,
  AgeGroupDistribution,
  CategoryAverage,
  DegreeDistribution,
  EmployeeCompetenceAndMotivation,
  FagEventData,
  FagtimeStats,
  YearsWorkingDistributionCount,
} from './competenceTypes'

const router = express.Router()

// /experienceDistribution
router.get('/experienceDistribution', async (req, res, next) => {
  try {
    const data = await getReport<YearsWorkingDistributionCount[]>({
      accessToken: req.accessToken,
      reportName: 'workExperienceDistributedInYears',
    })

    const aggregatedData = aggregateExperienceDistribution(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

// /competenceAmount
router.get('/competenceAmount', async (req, res, next) => {
  try {
    const data = await getReport<EmployeeCompetenceAndMotivation[]>({
      accessToken: req.accessToken,
      reportName: 'employeeMotivationAndCompetence',
    })

    const aggregatedData = aggregateCompetenceAmount(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

// /competenceAreas
router.get('/competenceAreas', async (req, res, next) => {
  try {
    const competencePromise = getReport<CategoryAverage[]>({
      accessToken: req.accessToken,
      reportName: 'newCompetenceAverage',
    })

    const motivationPromise = getReport<CategoryAverage[]>({
      accessToken: req.accessToken,
      reportName: 'newMotivationAverage',
    })

    const [competence, motivation] = await Promise.all([
      competencePromise,
      motivationPromise,
    ])

    const aggregatedData = aggregateCompetenceAreas(competence, motivation)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

// /ageDistribution
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

    const [ageDistribution, ageDistributionGroups] = await Promise.all([
      ageDistributionPromise,
      ageDistributionGroupsPromise,
    ])

    res.send({
      setNames: ['Aldersgrupper', 'Detaljert oversikt'],
      sets: {
        Aldersgrupper: ageDistributionGroups.map(({ age_group, count }) => ({
          age: age_group,
          count,
        })),
        'Detaljert oversikt': ageDistribution,
      },
    })
  } catch (error) {
    next(error)
  }
})

// /fagtimer
router.get('/fagtimer', async (req, res, next) => {
  try {
    const data = await getReport<FagtimeStats[]>({
      accessToken: req.accessToken,
      reportName: 'fagActivity',
    })

    const aggregatedData = aggregateFagtimer(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

// /fagEvents
router.get('/fagEvents', async (req, res, next) => {
  try {
    const data = await getReport<FagEventData[]>({
      accessToken: req.accessToken,
      reportName: 'fagEvents',
    })

    const aggregatedData = aggregateFagEvents(data)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

// /education
router.get('/education', async (req, res, next) => {
  try {
    const data = await getReport<DegreeDistribution[]>({
      accessToken: req.accessToken,
      reportName: 'degreeDist',
    })

    res.send({
      setNames: ['Utdanning'],
      sets: {
        Utdanning: data,
      },
    })
  } catch (error) {
    next(error)
  }
})

// /competenceMapping
router.get('/competenceMapping', async (req, res, next) => {
  try {
    const competencePromise = getReport<CategoryAverage[]>({
      accessToken: req.accessToken,
      reportName: 'newCompetenceAverage',
    })

    const motivationPromise = getReport<CategoryAverage[]>({
      accessToken: req.accessToken,
      reportName: 'newMotivationAverage',
    })

    const [competence, motivation] = await Promise.all([
      competencePromise,
      motivationPromise,
    ])

    const aggregatedData = aggregateCompetenceMapping(competence, motivation)
    res.send(aggregatedData)
  } catch (error) {
    next(error)
  }
})

export { router as competenceRouter }