import { range, mergeEmployees, EmployeeInformation, sum } from './util'
import { v4 as uuid } from 'uuid'

/**
 *
 * @param {string} employeeUuid  Uuid that identifies the employee.
 * @param {object} categoryList  List of categories. Each category has a list of UUIDs, mapped to a score.
 *
 * @return {object} All categories with scores for the employee
 */

const getCategoryScoresForEmployee = (
  employeeEmail: string,
  categoryList: EmployeeMotivationAndCompetence[]) => {
  const employeeCategories = categoryList.filter(categoryRow => categoryRow.email === employeeEmail)
  const employeeMotivation = {}
  const employeeCompetence = {}
  employeeCategories.forEach(employeeRow => {
    employeeMotivation[employeeRow.subCategory] = employeeRow.motivation
    employeeCompetence[employeeRow.subCategory] = employeeRow.competence
  })
  return [employeeMotivation, employeeCompetence]
}
const getStorageUrl = (key: string) => {
  if (key !== undefined) {
    return `${process.env.STORAGE_URL}/${key}`
  }
  else {
    return undefined
  }
}

type EmployeeMotivationAndCompetence = {
  email: string,
  motivation: number,
  competence: number,
  subCategory: string,
  category: string,
  categoryMotivationAvg: number,
  categoryCompetenceAvg: number
}

type EmployeeTable ={
  data : [EmployeeInformation[], EmployeeMotivationAndCompetence[]]
}
export const employeeTableReports = [
  { reportName: 'employeeInformation' },
  { reportName: 'employeeMotivationAndCompetence' },
]
/**Dette endepunktet henter dataen til ansatttabellene i Competence.tsx og Employee.tsx*/
export const employeeTable = async ({data}: EmployeeTable ) => {
  const [allEmployees, motivationAndCompetence] = data
  const mergedEmployees = mergeEmployees(allEmployees)
  return mergedEmployees.map(employee => ({
    rowId: uuid(),
    rowData: [
      {
        value: employee.navn,
        image: getStorageUrl(employee.image_key),
        competenceUrl: `/api/data/employeeCompetence?email=${encodeURIComponent(
          employee.email
        )}`,
        email: employee.email,
        email_id: employee.email,
        user_id: employee.user_id,
        degree: employee.degree,
      },
      employee.title,
      'red',
      employee.customerArray.reduce((prevCustomer, thisCustomer) => {
        if (thisCustomer.weight < prevCustomer.weight) {
          return thisCustomer
        }
        return prevCustomer
      }),
      Object.fromEntries(
        cvs.map(([lang, format]) => [
          `${lang}_${format}`,
          employee.link.replace('{LANG}', lang).replace('{FORMAT}', format),
        ])
      ),
      getCategoryScoresForEmployee(employee.email, motivationAndCompetence)[0],
      getCategoryScoresForEmployee(employee.email, motivationAndCompetence)[1],
    ],
  }))
}

const cvs = [
  ['no', 'pdf'],
  ['int', 'pdf'],
  ['no', 'word'],
  ['int', 'word'],
]

type ReportParams = {
  parameters: {
    user_id?: string,
    email?: string
    customer?: string
  }
}
export const employeeExperienceReports = ({ parameters: { user_id } = {} }: ReportParams) => [
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
    user_id: string,
    navn: string,
    customer: string,
    description: string,
    year_from: number,
    year_to: number,
    month_from: number,
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

export const employeeCompetenceReports = ({ parameters: { email } = {} }: ReportParams) => [
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
type EmployeeSkills = {
  user_id: string,
  email: string,
  language: string,
  skill: string,
  role: string
}
type WorkExperience = {
  user_id: string,
  email: string,
  employer: string,
  month_from: number,
  month_to: number,
  year_from: number,
  year_to: number
}

type EmployeeData = {
  data:[EmployeeSkills[], WorkExperience[], EmployeeInformation[]]
}

/** Dette endepunktet henter mer data om ansatte.
 *  Arbeidserfaring, ferdigheter, språk,  utdanning og roller fra CV-partner og nærmeste leder fra AD,
 *  Brukes i EmployeeInfo.tsx (utvidet tabell) og EmployeeSite.tsx
 */
export const employeeCompetence = async ({ data }: EmployeeData) => {
  const [resSkills, resEmp, resComp] = data
  const mergedRes = mergeEmployees(resComp)

  const mapTags = (skills: EmployeeSkills[]) => {
    const mappedSkills = skills && skills.length > 0 ? skills[0] : {} as EmployeeSkills
    return {
      languages: mappedSkills.language ? mappedSkills.language.split(';') : [],
      skills: mappedSkills.skill ? mappedSkills.skill.split(';') : [],
      roles: mappedSkills.role ? mappedSkills.role.split(';') : [],
    }
  }

  return {
    workExperience: resEmp,
    tags: mapTags(resSkills),
    manager: mergedRes[0].manager,
    guid: mergedRes[0].guid,
  }
}

type FagActivity = {
  year: number,
  week: number,
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
    componentType: 'Line',
    setNames: ['Fagtimer'],
    sets: {
      Fagtimer: makeFagTimerDataForNivo(fagActivity),
    },
  }
}

export const experienceDistributionReports = [
  { reportName: 'yearsSinceSchoolDist' },
]

type YearsSinceSchoolDist = {
  years: number,
  count: number
}
/** Dette endepunktet henter ut erfarings-fordelingen blant de ansatte.
 * Det brukes for å lage stolpe- og kakediagram i Competence.tsx
 */
export const experienceDistribution = async ({ data }:{ data: YearsSinceSchoolDist[] }) => {
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
    ]

    const groupedList = [
      { years: 'Under 1 år', count: 0 },
      { years: '1 til 2 år', count: 0 },
      { years: '3 til 5 år', count: 0 },
      { years: '6 til 10 år', count: 0 },
      { years: 'over 10 år', count: 0 },
    ]

    list.forEach((item) => {
      const years = Number(item.years)
      const count = Number(item.count)
      if (years === 0) {
        detailedGroupedList[0].count += count
        groupedList[0].count += count
      } else if (years === 1) {
        detailedGroupedList[0].count += count
        groupedList[1].count += count
      } else if (years === 2) {
        detailedGroupedList[1].count += count
        groupedList[1].count += count
      } else if (years > 2 && years < 6) {
        detailedGroupedList[1].count += count
        groupedList[2].count += count
      } else if (years > 5 && years < 11) {
        detailedGroupedList[2].count += count
        groupedList[3].count += count
      } else if (years > 10 && years < 16) {
        detailedGroupedList[3].count += count
        groupedList[4].count += count
      } else if (years > 15 && years < 21) {
        detailedGroupedList[4].count += count
        groupedList[4].count += count
      } else if (years > 20 && years < 26) {
        detailedGroupedList[5].count += count
        groupedList[4].count += count
      } else if (years > 25 && years < 31) {
        detailedGroupedList[6].count += count
        groupedList[4].count += count
      } else if (years > 30) {
        detailedGroupedList[7].count += count
        groupedList[4].count += count
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
  age: number,
  count: number
}

type AgeDistributionGroups = {
  age_group: number,
  count: number
}
/** Dette endepunktet henter ut aldersfordelingen blant de ansatte.
 * Det brukes for å lage et stolpediagram i Competence.tsx
 */
export const ageDistribution = async ({ data }: { data: [AgeDistribution[], AgeDistributionGroups[]] }) => {
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

function getEventSet(events: { time_from: string ,time_to: string }[]) {
  // Finds earliest and latest dates for creating a range of years

  const firstYear = new Date(
    Math.min(...events.map((event) => new Date(event.time_from).getTime()))
  ).getFullYear()
  const lastYear = new Date(
    Math.max(...events.map((event) => new Date(event.time_to).getTime()))
  ).getFullYear()

  const years: number[] = [] // Range of years in dataset, [2015, 2016, 2017, etc...]
  for (let year = (firstYear); year <= (lastYear); year++)
    years.push(year)

  const set = []
  years.map((year) =>
    set.push({
      id: year,
      data: [
        { x: 'Jan', y: 0 },
        { x: 'Feb', y: 0 },
        { x: 'Mar', y: 0 },
        { x: 'Apr', y: 0 },
        { x: 'Mai', y: 0 },
        { x: 'Jun', y: 0 },
        { x: 'Jul', y: 0 },
        { x: 'Aug', y: 0 },
        { x: 'Sep', y: 0 },
        { x: 'Okt', y: 0 },
        { x: 'Nov', y: 0 },
        { x: 'Des', y: 0 },
      ],
    })
  )

  events.map((event) => {
    // Gets the start and end times for an event, 2020-01-01 - 2020-02-03
    const [fromDate] = event.time_from.split(' ')
    const [toDate] = event.time_to.split(' ')

    // Returns each month the event spans across. 2020-01-01 - 2020-02-03 would return [1, 2]
    const dates = dateRange(fromDate, toDate)

    const year = parseInt(dates[0].substring(0, 4))
    const numMonths = dates.map((date) => parseInt(date.substring(5, 7)))

    // Stores the year of the event and the spanning months
    const dataObject = {
      year: year,
      months: numMonths,
    }

    // Maps each event to a specific year and increases the event counter for the relevant months
    set.map((i) => {
      if (i.id === dataObject.year) {
        dataObject.months.map((j) => {
          i.data[j - 1].y++
        })
      }
    })
  })

  return set
}

function dateRange(startDate: string, endDate: string) {
  const start = startDate.split('-')
  const end = endDate.split('-')
  const startYear = parseInt(start[0])
  const endYear = parseInt(end[0])
  const dates = []

  for (let i = startYear; i <= endYear; i++) {
    const endMonth = i !== endYear ? 11 : parseInt(end[1]) - 1
    const startMon = i === startYear ? parseInt(start[1]) - 1 : 0
    for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      const month = j + 1
      const displayMonth = month < 10 ? '0' + month : month
      dates.push([i, displayMonth, '01'].join('-'))
    }
  }

  return dates
}

type FagEvent = {
  event_summary: string,
  time_from: string,
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
  degree: string,
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
  category: string,
  subCategories: string
}

export const competenceFilterReports = [{ reportName: 'newCategories' }]
export const competenceFilter = async ({ data }: { data: NewCategories[] }) => {
  return data.map(e => ({ category: e.category, subCategories: JSON.parse(e.subCategories) }))
}


type CompetenceAndMotivationAverage = {
  value: number,
  subCategory: string,
  category: string
}

export const competenceMappingReports = [
  { reportName: 'newCompetenceAverage' },
  { reportName: 'newMotivationAverage' },
]
/** Dette endepunktet brukes i competence for å vise data fra kompteansekartleggingen som både sunburst-graf og stolpediagram */
export const competenceMapping = async ({ data }: { data: CompetenceAndMotivationAverage[][] }) => {
  const [competence, motivation] = data
  const competenceCategories = (data: CompetenceAndMotivationAverage[]) => {
    const categoriesMap = {}
    data.forEach(row => {
      if (row.category in categoriesMap) {
        categoriesMap[row.category].children.push({ category: `${row.category}: ${row.subCategory}`, value: row.value })
        categoriesMap[row.category].value += row.value
      }
      else {
        categoriesMap[row.category] = {
          category: row.category,
          children: [],
          value: 0
        }
      }
    })
    for (const key of Object.keys(categoriesMap)) {
      const categoryObj = categoriesMap[key]
      const avg = categoryObj.value / categoryObj.children.length
      categoryObj.children.forEach(child => {
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
export const competenceAmount = async ({ data }: { data: EmployeeMotivationAndCompetence[] }) => {
  const THRESHOLD=3
  /*const motAndComp = data*/
  const categoriesMap = {'mainCategories': {}}
  // used to ensure that each participant is only counted once for each main category and to count the number of distinct participants
  const emailMap = {}
  data.forEach(employeeRow => {
    const { categoryMotivationAvg, categoryCompetenceAvg, category, subCategory, motivation, competence, email } = employeeRow

    if (!(category in categoriesMap)) {
      categoriesMap['mainCategories'][category] = {'competenceAmount': 0, 'motivationAmount': 0, category: category}
      categoriesMap[category] = {}
    }

    if (!(subCategory in categoriesMap[category])) {
      categoriesMap[category][subCategory] = {'competenceAmount': 0, 'motivationAmount': 0, category: subCategory}
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
      const { motivationAmount, competenceAmount } = categoriesMap[category][subCategory]
      categoriesMap[category][subCategory]['motivationProportion'] = motivationAmount/nParticipants*100
      categoriesMap[category][subCategory]['competenceProportion'] = competenceAmount/nParticipants*100
    }
    output[category] = Object.values(categoriesMap[category])
  }

  return {
    setNames: Object.keys(output),
    sets: output,
  }
}

export const empDataReports = ({ parameters: { email } = {} }: ReportParams) => [
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
/** Dette endepunktet henter data om en enkelt person for å fylle opp sidene for hver enkelt ansatt.  */
export const empData = async ({ data }: EmployeeData) => {
  const [resSkills, resWork, resComp] = data
  const emp = mergeEmployees(resComp)[0]

  return {
    email_id: emp.email,
    user_id: emp.user_id,
    employee: emp,
    image: getStorageUrl(emp.image_key),
    workExperience: resWork,
    tags: resSkills[0],
    degree: resComp[0].degree,
    manager: resComp[0].manager,
    links: Object.fromEntries(
      cvs.map(([lang, format]) => [
        `${lang}_${format}`,
        emp.link.replace('{LANG}', lang).replace('{FORMAT}', format),
      ])
    ),
    customerArray: emp.customerArray,
  }
}

export const employeeRadarReports = ({ parameters: { email } = {} }: ReportParams) => [
  {
    reportName: 'employeeMotivationAndCompetence',
    filter: { email },
  }
]
/** Dette endepunktet hetner data om hvordan en konulent har scoret på de forskjellige kategoriene på kompetansekartleggingen
 *  Det brukes i EmployeeInfo (utvidet tabell), og EmployeeSite (siden for hver enkelt ansatt)
 */
export const employeeRadar = async ({ data }:{ data: EmployeeMotivationAndCompetence[] }) => {
  const competenceAndMotivation = data
  const categoriesMap = {'mainCategories': {}}
  competenceAndMotivation.forEach(row => {
    const { category, subCategory, categoryCompetenceAvg, categoryMotivationAvg, competence, motivation } = row
    if (!(category in categoriesMap)) {
      categoriesMap[category] = {}
    }
    categoriesMap[category][subCategory] = {category: subCategory, motivation, competence}
    categoriesMap['mainCategories'][category] = {category, motivation: categoryMotivationAvg, competence: categoryCompetenceAvg}
  })
  const output = {}
  for (const category of Object.keys(categoriesMap)) {
    output[category] = Object.values(categoriesMap[category])
  }
  return {
    setNames: Object.keys(output),
    sets: output
  }
}


export const competenceAreasReports = [
  { reportName: 'newCompetenceAverage' },
  { reportName: 'newMotivationAverage' },
]

export const competenceAreas = async ({ data }: { data: CompetenceAndMotivationAverage[][] }) => {
  const [competence, motivation] = data

  const categoriesMap = {mainCategories: {}}

  competence.forEach(row => {
    const { category, subCategory } = row
    const competence = row.value || null
    if (!(category in categoriesMap)) {
      categoriesMap[category] = {}
      categoriesMap['mainCategories'][category] = { category, motivation: 0, competence: 0 }
    }
    categoriesMap[category][subCategory] = { category: subCategory, competence, motivation: null }
    categoriesMap['mainCategories'][category].competence += competence
  })

  motivation.forEach(row => {
    const { category, subCategory } = row
    const motivation = row.value || null
    if (!(category in categoriesMap)) {
      categoriesMap[category] = {}
      categoriesMap['mainCategories'][category] = { category, motivation: 0, competence: 0 }
    }
    if (subCategory in categoriesMap[category]) {
      categoriesMap[category][subCategory].motivation = motivation
    } else {
      categoriesMap[category][subCategory] = { category: subCategory, competence: null, motivation }
    }
    categoriesMap['mainCategories'][category].motivation += motivation
  })

  const output = {}
  for (const category of Object.keys(categoriesMap)) {
    if (category !== 'mainCategories') {
      categoriesMap['mainCategories'][category].competence /= Object.keys(categoriesMap[category]).length
      categoriesMap['mainCategories'][category].motivation /= Object.keys(categoriesMap[category]).length
    }
    output[category] = Object.values(categoriesMap[category])
  }
  return {
    setNames: Object.keys(output),
    sets: output
  }

}

export const hoursBilledPerCustomerReports = [{ reportName: 'perProject' }]

export const hoursBilledPerCustomer = async ({ data }) => {
  const groupByCustomer = {}

  data.forEach((perProject) => {
    const group = groupByCustomer[perProject.costumer] || []
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

type LineGraphData = {
  id: string
  data: Array<any>
}

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
          id: key,
          data: value,
        } as LineGraphData)
    )
    .sort((a, b) => b.data.length - a.data.length) // ascending sort by number of week entries

  return {
    setNames: ['Lines'],
    sets: {
      Lines: lineGraphData,
    },
  }
}

type ProjectsCustomer = {
  customer: string,
  reg_period: number,
  total_hours: number,
  timestamp: number,
  work_order: string,
  work_order_description: string,
  num_of_employees: number
}

type ProjectCustomerResponse = {
  data: ProjectsCustomer[],
  parameters: { [key: string]: any }
}

export const projectsCustomerReports = ({ parameters: { customer } = {} }: ReportParams) => [
  {
    reportName: 'customerProjects',
    filter: { customer }
  },
]

export const projectsCustomer = async (response: ProjectCustomerResponse) => {
  const allTotalHours = response.data.reduce(
    (m, {work_order, total_hours}) =>
      m.set(work_order, (m.get(work_order) || 0) + total_hours), new Map)

  return response.data.map(project => {
    return {
      rowId: uuid(),
      rowData: [
        project.work_order_description,
        project.num_of_employees,
        project.total_hours,
        allTotalHours.get(project.work_order)
      ]
    }})
}

export const customerHoursBilledReports = ({ parameters: { customer } = {} }: ReportParams) => [
  {
    reportName: 'customerHoursBilled',
    filter: { customer }
  },
]

export const customerHoursBilled = async ({ data }) => {
  return {
    setNames: ['Timer'],
    sets: {
      Timer: data,
    },
  }
}

export const customerMotivationKnowledgeReports = ({ parameters: { customer } = {} }: ReportParams) => [
  {
    reportName: 'customerMotivationKnowledge',
    filter: { customer }
  },
]

export const customerMotivationKnowledge = async ({ data }) => {
  return {
    setNames: ['Motivation'],
    sets: {
      Motivation: data
    }
  }
}


export const customerSiteTableReports = ({ parameters: { customer } = {} }: ReportParams) => [
  {
    reportName: 'employeeInformation',
    filter: {customer}
  },
  {
    reportName: 'employeeMotivationAndCompetence',
  },
]
export const customerSiteTable = async ({data}: EmployeeTable ) => {
  const [allEmployees, motivationAndCompetence] = data
  const mergedEmployees = mergeEmployees(allEmployees)
  return mergedEmployees.map(employee => ({
    rowId: uuid(),
    rowData: [
      {
        value: employee.navn,
        image: getStorageUrl(employee.image_key),
        competenceUrl: `/api/data/employeeCompetence?email=${encodeURIComponent(
          employee.email
        )}`,
        email: employee.email,
        email_id: employee.email,
        user_id: employee.user_id,
        degree: employee.degree,
      },
      employee.title,
      employee.work_order_description,
      employee.customerArray.reduce((prevCustomer, thisCustomer) => {
        if (thisCustomer.weight < prevCustomer.weight) {
          return thisCustomer
        }
        return prevCustomer
      }),
      Object.fromEntries(
        cvs.map(([lang, format]) => [
          `${lang}_${format}`,
          employee.link.replace('{LANG}', lang).replace('{FORMAT}', format),
        ])
      ),
      getCategoryScoresForEmployee(employee.email, motivationAndCompetence)[0],
      getCategoryScoresForEmployee(employee.email, motivationAndCompetence)[1],
    ],
  }))
}
