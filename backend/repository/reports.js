// this file is currently not used for anything other than supporting version control for the reports utilized in data.js.
const reports = [
  {
    name: 'employeeInformation',
    queryString:
      'WITH last_education AS (SELECT a.user_id, array_agg(a.degree)[1] AS degree, array_agg(a.year_to)[1] AS year_to FROM cv_partner_education a INNER JOIN (SELECT user_id, max(year_to) AS year_to FROM cv_partner_education GROUP BY user_id) b ON a.user_id = b.user_id AND a.year_to = b.year_to GROUP BY  a.user_id) SELECT emp.user_id, emp.guid, navn,ad.manager, title, link, degree, emp.email, image_key, ubw_cost.customer, ubw_cost.weigth as weight, ubw_cost.work_order_description FROM cv_partner_employees AS emp LEFT OUTER JOIN last_education AS e ON e.user_id = emp.user_id LEFT OUTER JOIN ubw_customer_per_resource as ubw_cost ON emp.guid=ubw_cost.guid LEFT OUTER JOIN active_directory as ad ON ad.guid=emp.guid order by navn',
    tables: [
      'active_directory',
      'cv_partner_education',
      'cv_partner_employees',
      'ubw_customer_per_resource',
    ],
    dataProtection: 3,
    created: '2021-07-28T10:24:10.068026',
    lastUsed: null,
    lastCacheUpdate: '2021-07-28T10:24:12.544158',
  },
  {
    name: 'motivationAverage',
    queryString:
      'select c.text as category, avg(a.motivation) as avg_motivation from kompetansekartlegging_categories as c inner join kompetansekartlegging_questions as q on q.categoryid = c.id inner join kompetansekartlegging_answers as a on a.questionid = q.id group by c.text',
    tables: [
      'kompetansekartlegging_answers',
      'kompetansekartlegging_categories',
      'kompetansekartlegging_questions',
    ],
    dataProtection: 3,
    created: '2021-07-29T11:17:52.311463',
    lastUsed: null,
    lastCacheUpdate: '2021-07-29T11:17:57.936889',
  },
  {
    name: 'ageDistribution',
    queryString:
      'select age, count(age) as count from (SELECT year(now()) - born_year as age FROM cv_partner_employees where born_year > 0) where age > 10 group by age order by age asc',
    tables: ['cv_partner_employees'],
    dataProtection: 3,
    created: '2021-07-28T10:31:11.088403',
    lastUsed: null,
    lastCacheUpdate: null,
  },
  {
    name: 'fagActivity',
    queryString:
      'SELECT substr(reg_period, 1, 4) as year, substr(reg_period, 5, 6) as week, used_hrs FROM ubw_fagtimer order by year, week asc',
    tables: ['ubw_fagtimer'],
    dataProtection: 3,
    created: '2021-07-28T10:20:46.345748',
    lastUsed: null,
    lastCacheUpdate: '2021-07-28T10:20:51.673091',
  },
  {
    name: 'employeeSkills',
    queryString:
      "SELECT employee.user_id, employee.email, array_join(language, ';', '') AS language, array_join(skill, ';', '') AS skill, array_join(role, ';', '') AS role FROM (SELECT user_id, email FROM cv_partner_employees) AS employee INNER JOIN (SELECT user_id, array_distinct(array_agg(name)) AS language FROM cv_partner_languages GROUP BY  user_id) AS langs ON langs.user_id = employee.user_id INNER JOIN (SELECT DISTINCT user_id, array_distinct(array_agg(category)) AS skill FROM cv_partner_technology_skills WHERE technology_skills != '' AND category != '' GROUP BY  user_id ) AS skills ON skills.user_id = employee.user_id INNER JOIN (SELECT DISTINCT user_id, array_distinct(array_agg(roles)) AS role FROM cv_partner_project_experience WHERE roles != '' GROUP BY  user_id ) AS roles ON roles.user_id = employee.user_id",
    tables: [
      'cv_partner_employees',
      'cv_partner_languages',
      'cv_partner_project_experience',
      'cv_partner_technology_skills',
    ],
    dataProtection: 3,
    created: '2021-07-28T10:28:12.752693',
    lastUsed: null,
    lastCacheUpdate: '2021-07-28T10:28:15.200677',
  },
  {
    name: 'employeeImages',
    queryString: 'select * from cv_partner_employee_images',
    tables: [],
    dataProtection: 3,
    created: '2021-07-28T10:28:47.260628',
    lastUsed: null,
    lastCacheUpdate: null,
  },
  {
    name: 'ageDistributionGroups',
    queryString:
      "SELECT CASE grouped_age WHEN 30 THEN 'under 30' WHEN 40 THEN 'under 40' WHEN 50 THEN 'under 50' ELSE 'over 50' END AS age_group, count(grouped_age) AS count FROM ( SELECT CASE WHEN age <= 30 THEN 30 WHEN age <= 40 THEN 40 WHEN age <= 50 THEN 50 ELSE 60 END AS grouped_age FROM (SELECT year(now()) - born_year AS age FROM cv_partner_employees WHERE born_year > 0) WHERE age > 10) GROUP BY  grouped_age ORDER BY  grouped_age ",
    tables: ['cv_partner_employees'],
    dataProtection: 3,
    created: '2021-07-28T10:30:06.240905',
    lastUsed: null,
    lastCacheUpdate: '2021-07-28T10:30:07.701017',
  },
  {
    name: 'newCategories',
    queryString:
      "SELECT DISTINCT c.text AS category, CAST(ARRAY_AGG(DISTINCT q.topic) AS JSON) AS subCategories FROM kompetansekartlegging_questions AS q INNER JOIN kompetansekartlegging_categories AS c ON q.categoryid = c.id WHERE c.text != 'Jobbrotasjon' GROUP BY c.text",
    tables: [
      'kompetansekartlegging_categories',
      'kompetansekartlegging_questions',
    ],
    dataProtection: 3,
    created: '2021-08-13T13:16:20.155542',
    lastUsed: null,
    lastCacheUpdate: '2021-08-13T13:16:25.733266',
  },
  {
    name: 'projectStatus',
    queryString: 'select user_id, navn, title, email from cv_partner_employees',
    tables: ['cv_partner_employees'],
    dataProtection: 3,
    created: '2021-07-28T10:34:29.693371',
    lastUsed: null,
    lastCacheUpdate: '2021-07-28T10:34:31.105264',
  },
  {
    name: 'categories',
    queryString: 'select * from kompetansekartlegging_categories',
    tables: ['kompetansekartlegging_categories'],
    dataProtection: 3,
    created: '2021-07-29T07:55:00.723232',
    lastUsed: null,
    lastCacheUpdate: '2021-07-29T07:55:05.481968',
  },
  {
    name: 'workExperience',
    queryString:
      'SELECT ex.user_id, emp.email, employer, month_from, year_from, month_to, year_to FROM cv_partner_work_experience ex LEFT outer JOIN cv_partner_employees emp on ex.user_id = emp.user_id',
    tables: ['cv_partner_employees', 'cv_partner_work_experience'],
    dataProtection: 3,
    created: '2021-07-28T10:35:54.945864',
    lastUsed: null,
    lastCacheUpdate: '2021-07-28T10:35:56.646695',
  },
  {
    name: 'leviTest',
    queryString: 'select * from cv_partner_employees',
    tables: ['cv_partner_employees'],
    dataProtection: 3,
    created: '2021-07-29T13:14:11.313617',
    lastUsed: null,
    lastCacheUpdate: '2021-07-29T13:14:16.328545',
  },
  {
    name: 'newCompetenceAverage',
    queryString:
      "SELECT AVG(a.knowledge) AS value, q.topic as subCategory, c.text as category FROM kompetansekartlegging_answers AS a INNER JOIN kompetansekartlegging_questions AS q ON a.questionid = q.id INNER JOIN kompetansekartlegging_categories AS c ON q.categoryid = c.id WHERE c.text != 'Jobbrotasjon' GROUP BY q.topic, c.text",
    tables: [
      'kompetansekartlegging_answers',
      'kompetansekartlegging_categories',
      'kompetansekartlegging_questions',
    ],
    dataProtection: 3,
    created: '2021-08-13T13:18:14.262971',
    lastUsed: null,
    lastCacheUpdate: '2021-08-13T13:18:16.289186',
  },
  {
    name: 'yearsSinceSchoolDist',
    queryString:
      'WITH ad_users AS (SELECT cpemp.user_id, year_from, year_to, month_from, month_to FROM cv_partner_employees AS cpemp INNER JOIN cv_partner_education AS cped ON cpemp.user_id = cped.user_id) SELECT year(now()) - career_start AS years, count(career_start) AS count FROM (SELECT user_id, max(year_to) AS career_start FROM ad_users AS cped GROUP BY  user_id) GROUP BY  career_start ORDER BY  count desc',
    tables: ['cv_partner_education'],
    dataProtection: 3,
    created: '2021-07-28T10:37:04.132039',
    lastUsed: null,
    lastCacheUpdate: '2021-07-28T10:37:05.605362',
  },
  {
    name: 'degreeDist',
    queryString:
      "WITH ad_users AS (SELECT cpemp.user_id, degree FROM cv_partner_employees AS cpemp INNER JOIN cv_partner_education AS cped ON cpemp.user_id = cped.user_id) SELECT CASE highest_degree WHEN 1 THEN 'bachelor' WHEN 2 THEN 'master' WHEN 3 THEN 'phd' END AS degree, count(highest_degree) AS count FROM (SELECT user_id, max(norm_degree) AS highest_degree FROM (SELECT user_id, CASE WHEN lower(degree) LIKE '%phd %' OR lower(degree) LIKE '%doktor %' OR lower(degree) LIKE '%doktorgrad%' OR lower(degree) LIKE '%profesjonsstudiet%' THEN 3 WHEN lower(degree) LIKE '%master %' OR lower(degree) LIKE '% master' OR lower(degree) LIKE '%master%' OR lower(degree) LIKE '%mastergrad%' OR lower(degree) LIKE '%sivil%' OR lower(degree) LIKE '%(master)%' OR lower(degree) LIKE '%siv.%' OR lower(degree) LIKE '%cand%' OR lower(degree) LIKE '%m.%' THEN 2 WHEN lower(degree) LIKE '%bachelor %' OR lower(degree) LIKE '%bachelor,%' OR lower(degree) LIKE '%bachelor' OR lower(degree) LIKE '%(bachelor)%' OR lower(degree) LIKE '%bachelorgrad%' OR lower(degree) LIKE '%ingeniør%' OR lower(degree) LIKE '%b.%' OR lower(degree) LIKE '%3-år%' THEN 1 ELSE 0 END AS norm_degree FROM ad_users) GROUP BY  user_id) WHERE highest_degree > 0 GROUP BY  highest_degree",
    tables: ['cv_partner_education'],
    dataProtection: 3,
    created: '2021-07-28T10:38:04.113155',
    lastUsed: null,
    lastCacheUpdate: '2021-07-28T10:38:05.931249',
  },
  {
    name: 'projectExperience',
    queryString:
      'SELECT emp.user_id, navn, customer, description, year_from, year_to, month_from,  month_to FROM cv_partner_project_experience AS exp JOIN (SELECT user_id, navn FROM cv_partner_employees) emp ON exp.user_id = emp.user_id',
    tables: ['cv_partner_employees', 'cv_partner_project_experience'],
    dataProtection: 3,
    created: '2021-07-28T10:38:43.562688',
    lastUsed: null,
    lastCacheUpdate: '2021-07-28T10:38:45.636499',
  },
  {
    name: 'test123',
    queryString: 'select * from cv_partner_employees',
    tables: ['cv_partner_employees'],
    dataProtection: 3,
    created: '2021-07-30T10:29:01.380893',
    lastUsed: null,
    lastCacheUpdate: '2021-07-30T10:29:06.365405',
  },
  {
    name: 'fagEvents',
    queryString:
      "select distinct(event_summary), date_add('second', timestamp_from, date_parse('Jan-01-1970','%b-%d-%Y')) as time_from, date_add('second', timestamp_to, date_parse('Jan-01-1970','%b-%d-%Y')) as time_to from google_calendar_events where date_add('second', timestamp_from, date_parse('Jan-01-1970','%b-%d-%Y')) > current_date - interval '3' year",
    tables: ['google_calendar_events'],
    dataProtection: 3,
    created: '2021-07-28T10:40:17.346574',
    lastUsed: null,
    lastCacheUpdate: '2021-07-28T10:40:18.888051',
  },
  {
    name: 'employeeMotivationAndCompetence',
    queryString:
      "WITH categoryAverage AS (SELECT a.email AS email, c.text AS category, AVG(a.motivation) AS categoryMotivationAvg, AVG(a.knowledge) AS categoryCompetenceAvg FROM kompetansekartlegging_answers AS a INNER JOIN kompetansekartlegging_questions AS q ON a.questionid = q.id INNER JOIN kompetansekartlegging_categories AS c ON q.categoryid = c.id WHERE c.text != 'Jobbrotasjon' GROUP BY a.email, c.text) SELECT a.email AS email, a.motivation AS motivation, a.knowledge AS competence, q.topic AS subCategory, c.text AS category, ca.categoryMotivationAvg AS categoryMotivationAvg, ca.categoryCompetenceAvg AS categoryCompetenceAvg FROM kompetansekartlegging_answers AS a INNER JOIN kompetansekartlegging_questions AS q ON a.questionid = q.id INNER JOIN kompetansekartlegging_categories AS c ON q.categoryid = c.id INNER JOIN categoryAverage AS ca ON a.email = ca.email AND c.text = ca.category",
    tables: [
      'kompetansekartlegging_answers',
      'kompetansekartlegging_categories',
      'kompetansekartlegging_questions',
    ],
    dataProtection: 3,
    created: '2021-08-17T12:05:24.577376',
    lastUsed: null,
    lastCacheUpdate: '2021-08-17T12:05:30.839125',
  },
  {
    name: 'newMotivationAverage',
    queryString:
      "SELECT AVG(a.motivation) AS value, q.topic as subCategory, c.text as category FROM kompetansekartlegging_answers AS a INNER JOIN kompetansekartlegging_questions AS q ON a.questionid = q.id INNER JOIN kompetansekartlegging_categories AS c ON q.categoryid = c.id WHERE c.text != 'Jobbrotasjon' GROUP BY q.topic, c.text",
    tables: [
      'kompetansekartlegging_answers',
      'kompetansekartlegging_categories',
      'kompetansekartlegging_questions',
    ],
    dataProtection: 3,
    created: '2021-08-13T13:18:59.275443',
    lastUsed: null,
    lastCacheUpdate: '2021-08-13T13:19:01.327776',
  },
]
