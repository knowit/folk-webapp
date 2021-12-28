import express from 'express'
import { getReport } from '../../dataplattform/client'
import {
  AggregateCompetenceAmount,
  AggregateCompetenceAreas,
  AggregateExperienceDistribution,
} from './competenceAggregation'
import {
  AreaAverageValue,
  YearsWorkingDistributionCount,
} from './competenceTypes'

const router = express.Router()

// experienceDistribution
router.get('/experienceDistribution', async (req, res) => {
  try {
    const data = await getReport<YearsWorkingDistributionCount[]>({
      accessToken: req.accessToken,
      reportName: 'workExperienceDistributedInYears',
    })

    const aggregatedData = AggregateExperienceDistribution(data)

    res.send(aggregatedData)
  } catch (err) {
    // ? Should this maybe res.send(err) ?
    Promise.reject(err)
  }
})

// /competenceAmount
router.get('/competenceAmount', async (req, res) => {
  try {
    const data = await getReport<any>({
      accessToken: req.accessToken,
      reportName: 'employeeMotivationAndCompetence',
    })

    const aggregatedData = AggregateCompetenceAmount(data)

    res.send(aggregatedData)
  } catch (err) {
    Promise.reject(err)
  }
})

// /competenceAreas
router.get('/competenceAreas', async (req, res) => {
  const [competence, motivation] = await Promise.all([
    getReport<AreaAverageValue[]>({
      accessToken: req.accessToken,
      reportName: 'newCompetenceAverage',
    }),
    getReport<AreaAverageValue[]>({
      accessToken: req.accessToken,
      reportName: 'newMotivationAverage',
    }),
  ])

  const aggregatedData = AggregateCompetenceAreas(competence, motivation)

  res.send(aggregatedData)
})

export { router as competenceRouter }
