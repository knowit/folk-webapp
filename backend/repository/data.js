const { getSecret, makeEmailUuid, groupBy, range } = require('./util');
const { v4: uuid } = require('uuid');

exports.projectStatus = async ({ dataplattformClient }) => {
  const req = await dataplattformClient.report({
    reportName: 'projectStatus',
  });
  const allEmployees = await req.json();

  return allEmployees.map((employee) => ({
    rowId: uuid(),
    rowData: [
      {
        value: employee.navn,
        image: null,
        competenceUrl: `/api/data/employeeCompetence?email=${encodeURIComponent(
          employee.email
        )}`,
      },
      employee.title,
      0,
      { value: null, status: null },
    ],
  }));
};

exports.competence = async ({ dataplattformClient }) => {
  const req = await dataplattformClient.report({
    reportName: 'competence',
  });
  const allEmployees = await req.json();

  const cvs = [
    ['no', 'pdf'],
    ['int', 'pdf'],
    ['no', 'word'],
    ['int', 'word'],
  ];
  return allEmployees.map((employee) => ({
    rowId: uuid(),
    rowData: [
      {
        value: employee.navn,
        image: null,
        competenceUrl: `/api/data/employeeCompetence?email=${encodeURIComponent(
          employee.email
        )}`,
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
    ],
  }));
};

exports.employeeExperience = async ({
  dataplattformClient,
  queryStringParameters: { user_id } = {},
}) => {
  const req = await dataplattformClient.report({
    reportName: 'projectExperience',
    filter: {
      user_id: user_id,
    },
  });
  const empExperience = await req.json();
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

exports.employeeCompetence = async ({
  dataplattformClient,
  queryStringParameters: { email } = {},
}) => {
  const salt = await getSecret('/folk-webapp/KOMPETANSEKARTLEGGING_SALT', {
    encrypted: true,
  });
  const uuid = makeEmailUuid(email, salt);

  const [reqComp, reqSkills, reqEmp] = await Promise.all([
    dataplattformClient.report({
      reportName: 'kompetansekartlegging',
      filter: { uuid },
    }),
    dataplattformClient.report({
      reportName: 'employeeSkills',
      filter: { email },
    }),
    dataplattformClient.report({
      reportName: 'workExperience',
      filter: { email },
    }),
  ]);
  const [resComp, resSkills, resEmp] = await Promise.all([
    reqComp.json(),
    reqSkills.json(),
    reqEmp.json(),
  ]);

  const mapCompetence = (comp) => {
    const compEntires = comp && comp.length > 0 ? Object.entries(comp[0]) : [];
    const compMap = {};
    for (var i = 1; i < compEntires.length; i += 2) {
      const [k, competence] = compEntires[i];
      const [, motivation] = compEntires[i + 1];
      compMap[k] = {
        competence,
        motivation,
      };
    }
    return compMap;
  };

  const mapTags = (skills) => {
    const mappedSkills = skills && skills.length > 0 ? skills[0] : {};
    return {
      languages: mappedSkills.language ? mappedSkills.language.split(';') : [],
      skills: mappedSkills.skill ? mappedSkills.skill.split(';') : [],
      roles: mappedSkills.role ? mappedSkills.role.split(';') : [],
    };
  };

  return {
    competence: mapCompetence(resComp),
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

exports.fagtimer = async ({ dataplattformClient }) => {
  const req = await dataplattformClient.report({
    reportName: 'fagActivity',
  });

  const fagActivity = await req.json();

  const setNames = range(2018, new Date().getFullYear())
    .map((year) => year.toString())
    .reverse();
  const sets = groupBy(fagActivity, 'year');

  return {
    componentType: 'Bar',
    setNames,
    sets,
  };
};

exports.competenceSum = async () => {
  return {
    componentType: null,
    setNames: [],
    sets: {},
  };
};

exports.competenceAreas = async () => {
  return {
    componentType: null,
    setNames: [],
    sets: {},
  };
};

exports.experienceDistribution = async ({ dataplattformClient }) => {
  const req = await dataplattformClient.report({
    reportName: 'yearsSinceSchoolDist',
  });
  const experience = await req.json();

  return {
    componentType: 'Bar',
    setNames: ['Erfaring'],
    sets: {
      Erfaring: experience,
    },
  };
};

exports.ageDistribution = async ({ dataplattformClient }) => {
  const [setAgeDistReq, setAgeDistGroupReq] = await Promise.all([
    dataplattformClient.report({
      reportName: 'ageDistribution',
    }),
    dataplattformClient.report({
      reportName: 'ageDistributionGroups',
    }),
  ]);

  const [setAgeDist, setAgeDistGroup] = await Promise.all([
    setAgeDistReq.json(),
    setAgeDistGroupReq.json(),
  ]);

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

exports.faggrupper = async () => {
  return {
    componentType: null,
    setNames: [],
    sets: {},
  };
};

exports.education = async ({ dataplattformClient }) => {
  const req = await dataplattformClient.report({
    reportName: 'degreeDist',
  });
  const education = await req.json();

  return {
    componentType: 'Pie',
    setNames: ['Utdanning'],
    sets: {
      Utdanning: education,
    },
  };
};

exports.competenceMapping = async ({ dataplattformClient }) => {
  const [reqCompetence, reqMotivation] = await Promise.all([
    dataplattformClient.report({
      reportName: 'competenceAverage',
    }),
    dataplattformClient.report({
      reportName: 'motivationAverage',
    }),
  ]);
  const [competence, motivation] = await Promise.all([
    reqCompetence.json(),
    reqMotivation.json(),
  ]);

  const transposeMap = (mapList) => {
    const entires =
      mapList && mapList.length > 0 ? Object.entries(mapList[0]) : [];
    return entires.map(([key, value]) => ({
      section: key,
      value,
    }));
  };

  return {
    componentType: 'Bar',
    setNames: ['Kompetanse', 'Motivasjon'],
    sets: {
      Kompetanse: transposeMap(competence),
      Motivasjon: transposeMap(motivation),
    },
  };
};
