import express from 'express'
import { getReport } from '../../dataplattform/client'
import { AggregateExperienceDistribution } from './competenceAggregation'
import { YearsWorkingDistributionCount } from './competenceTypes'

const router = express.Router()

// experienceDistribution
router.get('/experienceDistribution', async (req, res) => {
  const report = 'workExperienceDistributedInYears'
  try {
    const data = await getReport<YearsWorkingDistributionCount[]>({
      accessToken: req.accessToken,
      reportName: report,
    })

    const aggregatedData = AggregateExperienceDistribution(data)

    res.send(aggregatedData)
  } catch (err) {
    Promise.reject(err)
  }
})

export { router as competenceRouter }
