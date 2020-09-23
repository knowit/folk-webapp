const crypto = require('crypto');
const AWS = require('aws-sdk');
const ssm = new AWS.SSM();

const getSecret = (name, { encrypted = false } = {}) => {
  return new Promise((resolve, reject) => {
    ssm.getParameter(
      {
        Name: name,
        WithDecryption: encrypted,
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data && data.Parameter ? data.Parameter.Value : null);
      }
    );
  });
};

const pageable = (sql, page = 1, steps = 20) => {
  const start = steps * (page - 1);
  const end = steps * page;

  return `
    SELECT * FROM (
      SELECT row_number() over() AS rn, *
      FROM (${sql})
    )
    WHERE rn BETWEEN ${start} AND ${end};
  `;
};

const makeEmailUuid = (email, salt) => {
  const hmac = crypto.createHmac('sha256', salt);
  hmac.update(email);
  const sig = hmac.digest('hex');

  return [
    sig.substring(0, 8),
    sig.substring(8, 12),
    sig.substring(12, 16),
    sig.substring(16, 20),
    sig.substring(20, 32),
  ].join('-');
};

exports.projectStatus = async ({
  dataplattformClient,
  queryStringParameters: { page = 1, nameSearch = null } = {},
}) => {
  const req = await dataplattformClient.query({
    querySql: pageable(
      `
        select user_id, navn, title, email from cv_partner_employees 
        ${nameSearch ? `where lower(navn) like '%${nameSearch}%'` : ''}
      `,
      page
    ),
  });
  const allEmployees = await req.json();

  return allEmployees.map((employee) => ({
    rowData: [
      {
        value: employee.navn,
        image: null,
        competanceUrl: `/api/data/employeeCompetanse?email=${encodeURIComponent(
          employee.email
        )}`,
      },
      employee.title,
      0,
      { value: null, status: 'green' },
    ],
  }));
};

exports.competence = async ({
  dataplattformClient,
  queryStringParameters: { page = 1, nameSearch = null } = {},
}) => {
  const req = await dataplattformClient.query({
    querySql: pageable(
      `
      with latest_grad_year AS 
          (SELECT user_id,
              max(year_to) AS max_year_to
          FROM cv_partner_education
          GROUP BY user_id)
      SELECT employee.user_id,
              navn,
              title,
              link,
              degree,
              email
      FROM cv_partner_employees AS employee
      LEFT JOIN cv_partner_education AS education
          ON employee.user_id = education.user_id
      LEFT JOIN latest_grad_year
          ON employee.user_id = latest_grad_year.user_id
      WHERE education.year_to = latest_grad_year.max_year_to
      ${nameSearch ? `and lower(navn) like '%${nameSearch}%'` : ''}
    `,
      page
    ),
  });
  const allEmployees = await req.json();

  const cvs = [
    ['no', 'pdf'],
    ['int', 'pdf'],
    ['no', 'word'],
    ['int', 'word'],
  ];
  return allEmployees.map((employee) => ({
    rowData: [
      {
        value: employee.navn,
        image: null,
        competanceUrl: `/api/data/employeeCompetanse?email=${encodeURIComponent(
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
  const req = await dataplattformClient.query({
    querySql: `
      SELECT navn,
        customer,
        description,
        year_from,
        year_to,
        month_from,
        month_to
      FROM cv_partner_project_experience AS exp
      JOIN (SELECT user_id, navn FROM cv_partner_employees) emp
      ON exp.user_id = emp.user_id
      WHERE exp.user_id = '${user_id}'
    `,
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

exports.employeeCompetanse = async ({
  dataplattformClient,
  queryStringParameters: { email } = {},
}) => {
  const salt = await getSecret('/folk-webapp/KOMPETANSEKARTLEGGING_SALT', {
    encrypted: true,
  });
  const uuid = makeEmailUuid(email, salt);

  const [reqComp, reqSkills, reqEmp] = await Promise.all([
    dataplattformClient.query({
      querySql: `select * from kompetansekartlegging where uuid = '${uuid}'`,
    }),
    dataplattformClient.query({
      querySql: `
        SELECT array_join(language, ';', '') AS language, 
              array_join(skill, ';', '') AS skill, 
              array_join(role, ';', '') AS role
        FROM 
          (SELECT DISTINCT user_id
          FROM cv_partner_employees
          WHERE email = '${email}') AS employee
        INNER JOIN 
          (SELECT user_id,
                array_agg(name) AS language
          FROM cv_partner_languages
          GROUP BY  user_id) AS langs
          ON langs.user_id = employee.user_id
        INNER JOIN 
          (SELECT DISTINCT user_id,
                array_agg(category) AS skill
          FROM cv_partner_technology_skills
          WHERE technology_skills != '' and category != ''
          GROUP BY  user_id ) AS skills
          ON skills.user_id = employee.user_id
        INNER JOIN 
          (SELECT DISTINCT user_id,
                array_agg(roles) AS role
          FROM cv_partner_project_experience
          GROUP BY  user_id ) AS roles
          ON roles.user_id = employee.user_id
      `,
    }),
    dataplattformClient.query({
      querySql: `
        SELECT DISTINCT employer,
              month_from,
              year_from
        FROM cv_partner_work_experience
        WHERE user_id = 
          (SELECT DISTINCT user_id
          FROM cv_partner_employees
          WHERE email = '${email}')
      `,
    }),
  ]);
  const [resComp, resSkills, resEmp] = await Promise.all([
    reqComp.json(),
    reqSkills.json(),
    reqEmp.json(),
  ]);

  const mapCompetance = (comp) => {
    const compEntires = comp && comp.length > 0 ? Object.entries(comp[0]) : [];
    const compMap = {};
    for (var i = 1; i < compEntires.length; i += 2) {
      const [k, competance] = compEntires[i];
      const [, motivation] = compEntires[i + 1];
      compMap[k] = {
        competance,
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
    competanse: mapCompetance(resComp),
    workExperience: resEmp,
    tags: mapTags(resSkills),
  };
};

exports.resourceType = async () => {
  return {
    componentType: 'Pie',
    setNames: ['Mobilutvikler', 'Systemutvikler'],
    sets: {
      Mobilutvikler: [
        { group: 'Group A', value: 400 },
        { group: 'Group B', value: 300 },
        { group: 'Group C', value: 300 },
        { group: 'Group D', value: 200 },
      ],
      Systemutvikler: [
        { group: 'Group A', value: 200 },
        { group: 'Group B', value: 300 },
        { group: 'Group C', value: 200 },
        { group: 'Group D', value: 100 },
      ],
    },
  };
};

exports.experience = async () => {
  return {
    componentType: 'PercentArea',
    setNames: ['Maksimal', 'Median', 'Minimal', 'Gjennomsnitt'],
    sets: {
      Maksimal: [
        { x: '2015.01', a: 4000, b: 2400, c: 2400 },
        { x: '2015.02', a: 3000, b: 1398, c: 2210 },
        { x: '2015.03', a: 2000, b: 9800, c: 2290 },
        { x: '2015.04', a: 2780, b: 3908, c: 2000 },
        { x: '2015.05', a: 1890, b: 4800, c: 2181 },
        { x: '2015.06', a: 2390, b: 3800, c: 2500 },
        { x: '2015.07', a: 3490, b: 4300, c: 2100 },
      ],
      Median: [
        { x: '2015.01', c: 4000, b: 2400, a: 2400 },
        { x: '2015.02', c: 3000, b: 1398, a: 2210 },
        { x: '2015.03', c: 2000, b: 9800, a: 2290 },
        { x: '2015.04', c: 2780, b: 3908, a: 2000 },
        { x: '2015.05', c: 1890, b: 4800, a: 2181 },
        { x: '2015.06', c: 2390, b: 3800, a: 2500 },
        { x: '2015.07', c: 3490, b: 4300, a: 2100 },
      ],
      Minimal: [
        { x: '2015.01', c: 4000, b: 10, a: 2400 },
        { x: '2015.02', c: 1500, b: 1398, a: 2002 },
        { x: '2015.03', c: 2000, b: 9800, a: 2290 },
        { x: '2015.04', c: 2780, b: 2000, a: 2000 },
        { x: '2015.05', c: 1890, b: 2000, a: 2181 },
        { x: '2015.06', c: 2390, b: 100, a: 100 },
        { x: '2015.07', c: 50, b: 4300, a: 2100 },
      ],
      Gjennomsnitt: [
        { x: '2015.01', c: 4000, b: 2400, a: 2400 },
        { x: '2015.02', c: 3000, b: 1398, a: 2210 },
        { x: '2015.03', c: 2000, b: 9800, a: 2290 },
        { x: '2015.04', c: 2780, b: 3908, a: 2000 },
        { x: '2015.05', c: 1890, b: 4800, a: 2181 },
        { x: '2015.06', c: 2390, b: 3800, a: 2500 },
        { x: '2015.07', c: 3490, b: 4300, a: 2100 },
      ],
    },
  };
};

exports.outbound = async () => {
  return {
    componentType: 'Bar',
    setNames: ['Uke 10', 'Uke 11'],
    sets: {
      'Uke 10': [
        { x: 'A', y1: 4000, y2: 2400 },
        { x: 'B', y1: 3000, y2: 1398 },
        { x: 'C', y1: 2000, y2: 9800 },
        { x: 'D', y1: 2780, y2: 3908 },
        { x: 'E', y1: 1890, y2: 4800 },
        { x: 'F', y1: 2390, y2: 3800 },
        { x: 'G', y1: 3490, y2: 4300 },
      ],
      'Uke 11': [
        { x: 'A', y2: 4000, y1: 2400 },
        { x: 'B', y2: 3000, y1: 1398 },
        { x: 'C', y2: 2000, y1: 9800 },
        { x: 'D', y2: 2780, y1: 3908 },
        { x: 'E', y2: 1890, y1: 4800 },
        { x: 'F', y2: 2390, y1: 3800 },
        { x: 'G', y2: 3490, y1: 4300 },
      ],
    },
  };
};

exports.inbound = async () => {
  return {
    componentType: 'Line',
    setNames: ['Uke 10', 'Uke 11'],
    sets: {
      'Uke 10': [
        { x: 'A', y1: 4000, y2: 2400 },
        { x: 'B', y1: 3000, y2: 1398 },
        { x: 'C', y1: 2000, y2: 9800 },
        { x: 'D', y1: 2780, y2: 3908 },
        { x: 'E', y1: 1890, y2: 4800 },
        { x: 'F', y1: 2390, y2: 3800 },
        { x: 'G', y1: 3490, y2: 4300 },
      ],
      'Uke 11': [
        { x: 'A', y2: 4000, y1: 2400 },
        { x: 'B', y2: 3000, y1: 1398 },
        { x: 'C', y2: 2000, y1: 9800 },
        { x: 'D', y2: 2780, y1: 3908 },
        { x: 'E', y2: 1890, y1: 4800 },
        { x: 'F', y2: 2390, y1: 3800 },
        { x: 'G', y2: 3490, y1: 4300 },
      ],
    },
  };
};
