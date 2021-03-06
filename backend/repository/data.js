const {
  getSecret,
  makeEmailUuid,
  range,
  reStructCategories,
  mergeEmployees,
} = require('./util')
const { v4: uuid } = require('uuid')

/**
 *
 * @param {string} employeeUuid  Uuid that identifies the employee.
 * @param {object} categoryList  List of categories. Each category has a list of UUIDs, mapped to a score.
 *
 * @return {object} All categories with scores for the employee
 */
const getCategoryScoresForEmployee = (employeeUuid, categoryList) =>
  categoryList.reduce((categoryScores, thisCategory) => {
    // name of categories is stored as 'category' for motivation and 'categories' for competence
    const categoryName = thisCategory.category || thisCategory.categories
    const categoryScore = thisCategory[employeeUuid]
    return {
      ...categoryScores,
      [categoryName]: categoryScore,
    }
  }, {})

const getStorageUrl = (key) => `${process.env.STORAGE_URL}/${key}`

exports.employeeTableReports = [
  { reportName: 'employeeInformation' },
  { reportName: 'employeeMotivation' },
  { reportName: 'employee_competence' },
]
/**Dette endepunktet henter dataen til ansatttabellene i Competence.tsx og Employee.tsx*/
exports.employeeTable = async ({ data }) => {
  const [allEmployees, motivationData, competenceData] = data
  const salt = await getSecret('/folk-webapp/KOMPETANSEKARTLEGGING_SALT', {
    encrypted: true,
  })
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
        email_id: makeEmailUuid(employee.email, salt),
        user_id: employee.user_id,
        degree: employee.degree,
      },
      employee.title,
      'red',
      employee.customerArray.reduce((prevCustomer, thisCustomer) => {
        if(thisCustomer.weight < prevCustomer.weight) {
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
      getCategoryScoresForEmployee(
        makeEmailUuid(employee.email, salt).slice(0, 8),
        motivationData
      ),
      getCategoryScoresForEmployee(
        makeEmailUuid(employee.email, salt),
        competenceData
      ),
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

/** This exports a lits of all categories and subcategories for the
 * competence mapping. Its used to define the options in the
 * filter dropdown menu.
 */
exports.competenceFilterReports = [{ reportName: 'categories' }]
exports.competenceFilter = async ({ data }) => {
  const categories = data
  // Categories structure
  const output = []
  // Get the main categories
  const mainCategories = new Set(
    categories.flatMap((item) => Object.keys(item))
  )
  mainCategories.forEach((name) => {
    const categoryObject = {
      category: name,
      subCategories: [],
    }

    // Get child categories
    categories.forEach((item) => {
      const childName = item[name]
      if (childName) {
        categoryObject.subCategories.push(childName)
      }
    })
    output.push(categoryObject)
  })

  return output
}

exports.competenceMappingReports = [
  { reportName: 'categories' },
  { reportName: 'competenceAverage' },
  { reportName: 'motivationAverage' },
]
/** Dette endepunktet brukes i competence for å vise data fra kompteansekartleggingen som både sunburst-graf og stolpediagram */
exports.competenceMapping = async ({ data }) => {
  const [categories, competence, motivation] = data

  const competenceCategories = (data) => {
    // Categories structure
    const output = []

    // Get the main categories
    const mainCategories = new Set(
      categories.flatMap((item) => Object.keys(item))
    )

    mainCategories.forEach((name) => {
      const categoryObject = {
        kategori: name,
        verdi: 0,
        children: [],
      }
      // Get child categories
      var sumOfCategories = 0
      categories.forEach((item) => {
        const childName = item[name]
        if (childName) {
          // Create child category and merge competence data
          const value = data[0][childName.toLowerCase()] || null
          const childCategoryObject = {
            kategori: childName,
            verdi: value,
          }
          sumOfCategories += value
          categoryObject.children.push(childCategoryObject)
        }
      })

      const avgValue = sumOfCategories / categoryObject.children.length
      categoryObject.children.forEach((child) => {
        child.size = (child.verdi / sumOfCategories) * avgValue
      })

      categoryObject.verdi = avgValue
      output.push(categoryObject)
    })

    return output
  }

  return {
    setNames: ['Kompetanse', 'Motivasjon'],
    sets: {
      Kompetanse: competenceCategories(competence),
      Motivasjon: competenceCategories(motivation),
    },
  }
}

const getAmountOverOrEqualToX = (data, x, katName, compOrMot) => {
  const result = []
  const verdiNavn = compOrMot + 'verdi'
  const andelNavn = compOrMot + 'andel'
  data.map((cat) => {
    const thisCatRes = {
      kategori: cat[katName],
      [verdiNavn]: 0,
    }
    Object.entries(cat).forEach((person) => {
      if (person[0] !== katName && person[1] >= x) {
        thisCatRes[verdiNavn] += 1
      }
    })
    thisCatRes[andelNavn] =
      (thisCatRes[verdiNavn] / (Object.keys(cat).length - 1)) * 100
    result.push(thisCatRes)
  })
  return result
}

exports.competenceAmountReports = [
  { reportName: 'categories' },
  { reportName: 'employee_competence' },
  { reportName: 'employeeMotivation' },
]
/** Dette endepunktet henter antall ansatte i knowit som har svart 3 eller over på kompetanse og/eller motivasjon på kompetansekartleggingen
 * for de forskjellige kategoriene. Den regner også ut den prosentivse andelen som har svart 3 eller mer sammenlignet med alle om har svart. 
 * Endepuktet brukes i Competence.tsx for å fremstille denne dataen som et stolpediagram.
 */
exports.competenceAmount = async ({ data }) => {
  const [categories, allComp, allMot] = data
  const compAmount = getAmountOverOrEqualToX(allComp, 3, 'categories', 'kompetanse')
  const motAmount = getAmountOverOrEqualToX(allMot, 3, 'category', 'motivasjon')
  const [catSet, setNames] = reStructCategories(categories, compAmount, motAmount)

  return {
    setNames: setNames,
    sets: catSet,
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
  const salt = await getSecret('/folk-webapp/KOMPETANSEKARTLEGGING_SALT', {
    encrypted: true,
  })

  return {
    email_id: makeEmailUuid(email, salt),
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

exports.employeeRadarReports = ({ parameters: { user_id } = {} }) => [
  {
    reportName: 'categories',
  },
  {
    reportName: 'employeeMotivation',
  },
  {
    reportName: 'employee_competence',
  },
]
/** Dette endepunktet hetner data om hvordan en konulent har scoret på de forskjellige kategoriene på kompetansekartleggingen 
 *  Det brukes i EmployeeInfo (utvidet tabell), og EmployeeSite (siden for hver enkelt ansatt)
 */
exports.employeeRadar = async ({ data, parameters: { user_id } = {} }) => {
  const [categories, empMotivation, empCompetence] = data

  const thisMotivation = []
  empMotivation.forEach((item) => {
    thisMotivation.push({
      kategori: item['category'],
      motivasjon: item[user_id.slice(0, 8)],
    })
  })

  const thisCompetence = []
  empCompetence.forEach((item) => {
    thisCompetence.push({
      kategori: item['categories'],
      kompetanse: item[user_id],
    })
  })

  const [structuredCats, setNames] = reStructCategories(
    categories,
    thisCompetence,
    thisMotivation
  )

  return {
    setNames: setNames,
    sets: structuredCats,
  }
}

exports.competenceAreasReports = [
  { reportName: 'categories' },
  { reportName: 'competenceAverage' },
  { reportName: 'motivationAverage' },
]
/** Dette endepunktet hetner gjennomsnittsdata om hvordan ansatte har scoret på de forskjellige kategoriene på kompetansekartleggingen 
 *  Det brukes i Competence for å vise radar- og stolpediagram. 
 */
exports.competenceAreas = async ({ data }) => {
  const [categories, competence, motivation] = data
  const thisCompetence = []
  const thisMotivation = []

  const mainCategories = new Set(
    categories.flatMap((item) => Object.keys(item))
  )

  mainCategories.forEach((name) => {
    const compCategory = {
      kategori: name.charAt(0).toUpperCase() + name.slice(1),
      kompetanse: 0,
    }
    const motCategory = {
      kategori: name.charAt(0).toUpperCase() + name.slice(1),
      motivasjon: 0,
    }

    let categoryComp = 0
    let categoryMot = 0
    let numberOfSubCategories = 0

    categories.forEach(item => {
      const childName = item[name]
      if (childName) {
        const compValue = competence[0][childName.toLowerCase()] || null
        const motValue = motivation[0][childName.toLowerCase()] || null

        categoryComp += compValue
        categoryMot += motValue
        numberOfSubCategories++

        const childCatComp = {
          kategori: childName,
          kompetanse: compValue,
        }
        const childCatMot = {
          kategori: childName,
          motivasjon: motValue,
        }

        thisCompetence.push(childCatComp)
        thisMotivation.push(childCatMot)
      }
    })

    compCategory.kompetanse = categoryComp / numberOfSubCategories
    motCategory.motivasjon = categoryMot / numberOfSubCategories
    thisCompetence.push(compCategory)
    thisMotivation.push(motCategory)
  })

  const [structuredCats, setNames] = reStructCategories(
    categories,
    thisCompetence,
    thisMotivation
  )

  return {
    setNames: setNames,
    sets: structuredCats,
  }
}
