import { range } from '../../repository/util'
import {
  AreaAverageValue,
  EmployeeCompetenceAndMotivation,
  FagtimeStats,
  YearsWorkingDistributionCount,
} from './competenceTypes'

// * Could probably be done cleaner. Just copy pasted what had been done earlier.
// /experienceDistribution
export const AggregateExperienceDistribution = (
  data: YearsWorkingDistributionCount[]
) => {
  const groupedList = [
    { years: '1 til 2 år', count: 0 },
    { years: '3 til 5 år', count: 0 },
    { years: '6 til 10 år', count: 0 },
    { years: 'over 10 år', count: 0 },
    { years: 'Ukjent erfaring', count: 0 },
  ]

  const detailedGroupedList = [
    { years: 'Under 2 år', count: 0 },
    { years: '2 til 5 år', count: 0 },
    { years: '6 til 10 år', count: 0 },
    { years: '11 til 15 år', count: 0 },
    { years: '16 til 20 år', count: 0 },
    { years: '21 til 25 år', count: 0 },
    { years: '26 til 30 år', count: 0 },
    { years: 'over 31 år', count: 0 },
    { years: 'Ukjent erfaring', count: 0 },
  ]

  data.forEach((entry) => {
    const years = +entry.years_working
    const count = +entry.count
    if (years === 0) {
      detailedGroupedList[8].count += count
      groupedList[4].count += count
    } else if (years === 1) {
      detailedGroupedList[0].count += count
      groupedList[0].count += count
    } else if (years === 2) {
      detailedGroupedList[1].count += count
      groupedList[0].count += count
    } else if (years > 2 && years < 6) {
      detailedGroupedList[1].count += count
      groupedList[1].count += count
    } else if (years > 5 && years < 11) {
      detailedGroupedList[2].count += count
      groupedList[2].count += count
    } else if (years > 10 && years < 16) {
      detailedGroupedList[3].count += count
      groupedList[3].count += count
    } else if (years > 15 && years < 21) {
      detailedGroupedList[4].count += count
      groupedList[3].count += count
    } else if (years > 20 && years < 26) {
      detailedGroupedList[5].count += count
      groupedList[3].count += count
    } else if (years > 25 && years < 31) {
      detailedGroupedList[6].count += count
      groupedList[3].count += count
    } else if (years > 30) {
      detailedGroupedList[7].count += count
      groupedList[3].count += count
    }
  })

  return {
    setNames: ['Erfaring', 'Detaljert oversikt'],
    sets: {
      Erfaring: groupedList,
      'Detaljert oversikt': detailedGroupedList,
    },
  }
}

// * Could probably be done cleaner. Just copy pasted what had been done earlier.
// /competenceAmount

/**
 * Dette endepunktet henter antall ansatte i knowit som har svart 3 eller over på kompetanse og/eller motivasjon på kompetansekartleggingen
 * for de forskjellige kategoriene. Den regner også ut den prosentivse andelen som har svart 3 eller mer sammenlignet med alle om har svart.
 */
export const AggregateCompetenceAmount = (
  data: EmployeeCompetenceAndMotivation[]
) => {
  const THRESHOLD = 3
  /*const motAndComp = data*/
  const categoriesMap = { mainCategories: {} }
  // used to ensure that each participant is only counted once for each main category and to count the number of distinct participants
  const emailMap = {}

  data.forEach((employeeRow) => {
    const {
      categoryMotivationAvg,
      categoryCompetenceAvg,
      category,
      subCategory,
      motivation,
      competence,
      email,
    } = employeeRow

    if (!(category in categoriesMap)) {
      categoriesMap['mainCategories'][category] = {
        competenceAmount: 0,
        motivationAmount: 0,
        category: category,
      }
      categoriesMap[category] = {}
    }

    if (!(subCategory in categoriesMap[category])) {
      categoriesMap[category][subCategory] = {
        competenceAmount: 0,
        motivationAmount: 0,
        category: subCategory,
      }
    }

    if (!(email in emailMap)) {
      emailMap[email] = []
    }

    if (!emailMap[email].includes(category)) {
      if (categoryMotivationAvg > THRESHOLD) {
        categoriesMap['mainCategories'][category].motivationAmount += 1
      }

      if (categoryCompetenceAvg > THRESHOLD) {
        categoriesMap['mainCategories'][category].competenceAmount += 1
      }

      emailMap[email].push(category)
    }

    if (motivation > THRESHOLD) {
      categoriesMap[category][subCategory].motivationAmount += 1
    }

    if (competence > THRESHOLD) {
      categoriesMap[category][subCategory].competenceAmount += 1
    }
  })

  const output = {}
  const nParticipants = Object.keys(emailMap).length
  for (const category of Object.keys(categoriesMap)) {
    for (const subCategory of Object.keys(categoriesMap[category])) {
      const { motivationAmount, competenceAmount } =
        categoriesMap[category][subCategory]
      categoriesMap[category][subCategory]['motivationProportion'] =
        (motivationAmount / nParticipants) * 100
      categoriesMap[category][subCategory]['competenceProportion'] =
        (competenceAmount / nParticipants) * 100
    }
    output[category] = Object.values(categoriesMap[category])
  }

  return {
    setNames: Object.keys(output),
    sets: output,
  }
}

// /competenceAreas
export const AggregateCompetenceAreas = (
  competence: AreaAverageValue[],
  motivation: AreaAverageValue[]
) => {
  const categoriesMap = { mainCategories: {} }

  competence.forEach((row) => {
    const { category, subCategory } = row
    const competence = row.value || null
    if (!(category in categoriesMap)) {
      categoriesMap[category] = {}
      categoriesMap['mainCategories'][category] = {
        category,
        motivation: 0,
        competence: 0,
      }
    }
    categoriesMap[category][subCategory] = {
      category: subCategory,
      competence,
      motivation: null,
    }
    categoriesMap['mainCategories'][category].competence += competence
  })

  motivation.forEach((row) => {
    const { category, subCategory } = row
    const motivation = row.value || null
    if (!(category in categoriesMap)) {
      categoriesMap[category] = {}
      categoriesMap['mainCategories'][category] = {
        category,
        motivation: 0,
        competence: 0,
      }
    }
    if (subCategory in categoriesMap[category]) {
      categoriesMap[category][subCategory].motivation = motivation
    } else {
      categoriesMap[category][subCategory] = {
        category: subCategory,
        competence: null,
        motivation,
      }
    }
    categoriesMap['mainCategories'][category].motivation += motivation
  })

  const output = {}
  for (const category of Object.keys(categoriesMap)) {
    if (category !== 'mainCategories') {
      categoriesMap['mainCategories'][category].competence /= Object.keys(
        categoriesMap[category]
      ).length
      categoriesMap['mainCategories'][category].motivation /= Object.keys(
        categoriesMap[category]
      ).length
    }
    output[category] = Object.values(categoriesMap[category])
  }
  return {
    setNames: Object.keys(output),
    sets: output,
  }
}

// /fagTimer
export const AggregateFagtimer = (data: FagtimeStats[]) => {
  const makeFagTimerDataForNivo = (data: FagtimeStats[]) => {
    const setData = range(2018, new Date().getFullYear()).map((year) => ({
      id: year.toString(),
      data: range(1, 53).map((i) => {
        const currentYear = data.filter((dataItem) => dataItem.year === year)
        const currentWeekData = currentYear.find(
          (dataItem) => dataItem.week === i
        )
        return {
          x: i,
          y:
            currentWeekData && currentWeekData.used_hrs
              ? currentWeekData.used_hrs
              : 0,
        }
      }),
    }))
    return setData
  }

  return {
    componentType: 'Line',
    setNames: ['Fagtimer'],
    sets: {
      Fagtimer: makeFagTimerDataForNivo(data),
    },
  }
}
