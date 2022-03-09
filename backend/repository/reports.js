const reports = [
  {
    name: 'employeeInformation',
    queryString:
      'WITH last_education AS (SELECT a.user_id, array_agg(a.degree)[1] AS degree, array_agg(a.year_to)[1] AS year_to FROM dev_level_3_database.cv_partner_education a INNER JOIN (SELECT user_id, max(year_to) AS year_to FROM dev_level_3_database.cv_partner_education GROUP BY user_id) b ON a.user_id = b.user_id AND a.year_to = b.year_to GROUP BY  a.user_id) SELECT emp.user_id, emp.guid, navn,ad.manager, title, link, degree, emp.email, image_key, ubw_cost.customer, ubw_cost.weigth as weight, ubw_cost.work_order_description FROM dev_level_3_database.cv_partner_employees AS emp LEFT OUTER JOIN last_education AS e ON e.user_id = emp.user_id LEFT OUTER JOIN dev_level_3_database.ubw_customer_per_resource as ubw_cost ON emp.guid=ubw_cost.guid LEFT OUTER JOIN dev_level_3_database.active_directory as ad ON ad.guid=emp.guid order by navn',
    tables: [
      'active_directory',
      'cv_partner_education',
      'cv_partner_employees',
      'test_test_no_kundemapping_test',
      'ubw_customer_per_resource',
    ],
    dataProtection: 3,
    created: '2021-09-21T15:14:41.987380',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T11:50:08.289427',
  },
  {
    name: 'competence',
    queryString:
      'WITH last_education AS (SELECT a.user_id, array_agg(a.degree)[1] AS degree, array_agg(a.year_to)[1] AS year_to FROM dev_level_3_database.cv_partner_education a INNER JOIN (SELECT user_id, max(year_to) AS year_to FROM dev_level_3_database.cv_partner_education GROUP BY  user_id ) b ON a.user_id = b.user_id AND a.year_to = b.year_to GROUP BY  a.user_id) SELECT emp.user_id, navn, title, link, degree, email, image_key\n FROM dev_level_3_database.cv_partner_employees AS emp LEFT OUTER JOIN last_education AS e ON e.user_id = emp.user_id order by navn',
    tables: ['cv_partner_education', 'cv_partner_employees'],
    dataProtection: 3,
    created: '2021-12-08T12:51:55.285778',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T10:08:50.923807',
  },
  {
    name: 'motivationAverage',
    queryString:
      'select c.text as category, avg(a.motivation) as avg_motivation from dev_level_3_database.kompetansekartlegging_categories as c inner join dev_level_3_database.kompetansekartlegging_questions as q on q.categoryid = c.id inner join dev_level_3_database.kompetansekartlegging_answers as a on a.questionid = q.id group by c.text',
    tables: [
      'kompetansekartlegging_answers',
      'kompetansekartlegging_categories',
      'kompetansekartlegging_questions',
    ],
    dataProtection: 3,
    created: '2021-07-29T11:17:52.311463',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T11:37:53.935203',
  },
  {
    name: 'ageDistribution',
    queryString:
      'select age, count(age) as count from (SELECT year(now()) - born_year as age FROM dev_level_3_database.cv_partner_employees where born_year > 0) where age > 10 group by age order by age asc',
    tables: ['cv_partner_employees'],
    dataProtection: 3,
    created: '2021-09-06T07:20:52.448192',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T10:08:34.165989',
  },
  {
    name: 'employeeDataUBW',
    queryString:
      'SELECT b.customer, ad.email, ad.manager, b.guid, a.hours, a.timestamp, a.reg_period, b.project_type, b.work_order, b.work_order_description FROM dev_level_3_database.ubw_per_project_data a JOIN dev_level_3_database.ubw_customer_per_resource b ON a.reg_period = b.reg_period JOIN dev_level_3_database.active_directory ad ON ad.guid = b.guid;',
    tables: [
      'active_directory',
      'ubw_customer_per_resource',
      'ubw_per_project_data',
    ],
    dataProtection: 3,
    created: '2021-10-13T10:41:49.165953',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T11:50:16.220248',
  },
  {
    name: 'fagActivity',
    queryString:
      'SELECT substr(reg_period, 1, 4) as year, substr(reg_period, 5, 6) as week, used_hrs FROM dev_level_2_database.ubw_fagtimer order by year, week asc',
    tables: ['ubw_fagtimer'],
    dataProtection: 3,
    created: '2021-07-28T10:20:46.345748',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T11:54:41.631660',
  },
  {
    name: 'employeeSkills',
    queryString:
      "SELECT employee.user_id, employee.email, array_join(language, ';', '') AS language, array_join(skill, ';', '') AS skill, array_join(role, ';', '') AS role FROM (SELECT user_id, email FROM dev_level_3_database.cv_partner_employees) AS employee INNER JOIN (SELECT user_id, array_distinct(array_agg(name)) AS language FROM dev_level_3_database.cv_partner_languages GROUP BY  user_id) AS langs ON langs.user_id = employee.user_id INNER JOIN (SELECT DISTINCT user_id, array_distinct(array_agg(category)) AS skill FROM dev_level_3_database.cv_partner_technology_skills WHERE technology_skills != '' AND category != '' GROUP BY  user_id ) AS skills ON skills.user_id = employee.user_id INNER JOIN (SELECT DISTINCT user_id, array_distinct(array_agg(roles)) AS role FROM dev_level_3_database.cv_partner_project_experience WHERE roles != '' GROUP BY  user_id ) AS roles ON roles.user_id = employee.user_id",
    tables: [
      'cv_partner_employees',
      'cv_partner_languages',
      'cv_partner_project_experience',
      'cv_partner_technology_skills',
    ],
    dataProtection: 3,
    created: '2021-07-28T10:28:12.752693',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T10:08:59.593328',
  },
  {
    name: 'customerHoursBilled',
    queryString:
      'SELECT Customer, SUM(hours) as hours, reg_period FROM dev_level_3_database.ubw_per_project_data GROUP BY reg_period, customer',
    tables: ['ubw_per_project_data'],
    dataProtection: 3,
    created: '2021-12-17T09:28:07.848545',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T11:50:17.358637',
  },
  {
    name: 'employeeImages',
    queryString:
      'select * from dev_level_3_database.cv_partner_employee_images',
    tables: [],
    dataProtection: 3,
    created: '2021-07-28T10:28:47.260628',
    lastUsed: null,
    lastCacheUpdate: null,
  },
  {
    name: 'ageDistributionGroups',
    queryString:
      "SELECT CASE grouped_age WHEN 30 THEN 'under 30' WHEN 40 THEN 'Mellom 30 and 40' WHEN 50 THEN 'Mellom 40 and 50' WHEN 60 THEN 'over 50' ELSE 'Alder ikke kjent' END AS age_group, count(grouped_age) AS count FROM ( SELECT CASE WHEN age <= 30 THEN 30 WHEN age <= 40 THEN 40 WHEN age <= 50 THEN 50 WHEN age >= 60 AND age < 100 THEN 60 ELSE 99 END AS grouped_age FROM ( SELECT year(now()) - born_year AS age FROM dev_level_3_database.cv_partner_employees ) AS ages WHERE age > 10 ) AS age_groups GROUP BY  grouped_age ORDER BY  grouped_age",
    tables: ['cv_partner_employees'],
    dataProtection: 3,
    created: '2021-12-17T12:00:22.581427',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T10:08:37.503238',
  },
  {
    name: 'allProjectsOverview',
    queryString:
      'SELECT customer, SUM(billedTotal) as billedTotal, SUM(billedLastPeriod) as billedLastPeriod, SUM(consultants) as consultants FROM (SELECT CASE WHEN total.customer = "dagens ubw prosjekt" THEN kunde ELSE total.customer END AS customer, total.work_order, billedTotal, billedLastPeriod, consultants FROM ((SELECT customer, work_order, sum(hours) as billedTotal FROM ubw_per_project_data d1 WHERE timestamp = (SELECT MAX(timestamp) FROM ubw_per_project_data d2 WHERE d1.customer = d2.customer AND d1.reg_period = d2.reg_period) GROUP BY customer, employees, work_order ) total JOIN (SELECT customer, work_order,hours as billedLastPeriod FROM ubw_per_project_data d1 WHERE reg_period = (SELECT MAX(reg_period) FROM ubw_per_project_data d2 WHERE d1.customer = d2.customer AND d1.work_order = d2.work_order) group by customer, hours, work_order) lastPeriod ON total.customer = lastPeriod.customer AND total.work_order = lastPeriod.work_order JOIN (SELECT customer, work_order, MAX(employees) as consultants FROM ( SELECT *, RANK() OVER (PARTITION BY customer ORDER BY reg_period DESC) AS row_number FROM ( SELECT customer, employees, reg_period, work_order FROM ubw_per_project_data d1 WHERE timestamp = (SELECT MAX(timestamp) FROM ubw_per_project_data d2 WHERE d1.customer = d2.customer AND d1.reg_period = d2.reg_period AND d1.work_order = d2.work_order) ORDER BY customer DESC, reg_period DESC ) ) WHERE row_number <= 5 GROUP BY customer, work_order) numConsul ON total.customer = numConsul.customer AND total.work_order = numConsul.work_order LEFT JOIN test_test_no_kundemapping_test ON total.customer = "dagens ubw prosjekt" AND total.work_order = arbeids_ordre) ) GROUP BY customer',
    tables: ['ubw_per_project_data', 'test_test_no_kundemapping_test'],
    dataProtection: 3,
    created: '2021-12-08T16:30:51.129847',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T11:50:19.050039',
  },
  {
    name: 'newCategories',
    queryString:
      "SELECT DISTINCT c.text AS category, CAST(ARRAY_AGG(DISTINCT q.topic) AS JSON) AS subCategories FROM dev_level_3_database.kompetansekartlegging_questions AS q INNER JOIN dev_level_3_database.kompetansekartlegging_categories AS c ON q.categoryid = c.id WHERE c.text != 'Jobbrotasjon' GROUP BY c.text",
    tables: [
      'kompetansekartlegging_categories',
      'kompetansekartlegging_questions',
    ],
    dataProtection: 3,
    created: '2021-09-16T14:25:57.964263',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T11:37:55.313691',
  },
  {
    name: 'projectStatus',
    queryString:
      'select user_id, navn, title, email from dev_level_3_database.cv_partner_employees',
    tables: ['cv_partner_employees'],
    dataProtection: 3,
    created: '2021-07-28T10:34:29.693371',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T10:08:38.614324',
  },
  {
    name: 'categories',
    queryString:
      'select * from dev_level_3_database.kompetansekartlegging_categories',
    tables: ['kompetansekartlegging_categories'],
    dataProtection: 3,
    created: '2021-07-29T07:55:00.723232',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T11:37:56.327021',
  },
  {
    name: 'workExperienceDistributedInYears',
    queryString:
      "SELECT years_working, Count(years_working) AS count FROM (SELECT user_id, sum(if (month_from = -1 OR year_from = -1, 0, date_diff('Month', try_cast(concat(cast(year_from as varchar), '-', cast(month_from as varchar), '-01') as date), if (month_to = -1 OR year_to = -1, Now(), try_cast(concat(cast(year_to as varchar), '-', cast(month_to as varchar), '-', cast(Day(Now()) as varchar)) as date))))) / 12 as years_working FROM dev_level_3_database.cv_partner_work_experience wex GROUP BY user_id) GROUP BY  years_working ORDER BY  count desc",
    tables: ['cv_partner_work_experience'],
    dataProtection: 3,
    created: '2021-12-01T13:16:56.275685',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T10:09:00.878700',
  },
  {
    name: 'customerProjects',
    queryString:
      'SELECT d1.customer, d1.reg_period, total_hours, d2.timestamp, work_order, work_order_description, num_of_employees FROM (SELECT customer, reg_period, work_order, work_order_description, time, COUNT(ALIAS) as num_of_employees FROM dev_level_3_database.ubw_customer_per_resource GROUP BY work_order, reg_period, work_order_description, time, customer) d1 JOIN (SELECT SUM(hours) as total_hours, reg_period, timestamp, customer FROM dev_level_3_database.ubw_per_project_data GROUP BY timestamp, reg_period, customer) d2 ON d1.reg_period = d2.reg_period AND d1.time = d2.timestamp AND d1.customer = d2.customer',
    tables: ['ubw_customer_per_resource', 'ubw_per_project_data'],
    dataProtection: 3,
    created: '2021-12-14T14:12:04.879800',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T11:50:20.918504',
  },
  {
    name: 'workExperience',
    queryString:
      'SELECT ex.user_id, emp.email, employer, month_from, year_from, month_to, year_to FROM dev_level_3_database.cv_partner_work_experience ex LEFT outer JOIN dev_level_3_database.cv_partner_employees emp on ex.user_id = emp.user_id',
    tables: ['cv_partner_employees', 'cv_partner_work_experience'],
    dataProtection: 3,
    created: '2021-07-28T10:35:54.945864',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T10:09:02.362698',
  },
  {
    name: 'leviTest',
    queryString: 'select * from dev_level_3_database.cv_partner_employees',
    tables: ['cv_partner_employees'],
    dataProtection: 3,
    created: '2021-07-29T13:14:11.313617',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T10:08:41.240976',
  },
  {
    name: 'newCompetenceAverage',
    queryString:
      "SELECT AVG(a.knowledge) AS value, q.topic as subCategory, c.text as category FROM dev_level_3_database.kompetansekartlegging_answers AS a INNER JOIN dev_level_3_database.kompetansekartlegging_questions AS q ON a.questionid = q.id INNER JOIN dev_level_3_database.kompetansekartlegging_categories AS c ON q.categoryid = c.id WHERE c.text != 'Jobbrotasjon' GROUP BY q.topic, c.text",
    tables: [
      'kompetansekartlegging_answers',
      'kompetansekartlegging_categories',
      'kompetansekartlegging_questions',
    ],
    dataProtection: 3,
    created: '2021-09-16T14:26:48.462123',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T11:37:58.278886',
  },
  {
    name: 'yearsSinceSchoolDist',
    queryString:
      'WITH ad_users AS (SELECT cpemp.user_id, year_from, year_to, month_from, month_to FROM dev_level_3_database.cv_partner_employees AS cpemp INNER JOIN dev_level_3_database.cv_partner_education AS cped ON cpemp.user_id = cped.user_id) SELECT year(now()) - career_start AS years, count(career_start) AS count FROM (SELECT user_id, max(year_to) AS career_start FROM ad_users AS cped GROUP BY  user_id) GROUP BY  career_start ORDER BY  count desc',
    tables: ['cv_partner_education', 'cv_partner_employees'],
    dataProtection: 3,
    created: '2021-09-09T09:18:43.707802',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T10:08:52.632257',
  },
  {
    name: 'degreeDist',
    queryString:
      "SELECT CASE highest_degree WHEN 0 THEN 'ukjent' WHEN 1 THEN 'annen' WHEN 2 THEN 'bachelor' WHEN 3 THEN 'master' WHEN 4 THEN 'phd' END AS degree, Count(highest_degree) AS count FROM (SELECT user_id, Max(norm_degree) AS highest_degree FROM (SELECT user_id, CASE WHEN Lower(degree) LIKE '%phd %' OR Lower(degree) LIKE '%doktor %' OR Lower(degree) LIKE '%doktorgrad%' OR Lower(degree) LIKE '%profesjonsstudiet%' THEN 4 WHEN Lower(degree) LIKE '%master %' OR Lower(degree) LIKE '% master' OR Lower(degree) LIKE '%mastergrad%' OR Lower(degree) LIKE '%sivil%' OR Lower(degree) LIKE '%(master)%' OR Lower(degree) LIKE '%siv.%' OR Lower(degree) LIKE '%cand%' OR Lower(degree) LIKE '%master%' OR Lower(degree) LIKE '%m.%' THEN 3 WHEN Lower(degree) LIKE '%bachelor %' OR Lower(degree) LIKE '%bachelor,%' OR Lower(degree) LIKE '%bachelor' OR Lower(degree) LIKE '%(bachelor)%' OR Lower(degree) LIKE '%bachelorgrad%' OR Lower(degree) LIKE '%ingeniør%' OR Lower(degree) LIKE '%b.%' OR Lower(degree) LIKE '%3-år%' THEN 2 WHEN Lower(degree) LIKE '%' THEN 1 ELSE 0 END AS norm_degree FROM dev_level_3_database.cv_partner_education) GROUP BY user_id) WHERE highest_degree >= 0 GROUP BY highest_degree",
    tables: ['cv_partner_education'],
    dataProtection: 3,
    created: '2021-12-08T12:40:38.920392',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T10:08:53.921611',
  },
  {
    name: 'projectExperience',
    queryString:
      'SELECT emp.user_id, navn, customer, description, year_from, year_to, month_from,  month_to FROM dev_level_3_database.cv_partner_project_experience AS exp JOIN (SELECT user_id, navn FROM dev_level_3_database.cv_partner_employees) emp ON exp.user_id = emp.user_id',
    tables: ['cv_partner_employees', 'cv_partner_project_experience'],
    dataProtection: 3,
    created: '2021-07-28T10:38:43.562688',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T10:08:57.380277',
  },
  {
    name: 'test123',
    queryString: 'select * from dev_level_3_database.cv_partner_employees',
    tables: ['cv_partner_employees'],
    dataProtection: 3,
    created: '2021-07-30T10:29:01.380893',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T10:08:45.708298',
  },
  {
    name: 'customerMotivationKnowledge',
    queryString:
      "SELECT customer, SUM(knowledgeAvg) as knowledgeSum, SUM(motivationAvg) AS motivationSum, category FROM (SELECT customer, a.guid, AVG(knowledge) as knowledgeAvg, AVG(motivation) as motivationAvg, c.text AS category FROM dev_level_3_database.kompetansekartlegging_answers AS a INNER JOIN dev_level_3_database.kompetansekartlegging_questions AS q ON a.questionid = q.id INNER JOIN dev_level_3_database.kompetansekartlegging_categories AS c ON q.categoryid = c.id INNER JOIN dev_level_3_database.ubw_customer_per_resource AS ubwc ON a.guid = ubwc.guid WHERE c.text != 'Jobbrotasjon' GROUP BY a.guid, c.text, customer) GROUP BY customer, category",
    tables: [
      'kompetansekartlegging_answers',
      'kompetansekartlegging_categories',
      'kompetansekartlegging_questions',
      'ubw_customer_per_resource',
    ],
    dataProtection: 3,
    created: '2021-12-20T08:41:22.756914',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T11:50:14.444199',
  },
  {
    name: 'fagEvents',
    queryString:
      "select distinct(event_summary), date_add('second', timestamp_from, date_parse('Jan-01-1970','%b-%d-%Y')) as time_from, date_add('second', timestamp_to, date_parse('Jan-01-1970','%b-%d-%Y')) as time_to from dev_level_2_database.google_calendar_events where date_add('second', timestamp_from, date_parse('Jan-01-1970','%b-%d-%Y')) > current_date - interval '3' year",
    tables: ['google_calendar_events'],
    dataProtection: 3,
    created: '2021-07-28T10:40:17.346574',
    lastUsed: null,
    lastCacheUpdate: '2022-01-25T15:40:00.509855',
  },
  {
    name: 'employeeMotivationAndCompetence',
    queryString:
      "WITH categoryAverage AS (SELECT a.email AS email, c.text AS category, AVG(a.motivation) AS categoryMotivationAvg, AVG(a.knowledge) AS categoryCompetenceAvg FROM dev_level_3_database.kompetansekartlegging_answers AS a INNER JOIN dev_level_3_database.kompetansekartlegging_questions AS q ON a.questionid = q.id INNER JOIN dev_level_3_database.kompetansekartlegging_categories AS c ON q.categoryid = c.id WHERE c.text != 'Jobbrotasjon' GROUP BY a.email, c.text) SELECT a.email AS email, a.motivation AS motivation, a.knowledge AS competence, q.topic AS subCategory, c.text AS category, ca.categoryMotivationAvg AS categoryMotivationAvg, ca.categoryCompetenceAvg AS categoryCompetenceAvg FROM dev_level_3_database.kompetansekartlegging_answers AS a INNER JOIN dev_level_3_database.kompetansekartlegging_questions AS q ON a.questionid = q.id INNER JOIN dev_level_3_database.kompetansekartlegging_categories AS c ON q.categoryid = c.id INNER JOIN categoryAverage AS ca ON a.email = ca.email AND c.text = ca.category",
    tables: [
      'kompetansekartlegging_answers',
      'kompetansekartlegging_categories',
      'kompetansekartlegging_questions',
    ],
    dataProtection: 3,
    created: '2021-09-16T14:27:20.223982',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T11:38:02.377461',
  },
  {
    name: 'jobRotationInformation',
    queryString:
      "SELECT username, email, questionid, customscalevalue, guid, index, text, categoryid FROM dev_level_3_database.kompetansekartlegging_answers a JOIN dev_level_3_database.kompetansekartlegging_questions b ON a.questionid = b.id WHERE b.categoryid = '841f669e-18d2-4ec9-a543-ed941e6dcf5f';",
    tables: [
      'kompetansekartlegging_answers',
      'kompetansekartlegging_questions',
    ],
    dataProtection: 3,
    created: '2021-10-12T06:21:00.207602',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T11:37:50.473173',
  },
  {
    name: 'perProject',
    queryString:
      'SELECT employees, hours, reg_period, timestamp, work_order, CASE WHEN customer = "dagens ubw prosjekt" THEN kunde ELSE customer END AS customer FROM (SELECT ubw_per_project_data.customer, employees, hours, ubw_per_project_data.reg_period, ubw_per_project_data.timestamp, work_order FROM dev_level_3_database.ubw_per_project_data INNER JOIN (SELECT customer, reg_period, Max(timestamp) as timestamp from ubw_per_project_data GROUP BY customer, reg_period ) as distinct_values ON ubw_per_project_data.customer = distinct_values.customer AND ubw_per_project_data.timestamp=distinct_values.timestamp AND ubw_per_project_data.reg_period = distinct_values.reg_period) LEFT JOIN test_test_no_kundemapping_test ON customer = "dagens ubw prosjekt" AND work_order=arbeids_ordre',
    tables: ['ubw_per_project_data', 'test_test_no_kundemapping_test'],
    dataProtection: 3,
    created: '2021-08-23T11:59:50.601305',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T11:50:22.057699',
  },
  {
    name: 'newMotivationAverage',
    queryString:
      "SELECT AVG(a.motivation) AS value, q.topic as subCategory, c.text as category FROM dev_level_3_database.kompetansekartlegging_answers AS a INNER JOIN dev_level_3_database.kompetansekartlegging_questions AS q ON a.questionid = q.id INNER JOIN dev_level_3_database.kompetansekartlegging_categories AS c ON q.categoryid = c.id WHERE c.text != 'Jobbrotasjon' GROUP BY q.topic, c.text",
    tables: [
      'kompetansekartlegging_answers',
      'kompetansekartlegging_categories',
      'kompetansekartlegging_questions',
    ],
    dataProtection: 3,
    created: '2021-09-16T14:27:57.144334',
    lastUsed: null,
    lastCacheUpdate: '2022-01-21T11:38:04.222782',
  },
  {
    name: 'employeeWorkStatus',
    queryString:
      "SELECT alias, guid, customer, project_type, MAX(reg_period) as last_reg_period, SUM(weigth - 1) AS weight_sum FROM ( SELECT reg_period, alias, project_type, customer, weigth, guid FROM dev_level_3_database.ubw_customer_per_resource d1 WHERE d1.reg_period > date_format(date_add('week', -5, from_unixtime(1635773486)), '%Y%v') ) GROUP BY alias, guid, customer, project_type",
    tables: ['ubw_customer_per_resource'],
    dataProtection: 3,
    created: '2022-01-26T09:48:19.801911',
    lastUsed: null,
    lastCacheUpdate: '2022-01-26T09:48:24.170895',
  },
]
