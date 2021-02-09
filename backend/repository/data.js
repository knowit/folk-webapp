const { getSecret, makeEmailUuid, range } = require('./util');
const { v4: uuid } = require('uuid');
const MOTIVATION_THRESHOLD = 4;
const COMPETENCE_THRESHOLD = 3;

/**
 *
 * @param {string} uuidComp      A string of the uuid of the person.
 * @param {number} threshold     The threshold (number between 0-5) for deciding whether a category should be put in the list or not.
 * @param {object} categoryList List of categories. In each category there is a list of uuids, and their motivation on a scale from 0-5.
 *
 * @return {object} List of all categories where the motivation is higher than the threshold
 */
const getThisEmployeeMotivationList = (uuidComp, threshold, categoryList) => {
  const skillList = [];
  categoryList.forEach((category) => {
    const cat = category.category || category.categories; //name of categories is category for motivation and categories for competence
    category[uuidComp] >= threshold && skillList.push(cat);
  });

  return skillList;
};

const getStorageUrl = (key) => `${process.env.STORAGE_URL}/${key}`;


exports.projectStatusReports = [
  { reportName: 'competence' },
  { reportName: 'employeeMotivation' },
  { reportName: 'employee_competence' },
];
exports.projectStatus = async ({ data }) => {
  const [allEmployees, resMotivation, resCompetence] = data
  const salt = await getSecret('/folk-webapp/KOMPETANSEKARTLEGGING_SALT', {
    encrypted: true,
  });
  return allEmployees.map((employee) => ({
    rowId: uuid(),
    rowData: [
      {
        value: employee.navn,
        image: getStorageUrl(employee.image_key),
        competenceUrl: `/api/data/employeeCompetence?email=${encodeURIComponent(
          employee.email
        )}`,
        email: employee.email,
      },
      employee.title,
      0,
      { value: null, status: null },
      getThisEmployeeMotivationList(
        makeEmailUuid(employee.email, salt).slice(0, 8),
        MOTIVATION_THRESHOLD,
        resMotivation
      ),
      getThisEmployeeMotivationList(
        makeEmailUuid(employee.email, salt),
        COMPETENCE_THRESHOLD,
        resCompetence
      ),
    ],
  }));
};

const cvs = [
  ['no', 'pdf'],
  ['int', 'pdf'],
  ['no', 'word'],
  ['int', 'word'],
];
exports.competenceReports = [
  { reportName: 'competence' },
  { reportName: 'employeeMotivation' },
  { reportName: 'employee_competence' },
];
exports.competence = async ({ data }) => {
  const [allEmployees, resMotivation, resCompetence] = data
  const salt = await getSecret('/folk-webapp/KOMPETANSEKARTLEGGING_SALT', {
    encrypted: true,
  });

  return allEmployees.map((employee) => ({
    rowId: uuid(),
    rowData: [
      {
        value: employee.navn,
        image: getStorageUrl(employee.image_key),
        competenceUrl: `/api/data/employeeCompetence?email=${encodeURIComponent(
          employee.email
        )}`,
        email: employee.email,
      },
      employee.title,
      `/api/data/employeeExperience?user_id=${employee.user_id}`,
      employee.degree,
      Object.fromEntries(
        cvs.map(([lang, format]) => [
          `${lang}_${format}`,
          employee.link.replace('{LANG}', lang).replace('{FORMAT}', format),
        ])
      ),
      getThisEmployeeMotivationList(
        makeEmailUuid(employee.email, salt).slice(0, 8),
        MOTIVATION_THRESHOLD,
        resMotivation
      ),
      getThisEmployeeMotivationList(
        makeEmailUuid(employee.email, salt),
        COMPETENCE_THRESHOLD,
        resCompetence
      ),
    ],
  }));
};


exports.employeeExperienceReports = ({
  parameters: { user_id } = {}
}) => ([
  {
    reportName: 'projectExperience',
    filter: { user_id },
  }
])
exports.employeeExperience = async ({ data }) => {
  const empExperience = data
  const formatTime = (year, month) =>
    [
      year && year > 0 ? year : '',
      year && year > 0 && month && month > 0 ? `/${month}` : '',
    ].join('');

  return {
    name: empExperience.length > 0 ? empExperience[0].navn : '',
    experience: empExperience.reverse().map((exp) => ({
      customer: exp.customer,
      project: exp.description,
      time_from: formatTime(exp.year_from, exp.month_from),
      time_to: formatTime(exp.year_to, exp.month_to),
    })),
  };
};

exports.employeeCompetenceReports = ({
  parameters: { email } = {}
}) => ([
  {
    reportName: 'categorizedMotivation'
  },
  {
    reportName: 'employeeSkills',
    filter: { email },
  },
  {
    reportName: 'workExperience',
    filter: { email },
  },
])
exports.employeeCompetence = async ({ data, parameters: { email } = {} }) => {
  const [resMotivation, resSkills, resEmp] = data
  const catMotivation = {};

  // Get salt
  const salt = await getSecret('/folk-webapp/KOMPETANSEKARTLEGGING_SALT', {
    encrypted: true,
  });
  const uuidComp = makeEmailUuid(email, salt);

  resMotivation.map((category) => {
    catMotivation[category.category] = category[uuidComp.slice(0, 8)];
  });

  const mapTags = (skills) => {
    const mappedSkills = skills && skills.length > 0 ? skills[0] : {};
    return {
      languages: mappedSkills.language ? mappedSkills.language.split(';') : [],
      skills: mappedSkills.skill ? mappedSkills.skill.split(';') : [],
      roles: mappedSkills.role ? mappedSkills.role.split(';') : [],
    };
  };

  return {
    motivation: catMotivation,
    workExperience: resEmp,
    tags: mapTags(resSkills),
  };
};

exports.resourceType = async () => {
  return {
    componentType: null,
    setNames: [],
    sets: {},
  };
};

exports.experience = async () => {
  return {
    componentType: null,
    setNames: [],
    sets: {},
  };
};

exports.outbound = async () => {
  return {
    componentType: null,
    setNames: [],
    sets: {},
  };
};

exports.inbound = async () => {
  return {
    componentType: null,
    setNames: [],
    sets: {},
  };
};

exports.fagtimerReports = [
  { reportName: 'categorizedMotivation' }
]
exports.fagtimer = async ({ data }) => {
  const fagActivity = data;
  const makeFagTimerDataForNivo = data => {
    const setData = range(2018, new Date().getFullYear()).map(
      year => ({
        id: year.toString(),
        data: range(1, 53).map(
          i => {
            const currentYear = data.filter((dataItem) => dataItem.year === year);
            const currentWeekData = currentYear.find(
              dataItem => dataItem.week === i
            );

            return {
              x: i,
              y: currentWeekData && currentWeekData.used_hrs
                ? currentWeekData.used_hrs
                : 0,
            };
          }
        ),
      })
    );

    return setData;
  }

  return {
    componentType: 'Line',
    setNames: ['Fagtimer'],
    sets: {
      Fagtimer: makeFagTimerDataForNivo(fagActivity),
    },
  };
};

exports.competenceSum = async () => {
  return {
    componentType: null,
    setNames: [],
    sets: {},
  };
};

exports.experienceDistributionReports = [
  { reportName: 'yearsSinceSchoolDist' },
];
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
    ];

    const groupedList = [
      { years: 'Under 1 år', count: 0 },
      { years: '1 til 2 år', count: 0 },
      { years: '3 til 5 år', count: 0 },
      { years: '6 til 10 år', count: 0 },
      { years: 'over 10 år', count: 0 },
    ]

    list.forEach((item) => {
      const years = Number(item.years);
      const count = Number(item.count);
      if (years === 0){
        detailedGroupedList[0].count += count;
        groupedList[0].count += count;
      }else if (years === 1) {
        detailedGroupedList[0].count += count;
        groupedList[1].count += count;
      }else if (years === 2) {
        detailedGroupedList[1].count += count;
        groupedList[1].count += count;
      } else if (years > 2 && years < 6) {
        detailedGroupedList[1].count += count;
        groupedList[2].count += count;
      } else if (years > 5 && years < 11) {
        detailedGroupedList[2].count += count;
        groupedList[3].count += count;
      } else if (years > 10 && years < 16) {
        detailedGroupedList[3].count += count;
        groupedList[4].count += count;
      } else if (years > 15 && years < 21) {
        detailedGroupedList[4].count += count;
        groupedList[4].count += count;
      } else if (years > 20 && years < 26) {
        detailedGroupedList[5].count += count;
        groupedList[4].count += count;
      } else if (years > 25 && years < 31) {
        detailedGroupedList[6].count += count;
        groupedList[4].count += count;
      } else if (years > 30) {
        detailedGroupedList[7].count += count;
        groupedList[4].count += count;
      }
    });

    return [groupedList, detailedGroupedList];
  }

  const experience = data;
  const [groups, detailedGroups] = setInGroups(experience);
  return {
    componentType: 'Pie',
    setNames: ['Erfaring', 'Detaljert oversikt'],
    sets: {
      Erfaring: groups,
      'Detaljert oversikt': detailedGroups,
    },
  };
};

exports.ageDistributionReports = [
  { reportName: 'ageDistribution' },
  { reportName: 'ageDistributionGroups' },
];
exports.ageDistribution = async ({ data }) => {
  const [setAgeDist, setAgeDistGroup] = data

  return {
    componentType: 'Bar',
    setNames: ['Aldersgrupper', 'Detaljert oversikt'],
    sets: {
      Aldersgrupper: setAgeDistGroup.map(({ age_group, count }) => ({
        age: age_group,
        count,
      })),
      'Detaljert oversikt': setAgeDist,
    },
  };
};

function getEventSet(events) {
  // Finds earliest and latest dates for creating a range of years
  const firstYear = new Date(
    Math.min(...events.map((event) => new Date(event.time_from)))
  ).getFullYear();
  const lastYear = new Date(
    Math.max(...events.map((event) => new Date(event.time_to)))
  ).getFullYear();

  const years = []; // Range of years in dataset, [2015, 2016, 2017, etc...]
  for (let year = parseInt(firstYear); year <= parseInt(lastYear); year++)
    years.push(year);

  const set = [];
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
  );

  events.map((event) => {
    // Gets the start and end times for an event, 2020-01-01 - 2020-02-03
    const [fromDate] = event.time_from.split(' ');
    const [toDate] = event.time_to.split(' ');

    // Returns each month the event spans across. 2020-01-01 - 2020-02-03 would return [1, 2]
    const dates = dateRange(fromDate, toDate);

    const year = parseInt(dates[0].substring(0, 4));
    const numMonths = dates.map((date) => parseInt(date.substring(5, 7)));

    // Stores the year of the event and the spanning months
    const dataObject = {
      year: year,
      months: numMonths,
    };

    // Maps each event to a specific year and increases the event counter for the relevant months
    set.map((i) => {
      if (i.id === dataObject.year) {
        dataObject.months.map((j) => {
          i.data[j - 1].y++;
        });
      }
    });
  });

  return set;
}

function dateRange(startDate, endDate) {
  const start = startDate.split('-');
  const end = endDate.split('-');
  const startYear = parseInt(start[0]);
  const endYear = parseInt(end[0]);
  const dates = [];

  for (let i = startYear; i <= endYear; i++) {
    const endMonth = i !== endYear ? 11 : parseInt(end[1]) - 1;
    const startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
    for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      const month = j + 1;
      const displayMonth = month < 10 ? '0' + month : month;
      dates.push([i, displayMonth, '01'].join('-'));
    }
  }

  return dates;
}

exports.fagEvents = async ({ dataplattformClient }) => {
  const reqEvents = await dataplattformClient.report({
    reportName: 'fagEvents',
  });

  const events = await reqEvents.json();
  const eventSet = getEventSet(events);

  return {
    componentType: 'Line',
    setNames: ['Fag og hendelser'],
    sets: {
      'Fag og hendelser': eventSet,
    },
  };
};

exports.educationReports = [
  { reportName: 'degreeDist' },
];
exports.education = async ({ data }) => {
  const education = data;

  return {
    componentType: 'Pie',
    setNames: ['Utdanning'],
    sets: {
      Utdanning: education,
    },
  };
};

/** This exports a lits of all categories and subcategories for the
 * competence mapping. Its used to define the options in the
 * filter dropdown menu.
 */
exports.competenceFilterReports = [
  { reportName: 'categories' },
];
exports.competenceFilter = async ({ data }) => {
  const categories = data;
  // Categories structure
  const output = [];
  // Get the main categories
  const mainCategories = new Set(
    categories.flatMap((item) => Object.keys(item))
  );
  mainCategories.forEach((name) => {
    const categoryObject = {
      category: name,
      subCategories: [],
    };

    // Get child categories
    categories.forEach((item) => {
      const childName = item[name];
      if (childName) {
        categoryObject.subCategories.push(childName);
      }
    });
    output.push(categoryObject);
  });

  return output;
};


exports.competenceMappingReports = [
  { reportName: 'categories' },
  { reportName: 'competenceAverage' },
  { reportName: 'motivationAverage' },
];
exports.competenceMapping = async ({ data }) => {
  const [categories, competence, motivation] = data

  const competenceCategories = (data) => {
    // Categories structure
    const output = {
      kategori: 'kompetansekartlegging',
      children: [],
    };

    // Get the main categories
    const mainCategories = new Set(
      categories.flatMap((item) => Object.keys(item))
    );

    mainCategories.forEach((name) => {
      const categoryObject = {
        kategori: name,
        verdi: 0,
        children: [],
      };

      // Get child categories
      var sumOfCategories = 0;
      categories.forEach((item) => {
        const childName = item[name];
        if (childName) {
          // Create child category and merge competence data
          const value = data[0][childName.toLowerCase()] || null;
          const childCategoryObject = {
            kategori: childName,
            verdi: value,
          };
          sumOfCategories += value;
          categoryObject.children.push(childCategoryObject);
        }
      });

      const avgValue = sumOfCategories / categoryObject.children.length;
      categoryObject.children.forEach((child) => {
        child.size = (child.verdi / sumOfCategories) * avgValue;
      });

      categoryObject.verdi = avgValue;
      output.children.push(categoryObject);
    });

    return output;
  };

  return {
    componentType: 'Sunburst',
    setNames: ['Kompetanse', 'Motivasjon'],
    sets: {
      Kompetanse: competenceCategories(competence),
      Motivasjon: competenceCategories(motivation),
    },
  };
};

exports.competenceAmountReports = [
  { reportName: 'categories' },
  { reportName: 'competenceAverage' },
  { reportName: 'motivationAverage' },
];
exports.competenceAmount = async ({ data }) => {
  const [categories, competence, motivation] = data;

  const setCategories = (data, valueKey) => {
    const output = [];

    // Get the main categories
    const mainCategories = new Set(
      categories.flatMap((item) => Object.keys(item))
    );

    mainCategories.forEach((name) => {
      const categoryObject = {
        kategori: name,
        [valueKey]: 0,
      };

      // Sum of subcategories values
      let categorySum = 0;
      // Number of subcategories
      let numberOfSubCategories = 0;

      categories.forEach((item) => {
        const childName = item[name];
        if (childName) {
          const value = data[0][childName.toLowerCase()] || null;
          categorySum += value;
          numberOfSubCategories++;
        }
      });

      // Sets category value as the average
      categoryObject[valueKey] = categorySum / numberOfSubCategories;
      output.push(categoryObject);
    });

    return output;
  };

  const comArr = setCategories(competence, 'kompetanse');
  const motArr = setCategories(motivation, 'motivasjon');

  // Merges the two arrays on the same category
  const mergedArrs = comArr.map((i) => {
    const found = motArr.find((j) => j.kategori === i.kategori);
    found['kompetanse'] = i.kompetanse;
    return found;
  });

  return {
    componentType: 'Radar',
    setNames: ['Kompetansemengde'],
    sets: {
      Kompetansemengde: mergedArrs,
    },
  };
};

exports.empDataReports = ({
  parameters: { email } = {}
}) => ([
  {
    reportName: 'employeeSkills',
    filter: { email },
  },
  {
    reportName: 'workExperience',
    filter: { email },
  },
  {
    reportName: 'competence',
    filter: { email },
  }
])
exports.empData = async ({ data, parameters: { email } = {} }) => {
  const [resSkills, resWork, resComp] = data
  const emp = resComp[0];
  const salt = await getSecret('/folk-webapp/KOMPETANSEKARTLEGGING_SALT', {
    encrypted: true,
  });

  return {
    email_id: makeEmailUuid(email, salt),
    user_id: emp.user_id,
    employee: emp,
    image: getStorageUrl(emp.image_key),
    workExperience: resWork,
    tags: resSkills[0],
    degree: resComp[0].degree,
    links: Object.fromEntries(
      cvs.map(([lang, format]) => [
        `${lang}_${format}`,
        emp.link.replace('{LANG}', lang).replace('{FORMAT}', format),
      ])
    ),
  };
};

exports.employeeRadarReports = ({
  parameters: { user_id } = {}
}) => ([
  {
    reportName: 'categories',
  },
  {
    reportName: 'employeeMotivation',
  },
  {
    reportName: 'employee_competence',
  }
])
exports.employeeRadar = async ({ data, parameters: { user_id } = {} }) => {
  const [categories, empMotivation, empCompetence] = data;

  const thisMotivation = [];
  empMotivation.forEach((item) => {
    thisMotivation.push({
      kategori: item['category'],
      motivasjon: item[user_id.slice(0, 8)],
    });
  });

  const thisCompetence = [];
  empCompetence.forEach((item) => {
    thisCompetence.push({
      kategori: item['categories'],
      kompetanse: item[user_id],
    });
  });

  const [structuredCats, setNames] = reStructCategories(
    categories,
    thisCompetence,
    thisMotivation
  );

  return {
    componentType: 'Radar',
    setNames: setNames,
    sets: structuredCats,
  };
};

exports.competenceAreasReports = [
  { reportName: 'categories' },
  { reportName: 'competenceAverage' },
]
exports.competenceAreas = async ({ data }) => {
  const [categories, competence] = data
  const output = [];
  
  const mainCategories = new Set(
    categories.flatMap((item) => Object.keys(item))
  );

  mainCategories.forEach(name => {
    const categoryObject = {
      kategori: name.charAt(0).toUpperCase() + name.slice(1),
      kompetanse: 0,
    }

    let categorySum = 0;
    let numberOfSubCategories = 0;
    
    categories.forEach(item => {
      const childName = item[name];
      if (childName) {
        const value = competence[0][childName.toLowerCase()] || null;

        categorySum += value;
        numberOfSubCategories++;

        const childCategoryObject = {
          kategori: childName,
          kompetanse: value
        }

        output.push(childCategoryObject);
      }
    });

    categoryObject.kompetanse = categorySum / numberOfSubCategories;
    output.push(categoryObject);

  });

  const reStructCategories = (categories, compScores = [], motScores = []) => {
    //find the main categoreis
    const mainCategories = new Set(
      categories.flatMap((item) => Object.keys(item))
    );

    /**
     * returns the score of the category with name = name from
     * the array scores. kompOrMot is either "kompetanse" or
     * "motivasjon", depending on the score to find
     */
    const score = (name, scores, komOrMot) => {
      const thisCat = scores.find((obj) => {
        return obj['kategori'] === name;
      });
      const returnValue = thisCat ? thisCat[komOrMot] : 0;
      return returnValue || 0;
    };

    let catSet = [];

    const mainCats = [];

    mainCategories.forEach((name) => {
      const upperCaseName = name.charAt(0).toUpperCase() + name.slice(1);
      mainCats.push({
        kategori: upperCaseName,
        kompetanse: score(upperCaseName, compScores, 'kompetanse'),
        motivasjon: score(upperCaseName, motScores, 'motivasjon')
      });
      const categoryObject = {
        [name]: [],
      };
      categories.forEach((item) => {
        const childName = item[name];
        if (childName) {
          // Create child category
          const childCategoryObject = {
            kategori: childName,
            kompetanse: score(childName, compScores, 'kompetanse'),
            motivasjon: score(childName, motScores, 'motivasjon')
          };
          categoryObject[name].push(childCategoryObject);
        }
      });
      catSet.push(categoryObject);
    });
    catSet.unshift({ Hovedkategorier: mainCats });
    catSet = catSet.reduce(function (cat, x) {
      for (var key in x) cat[key] = x[key];
      return cat;
    }, {});

    const setNames = Object.keys(catSet);

    return [catSet, setNames];
  };


  const [structuredCats, setNames] = reStructCategories(
    categories,
    output
  );

  return {
    componentType: 'Radar',
    setNames: setNames,
    sets: structuredCats,
  }
}
