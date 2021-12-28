import express from 'express'
import { getReport } from '../../dataplattform/client'
import {
  AggregateCompetenceAmount,
  AggregateCompetenceAreas,
  AggregateCompetenceMapping,
  AggregateExperienceDistribution,
  AggregateFagEvents,
  AggregateFagtimer,
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

// TODO: ERROR HANDLING

// /experienceDistribution
router.get('/experienceDistribution', async (req, res) => {
  const data = await getReport<YearsWorkingDistributionCount[]>({
    accessToken: req.accessToken,
    reportName: 'workExperienceDistributedInYears',
  })

  const aggregatedData = AggregateExperienceDistribution(data)
  res.send(aggregatedData)
})

// /competenceAmount
router.get('/competenceAmount', async (req, res) => {
  const data = await getReport<any>({
    accessToken: req.accessToken,
    reportName: 'employeeMotivationAndCompetence',
  })

  const aggregatedData = AggregateCompetenceAmount(data)
  res.send(aggregatedData)
})

// /competenceAreas
router.get('/competenceAreas', async (req, res) => {
  const [competence, motivation] = await Promise.all([
    getReport<CategoryAverage[]>({
      accessToken: req.accessToken,
      reportName: 'newCompetenceAverage',
    }),
    getReport<CategoryAverage[]>({
      accessToken: req.accessToken,
      reportName: 'newMotivationAverage',
    }),
  ])

  const aggregatedData = AggregateCompetenceAreas(competence, motivation)
  res.send(aggregatedData)
})

// /ageDistribution
router.get('/ageDistribution', async (req, res) => {
  const [ageDistribution, ageDistributionGroups] = await Promise.all([
    getReport<AgeDistribution[]>({
      accessToken: req.accessToken,
      reportName: 'ageDistribution',
    }),
    getReport<AgeGroupDistribution[]>({
      accessToken: req.accessToken,
      reportName: 'ageDistributionGroups',
    }),
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
})

// /fagtimer
router.get('/fagtimer', async (req, res) => {
  const data = await getReport<FagtimeStats[]>({
    accessToken: req.accessToken,
    reportName: 'fagActivity',
  })

  const aggregatedData = AggregateFagtimer(data)
  res.send(aggregatedData)
})

// /fagEvents
router.get('/fagEvents', async (req, res) => {
  const data = await getReport<FagEventData[]>({
    accessToken: req.accessToken,
    reportName: 'fagEvents',
  })

  const aggregatedData = AggregateFagEvents(data)
  res.send(aggregatedData)
})

// /education
router.get('/education', async (req, res) => {
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
})

// /competenceMapping
router.get('/competenceMapping', async (req, res) => {
  const [competence, motivation] = await Promise.all([
    getReport<CategoryAverage[]>({
      accessToken: req.accessToken,
      reportName: 'newCompetenceAverage',
    }),
    getReport<CategoryAverage[]>({
      accessToken: req.accessToken,
      reportName: 'newMotivationAverage',
    }),
  ])

  const aggregatedData = AggregateCompetenceMapping(competence, motivation)
  res.send(aggregatedData)
})

export { router as competenceRouter }
