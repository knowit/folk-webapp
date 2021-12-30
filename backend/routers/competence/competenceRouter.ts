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
    next({ message: 'Error occured at /experienceDistribution', error })
  }
})

// /competenceAmount
router.get('/competenceAmount', async (req, res, next) => {
  try {
    const data = await getReport<any>({
      accessToken: req.accessToken,
      reportName: 'employeeMotivationAndCompetence',
    })

    const aggregatedData = aggregateCompetenceAmount(data)
    res.send(aggregatedData)
  } catch (error) {
    next({ message: 'Error occured at /competenceAmount', error })
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
    next({ message: 'Error occured at /competenceAreas', error })
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
    next({ message: 'Error occured at /ageDistribution', error })
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
    next({ message: 'Error occured at /fagtimer', error })
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
    next({ message: 'Error occured at /fagEvents', error })
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
    next({ message: 'Error occured at /education', error })
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
    next({ message: 'Error occured at /competenceMapping', error })
  }
})

export { router as competenceRouter }
