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
  const groupedListData = [
    { years: '1 til 2 år', count: 0 },
    { years: '3 til 5 år', count: 0 },
    { years: '6 til 10 år', count: 0 },
    { years: 'over 10 år', count: 0 },
    { years: 'Ukjent erfaring', count: 0 },
  ]

  const detailedGroupedListData = [
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
    let indexes = [0, 0]
    if (years === 0) indexes = [8, 4]
    else if (years === 1) indexes = [0, 0]
    else if (years === 2) indexes = [1, 0]
    else if (years > 2 && years < 6) indexes = [1, 1]
    else if (years > 5 && years < 11) indexes = [2, 2]
    else if (years > 10 && years < 16) indexes = [3, 3]
    else if (years > 15 && years < 21) indexes = [4, 3]
    else if (years > 20 && years < 26) indexes = [5, 3]
    else if (years > 25 && years < 31) indexes = [6, 3]
    else if (years > 30) indexes = [7, 3]

    detailedGroupedListData[indexes[0]].count += count
    groupedListData[indexes[1]].count += count
  })

  return {
    regular: { data: groupedListData },
    detailed: { data: detailedGroupedListData },
  }
}

export const competenceAmountMapping = (
  data: CompetenceAmount[]
): AggregatedData<CategoryAmountData[]> => {
  const result: AggregatedData<CategoryAmountData[]> = {
    MainCategories: { data: [] },
  }

  const addMainCategory = (row: CompetenceAmount) => {
    result.MainCategories.data.push({
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
    MainCategories: { data: [] },
  }

  const addMainCategory = (data: CategoryAverage) => {
    let category = result.MainCategories.data.find(
      (c) => c.category === data.category
    )

    if (!category) {
      category = {
        category: data.category,
        motivation: 0,
        competence: 0,
      }

      result[data.category] = { data: [] }
      result.MainCategories.data.push(category)
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

  result.MainCategories.data.forEach((c) => {
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
    result.Competence.data.push(category)
    result.Motivation.data.push(category)
  })

  return result
}

export const ageDistribution = (
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
