import {
  AgeDistribution,
  AgeDistributionData,
  AgeGroupDistribution,
  CategoryAmountData,
  CategoryAreaData,
  CategoryAverage,
  CategoryMapData,
  CompetenceAmount,
  ExperienceDistributionData,
  YearsWorkingDistributionCount,
} from './competenceTypes'
import { AggregatedData } from '../datatypes/typeData'

// * Everything in this file ould probably be done cleaner. Just copy pasted what had been done earlier.

export const experienceMapping = (
  data: YearsWorkingDistributionCount[]
): AggregatedData<ExperienceDistributionData[]> => {
  const getCount = (list: YearsWorkingDistributionCount[], range: number[]) => {
    return list
      .filter(
        (item) =>
          item.years_working >= range[0] && item.years_working <= range[1]
      )
      .reduce((sum, item) => sum + item.count, 0)
  }

  const setInGroups = (list: YearsWorkingDistributionCount[]) => {
    const groupedListData = [
      { years: 'Under 2 år', range: [1, 1] },
      { years: '2 til 5 år', range: [2, 5] },
      { years: '6 til 10 år', range: [6, 10] },
      { years: 'over 10 år', range: [11, 99] },
      { years: 'Ukjent erfaring', range: [0, 0] },
    ]

    const detailedGroupedListData = [
      ...groupedListData.slice(0, 3),
      { years: '11 til 15 år', range: [11, 15] },
      { years: '16 til 20 år', range: [16, 20] },
      { years: '21 til 25 år', range: [21, 25] },
      { years: '26 til 30 år', range: [26, 30] },
      { years: 'over 31 år', range: [31, 99] },
      { years: 'Ukjent erfaring', range: [0, 0] },
    ]

    return [
      groupedListData.map((group) => ({
        years: group.years,
        count: getCount(list, group.range),
      })),
      detailedGroupedListData.map((group) => ({
        years: group.years,
        count: getCount(list, group.range),
      })),
    ]
  }

  const experience = data
  const [groups, detailedGroups] = setInGroups(experience)

  return {
    Erfaring: { data: groups },
    'Detaljert oversikt': { data: detailedGroups },
  }
}

export const competenceAmountMapping = (
  data: CompetenceAmount[]
): AggregatedData<CategoryAmountData[]> => {
  const result: AggregatedData<CategoryAmountData[]> = {
    Hovedkategorier: { data: [] },
  }

  const addMainCategory = (row: CompetenceAmount) => {
    result.Hovedkategorier.data.push({
      category: row.category,
      competenceAmount: row.competenceAmount,
      motivationAmount: row.motivationAmount,
      competenceProportion: row.competencePropotion,
      motivationProportion: row.motivationPropotion,
    })
    result[row.category] = { data: [] }
  }

  const addSubCategory = (row: CompetenceAmount) => {
    result[row.category].data.push({
      category: row.subCategory,
      competenceAmount: row.subCompetenceAmount,
      motivationAmount: row.subMotivationAmount,
      competenceProportion: row.subCompetencePropotion,
      motivationProportion: row.subMotivationPropotion,
    })
  }

  data.forEach((row) => {
    if (!(row.category in result)) addMainCategory(row)
    addSubCategory(row)
  })

  return result
}

// /competenceAreas
export const competenceAreasAggregated = (
  data: CategoryAverage[]
): AggregatedData<CategoryAreaData[]> => {
  const result: AggregatedData<CategoryAreaData[]> = {
    Hovedkategorier: { data: [] },
  }

  const addMainCategory = (data: CategoryAverage) => {
    let category = result.Hovedkategorier.data.find(
      (c) => c.category === data.category
    )

    if (!category) {
      category = {
        category: data.category,
        motivation: 0,
        competence: 0,
      }

      result[data.category] = { data: [] }
      result.Hovedkategorier.data.push(category)
    }

    category.motivation += data.motivation
    category.competence += data.competence
  }

  const addSubCategory = (data: CategoryAverage) => {
    result[data.category].data.push({
      category: data.subCategory,
      motivation: data.motivation,
      competence: data.competence,
    })
  }

  data.forEach((row) => {
    addMainCategory(row)
    addSubCategory(row)
  })

  result.Hovedkategorier.data.forEach((c) => {
    c.motivation /= result[c.category].data.length
    c.competence /= result[c.category].data.length
  })

  return result
}

export const competenceMapping = (
  data: CategoryAverage[]
): AggregatedData<CategoryMapData[]> => {
  const aggregate = () => {
    const categoriesMap: Record<string, CategoryMapData> = {}
    data.forEach((row) => {
      if (row.category in categoriesMap) {
        categoriesMap[row.category].subcategories.push({
          category: `${row.category}: ${row.subCategory}`,
          motivation: row.motivation,
          competence: row.competence,
          competenceSize: 0,
          motivationSize: 0,
        })
        categoriesMap[row.category].motivation += row.motivation
        categoriesMap[row.category].competence += row.competence
      } else {
        categoriesMap[row.category] = {
          category: row.category,
          subcategories: [],
          motivation: 0,
          competence: 0,
        }
      }
    })

    for (const key of Object.keys(categoriesMap)) {
      const categoryObj = categoriesMap[key]
      const avgMotivation =
        categoryObj.motivation / categoryObj.subcategories.length
      const avgCompetence =
        categoryObj.competence / categoryObj.subcategories.length
      categoryObj.subcategories.forEach((child) => {
        child.motivationSize =
          (child.motivation / categoryObj.motivation) * avgMotivation
        child.competenceSize =
          (child.competence / categoryObj.competence) * avgCompetence
      })
      categoryObj.motivation = avgMotivation
      categoryObj.competence = avgCompetence
    }
    return categoriesMap
  }

  const result: AggregatedData<CategoryMapData[]> = {
    MotivationAndCompetence: { data: [] },
  }

  Object.values(aggregate()).forEach((category) => {
    result.MotivationAndCompetence.data.push(category)
  })

  return result
}

export const ageDistributionFormatting = (
  data: AgeDistribution[]
): AgeDistributionData[] => {
  return data
}

export const ageGroupDistribution = (
  data: AgeGroupDistribution[]
): AgeDistributionData[] => {
  return data.map((row) => {
    return { age: row.age_group, count: row.count }
  })
}
