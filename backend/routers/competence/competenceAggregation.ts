import { YearsWorkingDistributionCount } from './competenceTypes'

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
