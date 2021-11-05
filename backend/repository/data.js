const {
  range,
  mergeEmployees,
} = require('./util')
const { v4: uuid } = require('uuid')
const e = require('express')
const { useState } = require('react')

/**
 *
 * @param {string} employeeUuid  Uuid that identifies the employee.
 * @param {object} categoryList  List of categories. Each category has a list of UUIDs, mapped to a score.
 *
 * @return {object} All categories with scores for the employee
 */
const getCategoryScoresForEmployee = (employeeEmail, categoryList) => {
  const employeeCategories = categoryList.filter(categoryRow => categoryRow.email === employeeEmail)
  const employeeMotivation = {}
  const employeeCompetence = {}
  employeeCategories.forEach(employeeRow => {
    employeeMotivation[[employeeRow.subCategory]] = employeeRow.motivation
    employeeCompetence[[employeeRow.subCategory]] = employeeRow.competence
  })
  return [employeeMotivation, employeeCompetence]
}

const getStorageUrl = (key) => {
  if (key !== undefined) {
    return `${process.env.STORAGE_URL}/${key}`
  }
  else {
    return undefined
  }
}

const getYear = () => {
  let currentDate = new Date()
  let currentYear = currentDate.getFullYear()

  return currentYear.toString();
}

const getWeek = () => { 
  let currentDate = new Date();
  let oneJan = new Date(getYear(), 0, 1)
  let numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000))
  let currentWeekNumber = Math.floor((currentDate.getDay() + 1 + numberOfDays) / 7)

  return currentWeekNumber.toString();
}

const statusColorCode = (wantNewProject, openForNewProject, inProject) => {
  const projectStatus = inProject ? "red" : "green";
  const color = (wantNewProject > openForNewProject) ? "yellow" : "orange"
  const statusColor = (wantNewProject || openForNewProject) > 0 ? color : projectStatus;
  
  return statusColor;
}

const findProjectStatusForEmployee = (jobRotationEmployees, employeeUBW, email) => {
  const currentRegPeriod = parseInt(getYear()+getWeek(), 10)
  const registeredHoursForEmployee = employeeUBW.filter((UBWObject) => UBWObject.email === email)
  const latestRegPeriod = parseInt(Math.max.apply(Math, registeredHoursForEmployee.map((object) => { return object.reg_period })), 10)
  let totalExternalProjectHours = 0
  let totalLocalProjectHours = 0

  /**Kan hende project_type ikke kommer til å ha disse navnene og at de bare var placeholdere. Da må i så fall skillet mellom prosjektene fjernes også telles det bare vanlig opp */
  registeredHoursForEmployee.forEach((object) => object.project_type==='External Projects' && object.reg_period === latestRegPeriod ? totalExternalProjectHours += object.hours : 0)
  registeredHoursForEmployee.forEach((object) => object.project_type==='Local Projects' && object.reg_period ===  latestRegPeriod ? totalLocalProjectHours += object.hours : 0)


  let wantNewProject,openForNewProject

  jobRotationEmployees.forEach((employee) => {
    if(employee.email == email){
      employee.index === 1 && (wantNewProject = employee.customscalevalue);
      employee.index === 2 && (openForNewProject = employee.customscalevalue);
    }
  })
  const inProjectStatus = ((currentRegPeriod - latestRegPeriod) < 5) && (totalExternalProjectHours > totalLocalProjectHours);
  const statusColor = statusColorCode(wantNewProject, openForNewProject, inProjectStatus);

  return statusColor;
}

exports.employeeTableReports = [
  { reportName: 'employeeInformation' },
  { reportName: 'employeeMotivationAndCompetence'},
  { reportName: 'jobRotationInformation'},
  { reportName: 'employeeDataUBW'}
]
/**Dette endepunktet henter dataen til ansatttabellene i Competence.tsx og Employee.tsx*/
exports.employeeTable = async ({ data }) => {
  const [allEmployees, motivationAndCompetence, jobRotation, employeeUBW] = data
  const mergedEmployees = mergeEmployees(allEmployees)
  return mergedEmployees.map(employee => (
    {
      rowId: uuid(),
      rowData: [
        {
          value: employee.navn,
          image: getStorageUrl(employee.image_key),
          competenceUrl: `/api/data/employeeCompetence?email=${encodeURIComponent(
            employee.email,
          )}`,
          email: employee.email,
          email_id: employee.email,
          user_id: employee.user_id,
          degree: employee.degree,
        },
        employee.title,
        findProjectStatusForEmployee(jobRotation, employeeUBW, employee.email),
        employee.customerArray.reduce((prevCustomer, thisCustomer) => {
          if (thisCustomer.weight < prevCustomer.weight) {
            return thisCustomer
          }
          else {
            return prevCustomer
          }
        }),
        Object.fromEntries(
          cvs.map(([lang, format]) => [
            `${lang}_${format}`,
            employee.link.replace('{LANG}', lang).replace('{FORMAT}', format),
          ]),
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

exports.employeeExperienceReports = ({ parameters: { user_id } = {} }) => [
  {
    reportName: 'projectExperience',
    filter: { user_id },
  },
]
/** Dette endepunktet henter data om ansattes prosjekterfating.
 * Brukes i EmployeeInfo.tsx (utvidet tabell) og EmployeeSite.tsx
 */
exports.employeeExperience = async ({ data }) => {
  const empExperience = data
  const formatTime = (year, month) =>
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

exports.employeeCompetenceReports = ({ parameters: { email } = {} }) => [
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
/** Dette endepunktet henter mer data om ansatte.
 *  Arbeidserfaring, ferdigheter, språk,  utdanning og roller fra CV-partner og nærmeste leder fra AD,
 *  Brukes i EmployeeInfo.tsx (utvidet tabell) og EmployeeSite.tsx
 */
exports.employeeCompetence = async ({ data }) => {
  const [resSkills, resEmp, resComp] = data
  const mergedRes = mergeEmployees(resComp)

  const mapTags = (skills) => {
    const mappedSkills = skills && skills.length > 0 ? skills[0] : {}
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

exports.fagtimerReports = [{ reportName: 'fagActivity' }]
/**Henter data om hvor mange fagtimer som er rapportert. Brukes i Competence.tsx */
exports.fagtimer = async ({ data }) => {
  const fagActivity = data
  const makeFagTimerDataForNivo = (data) => {
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

exports.experienceDistributionReports = [
  { reportName: 'yearsSinceSchoolDist' },
]
/** Dette endepunktet henter ut erfarings-fordelingen blant de ansatte.
 * Det brukes for å lage stolpe- og kakediagram i Competence.tsx
 */
exports.experienceDistribution = async ({ data }) => {
  const setInGroups = list => {
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

exports.ageDistributionReports = [
  { reportName: 'ageDistribution' },
  { reportName: 'ageDistributionGroups' },
]
/** Dette endepunktet henter ut aldersfordelingen blant de ansatte.
 * Det brukes for å lage et stolpediagram i Competence.tsx
 */
exports.ageDistribution = async ({ data }) => {
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

function getEventSet(events) {
  // Finds earliest and latest dates for creating a range of years
  const firstYear = new Date(
    Math.min(...events.map((event) => new Date(event.time_from)))
  ).getFullYear()
  const lastYear = new Date(
    Math.max(...events.map((event) => new Date(event.time_to)))
  ).getFullYear()

  const years = [] // Range of years in dataset, [2015, 2016, 2017, etc...]
  for (let year = parseInt(firstYear); year <= parseInt(lastYear); year++)
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

function dateRange(startDate, endDate) {
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

exports.fagEventsReports = [{ reportName: 'fagEvents' }]
/** Henter ut antall unike hendelser per uke i knowit events og Knowit Fagkalender
 * Brukes for å lage linjediagram i Competence.tsx
 */
exports.fagEvents = async ({ data }) => {
  const eventSet = getEventSet(data)

  return {
    setNames: ['Fag og hendelser'],
    sets: {
      'Fag og hendelser': eventSet,
    },
  }
}

exports.educationReports = [{ reportName: 'degreeDist' }]
exports.education = async ({ data }) => {
  const education = data

  return {
    setNames: ['Utdanning'],
    sets: {
      Utdanning: education,
    },
  }
}


exports.competenceFilterReports = [{ reportName: 'newCategories' }]
exports.competenceFilter = async ({ data }) => {
  return data.map(e => ({ category: e.category, subCategories: JSON.parse(e.subCategories) }))
}


exports.competenceMappingReports = [
  { reportName: 'newCompetenceAverage' },
  { reportName: 'newMotivationAverage' },
]
/** Dette endepunktet brukes i competence for å vise data fra kompteansekartleggingen som både sunburst-graf og stolpediagram */
exports.competenceMapping = async ({ data }) => {
  const [competence, motivation] = data
  const competenceCategories = (data) => {
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



exports.competenceAmountReports = [
  { reportName: 'employeeMotivationAndCompetence' },
]
/** Dette endepunktet henter antall ansatte i knowit som har svart 3 eller over på kompetanse og/eller motivasjon på kompetansekartleggingen
 * for de forskjellige kategoriene. Den regner også ut den prosentivse andelen som har svart 3 eller mer sammenlignet med alle om har svart.
 * Endepuktet brukes i Competence.tsx for å fremstille denne dataen som et stolpediagram.
 */
exports.competenceAmount = async ({ data }) => {
  const THRESHOLD=3
  const motAndComp = data
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

exports.empDataReports = ({ parameters: { email } = {} }) => [
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
exports.empData = async ({ data, parameters: { email } = {} }) => {
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

exports.employeeRadarReports = ({ parameters: { email } = {} }) => [
  {
    reportName: 'employeeMotivationAndCompetence',
    filter: { email },
  }
]
/** Dette endepunktet hetner data om hvordan en konulent har scoret på de forskjellige kategoriene på kompetansekartleggingen
 *  Det brukes i EmployeeInfo (utvidet tabell), og EmployeeSite (siden for hver enkelt ansatt)
 */
exports.employeeRadar = async ({ data }) => {
  const competenceAndMotivation = data
  categoriesMap = {'mainCategories': {}}
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


exports.competenceAreasReports = [
  { reportName: 'newCompetenceAverage' },
  { reportName: 'newMotivationAverage' },
]

exports.competenceAreas = async ({ data }) => {
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

