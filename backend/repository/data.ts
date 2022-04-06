import { mapEmployeeTags, getEventSet, range, sum } from './util'
import { LineChartData } from '../routers/chartTypes'

type EmployeeMotivationAndCompetence = {
  email: string
  motivation: number
  competence: number
  subCategory: string
  category: string
  categoryMotivationAvg: number
  categoryCompetenceAvg: number
}

type ReportParams = {
  parameters: {
    user_id?: string
    email?: string
  }
}
export const employeeExperienceReports = ({
  parameters: { user_id } = {},
}: ReportParams) => [
  {
    reportName: 'projectExperience',
    filter: { user_id },
  },
]
/** Dette endepunktet henter data om ansattes prosjekterfating.
 * Brukes i EmployeeInfo.tsx (utvidet tabell) og EmployeeSite.tsx
 */
type EmpExperience = {
  data: {
    user_id: string
    navn: string
    customer: string
    description: string
    year_from: number
    year_to: number
    month_from: number
    month_to: number
  }[]
}
export const employeeExperience = async ({ data }: EmpExperience) => {
  const empExperience = data
  const formatTime = (year: number, month: number) =>
    [
      year && year > 0 ? year : '',
      year && year > 0 && month && month > 0 ? `/${month}` : '',
    ].join('')

  return {
    name: empExperience.length > 0 ? empExperience[0].navn : '',
    experience: empExperience.reverse().map((exp) => ({
      customer: exp.customer,
      project: exp.description,
      time_from: formatTime(exp.year_from, exp.month_from),
      time_to: formatTime(exp.year_to, exp.month_to),
    })),
  }
}

export type EmployeeInformation = {
  user_id: string
  guid: string
  navn: string
  manager: string
  title: string
  link: string
  degree: string
  image_key: string
  email: string
  customer: string
  weight: number
  work_order_description: string
}

export type EmployeeSkills = {
  user_id: string
  email: string
  language: string
  skill: string
  role: string
}

type WorkExperience = {
  user_id: string
  email: string
  employer: string
  month_from: number
  month_to: number
  year_from: number
  year_to: number
}

type EmployeeData = {
  data: [EmployeeSkills[], WorkExperience[], EmployeeInformation[]]
}

export const employeeCompetenceReports = ({
  parameters: { email } = {},
}: ReportParams) => [
  {
    reportName: 'employeeSkills',
    filter: { email },
  },
  {
    reportName: 'workExperience',
    filter: { email },
  },
  {
    reportName: 'employeeInformation',
    filter: { email },
  },
]
/**
 * Dette endepunktet henter mer data om ansatte. Arbeidserfaring, ferdigheter,
 * språk,  utdanning og roller fra CV-partner og nærmeste leder fra AD.
 * Brukes i EmployeeInfo.tsx (utvidet tabell).
 */
export const employeeCompetence = async ({ data }: EmployeeData) => {
  const [employeeSkills, workExperience, employeeInformation] = data

  return {
    workExperience,
    tags: mapEmployeeTags(employeeSkills[0]),
    manager: employeeInformation[0].manager,
    degree: employeeInformation[0].degree,
    guid: employeeInformation[0].guid,
  }
}

type FagActivity = {
  year: number
  week: number
  used_hrs: number
}

export const fagtimerReports = [{ reportName: 'fagActivity' }]
/**Henter data om hvor mange fagtimer som er rapportert. Brukes i Competence.tsx */
export const fagtimer = async ({ data }: { data: FagActivity[] }) => {
  const fagActivity = data
  const makeFagTimerDataForNivo = (data: FagActivity[]) => {
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
    componenttype: 'LineChart',
    setNames: ['Fagtimer'],
    sets: {
      Fagtimer: makeFagTimerDataForNivo(fagActivity),
    },
  }
}

export const experienceDistributionReports = [
  { reportName: 'workExperienceDistributedInYears' },
]

type YearsSinceSchoolDist = {
  years_working: number
  count: number
}
/** Dette endepunktet henter ut erfarings-fordelingen blant de ansatte.
 * Det brukes for å lage stolpe- og kakediagram i Competence.tsx
 */
export const experienceDistribution = async ({
  data,
}: {
  data: YearsSinceSchoolDist[]
}) => {
  const setInGroups = (list: YearsSinceSchoolDist[]) => {
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

    const groupedList = [
      { years: '1 til 2 år', count: 0 },
      { years: '3 til 5 år', count: 0 },
      { years: '6 til 10 år', count: 0 },
      { years: 'over 10 år', count: 0 },
      { years: 'Ukjent erfaring', count: 0 },
    ]

    list.forEach((item) => {
      const years = Number(item.years_working)
      const count = Number(item.count)
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

    return [groupedList, detailedGroupedList]
  }

  const experience = data
  const [groups, detailedGroups] = setInGroups(experience)
  return {
    setNames: ['Erfaring', 'Detaljert oversikt'],
    sets: {
      Erfaring: groups,
      'Detaljert oversikt': detailedGroups,
    },
  }
}

export const ageDistributionReports = [
  { reportName: 'ageDistribution' },
  { reportName: 'ageDistributionGroups' },
]

type AgeDistribution = {
  age: number
  count: number
}

type AgeDistributionGroups = {
  age_group: number
  count: number
}
/** Dette endepunktet henter ut aldersfordelingen blant de ansatte.
 * Det brukes for å lage et stolpediagram i Competence.tsx
 */
export const ageDistribution = async ({
  data,
}: {
  data: [AgeDistribution[], AgeDistributionGroups[]]
}) => {
  const [setAgeDist, setAgeDistGroup] = data

  return {
    setNames: ['Aldersgrupper', 'Detaljert oversikt'],
    sets: {
      Aldersgrupper: setAgeDistGroup.map(({ age_group, count }) => ({
        age: age_group,
        count,
      })),
      'Detaljert oversikt': setAgeDist,
    },
  }
}

type FagEvent = {
  event_summary: string
  time_from: string
  time_to: string
}
export const fagEventsReports = [{ reportName: 'fagEvents' }]
/** Henter ut antall unike hendelser per uke i knowit events og Knowit Fagkalender
 * Brukes for å lage linjediagram i Competence.tsx
 */
export const fagEvents = async ({ data }: { data: FagEvent[] }) => {
  const eventSet = getEventSet(data)

  return {
    setNames: ['Fag og hendelser'],
    sets: {
      'Fag og hendelser': eventSet,
    },
  }
}
type DegreeDist = {
  degree: string
  count: number
}
export const educationReports = [{ reportName: 'degreeDist' }]

export const education = async ({ data }: { data: DegreeDist }) => {
  const education = data

  return {
    setNames: ['Utdanning'],
    sets: {
      Utdanning: education,
    },
  }
}

type NewCategories = {
  category: string
  subCategories: string
}

export const competenceFilterReports = [{ reportName: 'newCategories' }]
export const competenceFilter = async ({ data }: { data: NewCategories[] }) => {
  return data.map((e) => ({
    category: e.category,
    subCategories: JSON.parse(e.subCategories),
  }))
}

type CompetenceAndMotivationAverage = {
  value: number
  subCategory: string
  category: string
}

export const competenceMappingReports = [
  { reportName: 'newCompetenceAverage' },
  { reportName: 'newMotivationAverage' },
]
/** Dette endepunktet brukes i competence for å vise data fra kompteansekartleggingen som både sunburst-graf og stolpediagram */
export const competenceMapping = async ({
  data,
}: {
  data: CompetenceAndMotivationAverage[][]
}) => {
  const [competence, motivation] = data
  const competenceCategories = (data: CompetenceAndMotivationAverage[]) => {
    const categoriesMap = {}
    data.forEach((row) => {
      if (row.category in categoriesMap) {
        categoriesMap[row.category].children.push({
          category: `${row.category}: ${row.subCategory}`,
          value: row.value,
        })
        categoriesMap[row.category].value += row.value
      } else {
        categoriesMap[row.category] = {
          category: row.category,
          children: [],
          value: 0,
        }
      }
    })
    for (const key of Object.keys(categoriesMap)) {
      const categoryObj = categoriesMap[key]
      const avg = categoryObj.value / categoryObj.children.length
      categoryObj.children.forEach((child) => {
        child.size = (child.value / categoryObj.value) * avg
      })
      categoryObj.value = avg
    }
    return Object.values(categoriesMap)
  }

  return {
    setNames: ['Motivation', 'Competence'],
    sets: {
      Competence: competenceCategories(competence),
      Motivation: competenceCategories(motivation),
    },
  }
}

export const competenceAmountReports = [
  { reportName: 'employeeMotivationAndCompetence' },
]
/** Dette endepunktet henter antall ansatte i knowit som har svart 3 eller over på kompetanse og/eller motivasjon på kompetansekartleggingen
 * for de forskjellige kategoriene. Den regner også ut den prosentivse andelen som har svart 3 eller mer sammenlignet med alle om har svart.
 * Endepuktet brukes i Competence.tsx for å fremstille denne dataen som et stolpediagram.
 */
export const competenceAmount = async ({
  data,
}: {
  data: EmployeeMotivationAndCompetence[]
}) => {
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

export const employeeRadarReports = ({
  parameters: { email } = {},
}: ReportParams) => [
  {
    reportName: 'employeeMotivationAndCompetence',
    filter: { email },
  },
]
/** Dette endepunktet hetner data om hvordan en konulent har scoret på de forskjellige kategoriene på kompetansekartleggingen
 *  Det brukes i EmployeeInfo (utvidet tabell), og EmployeeSite (siden for hver enkelt ansatt)
 */
export const employeeRadar = async ({
  data,
}: {
  data: EmployeeMotivationAndCompetence[]
}) => {
  const competenceAndMotivation = data
  const categoriesMap = { mainCategories: {} }
  competenceAndMotivation.forEach((row) => {
    const {
      category,
      subCategory,
      categoryCompetenceAvg,
      categoryMotivationAvg,
      competence,
      motivation,
    } = row
    if (!(category in categoriesMap)) {
      categoriesMap[category] = {}
    }
    categoriesMap[category][subCategory] = {
      category: subCategory,
      motivation,
      competence,
    }
    categoriesMap['mainCategories'][category] = {
      category,
      motivation: categoryMotivationAvg,
      competence: categoryCompetenceAvg,
    }
  })
  const output = {}
  for (const category of Object.keys(categoriesMap)) {
    output[category] = Object.values(categoriesMap[category])
  }
  return {
    setNames: Object.keys(output),
    sets: output,
  }
}

export const competenceAreasReports = [
  { reportName: 'newCompetenceAverage' },
  { reportName: 'newMotivationAverage' },
]

export const competenceAreas = async ({
  data,
}: {
  data: CompetenceAndMotivationAverage[][]
}) => {
  const [competence, motivation] = data

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

export const hoursBilledPerCustomerReports = [{ reportName: 'perProject' }]

export const hoursBilledPerCustomer = async ({ data }) => {
  const groupByCustomer = {}

  data.forEach((perProject) => {
    const group = groupByCustomer[perProject.customer] || []
    group.push(perProject)
    groupByCustomer[perProject.customer] = group
  })

  const customerHours = Object.keys(groupByCustomer).map(
    (key) =>
      (groupByCustomer[key] = {
        kunde: key,
        timer: sum(groupByCustomer[key], 'hours'),
      })
  )

  return {
    setNames: ['Customers'],
    sets: {
      Customers: customerHours,
    },
  }
}

export const hoursBilledPerWeekReports = [{ reportName: 'perProject' }]

export const hoursBilledPerWeek = async ({ data }) => {
  const groupedByCustomer = {}

  data.forEach((elem) => {
    const group = groupedByCustomer[elem.customer] || []
    group.push(elem)
    groupedByCustomer[elem.customer] = group
  })

  Object.keys(groupedByCustomer).forEach((key) => {
    groupedByCustomer[key] = groupedByCustomer[key].map((data) => ({
      x: data.reg_period,
      y: data.hours,
    }))
  })

  Object.keys(groupedByCustomer).forEach((key) => {
    groupedByCustomer[key] = Array.from(
      groupedByCustomer[key].reduce(
        (m, { x, y }) => m.set(x, (m.get(x) || 0) + y),
        new Map()
      ),
      ([x, y]) => ({ x, y })
    ).sort((a, b) => b.x - a.x) // ascending sort of weeks
  })

  const lineGraphData = Object.entries(groupedByCustomer)
    .map(
      ([key, value]) =>
        ({
          type: 'LineChart',
          id: key,
          data: value,
        } as LineChartData)
    )
    .sort((a, b) => b.data.length - a.data.length) // ascending sort by number of week entries

  return {
    setNames: ['Lines'],
    sets: {
      Lines: lineGraphData,
    },
  }
}

export const customerCardsReports = [{ reportName: 'allProjectsOverview' }]

export const customerCards = async ({ data }) => data
