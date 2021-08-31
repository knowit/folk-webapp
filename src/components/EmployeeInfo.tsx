import React, { Dispatch, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { useFetchedData } from '../hooks/service';
import { NoData } from './ErrorText';
import { RowStates, Action } from '../data/components/table/DataTable';
import {
  ChartSkeleton,
  ExperienceData,
  ProjectExperience,
} from '../pages/EmployeeSite';
import DDItem, { DDChart } from '../data/DDItem';

type Experience = {
  employer: string;
  month_from: number;
  year_from: number;
  month_to: number;
  year_to: number;
};
type Date = { year: number; month: number } | { year: number };
type MotivationMap = {
  [category: string]: number;
};

interface EmployeeInfoData {
  motivation: MotivationMap;
  tags: {
    languages: string[];
    skills: string[];
    roles: string[];
  };
  workExperience: Experience[];
  manager: string;
  guid: string;
}

export const months = [
  'Januar',
  'Februar',
  'Mars',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const startedInKnowit = (allExperience: Experience[] | undefined) => {
  if (!allExperience) {
    return <NoData />;
  }
  const knowit = allExperience?.find((x) =>
    x.employer
      ? x.employer.toLowerCase().includes('knowit') ||
        x.employer.toLowerCase().includes('objectnet') ||
        x.employer.toLowerCase().includes('know it')
      : null
  );

  const monthFrom =
    knowit && knowit?.month_from < 10
      ? `0${knowit?.month_from}`
      : knowit?.month_from;

  return knowit === undefined || knowit === null || knowit.year_from < 0 ? (
    <NoData />
  ) : (
    `${[monthFrom, knowit?.year_from].join('/')}.`
  );
};

export const totalExperience = (allExperience: Experience[] | undefined) => {
  if (!allExperience) {
    return <NoData />;
  }
  const dates: Date[] = [];
  allExperience &&
    allExperience.forEach((job) => {
      job.year_from !== -1 && dates.push({ year: job.year_from });
      job.year_to !== -1 && dates.push({ year: job.year_to });
    });
  const firstJob = dates?.sort((dateA, dateB) => dateA.year - dateB.year)[0];

  return firstJob?.year === undefined || firstJob?.year < 0 ? (
    <NoData />
  ) : (
    `${new Date().getFullYear() - firstJob?.year} år.`
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    info: {
      paddingTop: '15px',
      width: '385px',
      lineHeight: '1.2em',
      whiteSpace: 'normal',
    },
    cell: {
      marginBottom: '12px',
      padding: '0 15px',
      lineHeight: '18px',
    },
    prosjektliste: {
      lineHeight: '18px',
      paddingBottom: '12px',
    },
    erfaring: {
      width: '365px',
      borderLeft: `1px solid white`,
      paddingLeft: '15px',
      overflowY: 'auto',
      paddingBottom: '15px',
    },
    oversikt: {
      width: '390px',
      borderLeft: `1px solid white`,
    },
    root: {
      display: 'flex',
      flexDirection: 'row',
      background: `${theme.palette.background.paper}`,
      borderLeft: '1px solid white',
      borderRight: '1px solid white',
      fontSize: '12px',
      height: '450px',
    },
  })
);

export default function EmployeeInfo({
  data,
  id,
  dispatch,
}: {
  data: {
    competenceUrl: string;
    user_id: string;
    email_id: string;
    degree: string;
  };
  id: string;
  rowStates: RowStates;
  dispatch: Dispatch<Action>;
}) {
  let targetRef: any;
  function setRef(ref: any) {
    targetRef = ref;
  }
  const getOffsetHeight = (thisTargetRef: any) => thisTargetRef.offsetHeight;
  const classes = useStyles();
  const url = data.competenceUrl;
  const [empData, pending] = useFetchedData<EmployeeInfoData>({ url });
  const user_id = data ? data.user_id : null;
  const [expData, expPending] = useFetchedData<ExperienceData>({
    url: `/api/data/employeeExperience?user_id=${user_id}`,
  });

  const getStringFromList = (
    list: string[] | null | undefined,
    listName: 'skills' | 'roles' | 'languages'
  ) => {
    if (!list) return <NoData />;
    return list.length > 0 ? (
      `${Array.from(new Set(empData?.tags[listName]))
        .filter((x) => x)
        .join(', ')}.`
    ) : (
      <NoData />
    );
  };

  useEffect(() => {
    if (!pending && targetRef) {
      const dataHeight = getOffsetHeight(targetRef);
      dispatch({ type: 'CHANGE_HEIGHT', id, height: dataHeight + 72 });
      dispatch({ type: 'SET_EXPANDED_DATA', id, expandedData: empData });
    }
  }, [pending, empData, targetRef, id, dispatch]);

  return (
    <div ref={setRef} className={classes.root}>
      <div className={classes.info}>
        <div className={classes.cell}>
          <b>Utdanning: </b>
          {data.degree}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Hovedkompetanse: </b>
              {getStringFromList(empData?.tags.skills, 'skills')}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Roller: </b>
              {getStringFromList(empData?.tags.roles, 'roles')}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Startet i Knowit:</b>{' '}
              {startedInKnowit(empData?.workExperience)}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <div title="Beregnet ut i fra første jobb på CV">
              <b>Beregnet arbeidserfaring: </b>
              {totalExperience(empData?.workExperience)}
            </div>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Språk: </b>
              {getStringFromList(empData?.tags.languages, 'languages')}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Nærmeste leder: </b>
              {empData?.manager}
            </>
          )}
        </div>
      </div>
      <div className={classes.erfaring}>
        <h3> Arbeidserfaring</h3>
        {pending ? (
          <Skeleton variant="rect" width={340} height={15} animation="wave" />
        ) : (
          <GetWorkExperience workExp={empData?.workExperience} />
        )}
        <h3> Prosjekterfaring </h3>
        {expPending ? (
          <Skeleton variant="rect" width={340} height={15} animation="wave" />
        ) : (
          <GetProjects expData={expData} />
        )}
      </div>
      <div className={classes.oversikt}>
        <DDItem
          url={'/api/data/employeeRadar?email=' + data.email_id}
          title="Motivasjon"
          Component={DDChart}
          SkeletonComponent={ChartSkeleton}
          fullSize
          dataComponentProps={{
            chartVariants: [
              {
                type: 'Bar',
                props: {
                  dataKey: 'category',
                  yLabels: ['motivation', 'competence'],
                  maxValue: 5,
                },
              },
              {
                type: 'Radar',
                props: {
                  groupKey: 'category',
                  valueKey: ['motivation', 'competence'],
                  maxValue: 5,
                },
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
const yearAndMonthToNumber = (year: number, month: number) => {
  let stringMonth;
  if (month < 10) {
    stringMonth = '0' + month;
  } else if (month > 9) {
    stringMonth = String(month);
  } else {
    stringMonth = '00';
  }
  return Number(year + stringMonth);
};

export const GetWorkExperience = (workExp: {
  workExp: Experience[] | undefined;
}) => {
  if (!workExp.workExp) return <div> Fant ingen arbeidserfaring </div>;

  workExp.workExp.sort(
    (expA, expB) =>
      yearAndMonthToNumber(expB.year_from, expB.month_from) -
      yearAndMonthToNumber(expA.year_from, expA.month_from)
  );
  return (
    <>
      {workExp.workExp.map((exp, index) => (
        <div key={index}>
          {getPrettyDates(
            exp.month_from,
            exp.year_from,
            exp.month_to,
            exp.year_to
          )}
          {exp.employer}
        </div>
      ))}
    </>
  );
};

const timeToNumber = (time: string) => {
  const [year, month] = time.split('/');
  return yearAndMonthToNumber(Number(year), Number(month));
};

function compare(a: ProjectExperience, b: ProjectExperience) {
  const aTime = a.time_from ? a.time_from : a.time_to;
  const bTime = b.time_from ? b.time_from : b.time_to;
  if (timeToNumber(aTime) < timeToNumber(bTime)) {
    return 1;
  }
  if (timeToNumber(aTime) > timeToNumber(bTime)) {
    return -1;
  }
  return 0;
}

export const GetProjects = (expData: { expData: ExperienceData | null }) => {
  const classes = useStyles();
  if (!expData || !expData.expData || !expData.expData.experience)
    return <div> Fant ingen prosjekter </div>;
  expData.expData.experience.sort(compare);
  return (
    <>
      {expData.expData.experience.map((exp, index) => (
        <div className={classes.prosjektliste} key={index}>
          {prettyDates(exp.time_from, exp.time_to)}
          {exp.customer} - <i>{exp.project}</i>
        </div>
      ))}
    </>
  );
};
const prettyDates = (date1: string, date2: string) => {
  const [fromYear, fromMonth] = date1.split('/');
  const [toYear, toMonth] = date2.split('/');
  return getPrettyDates(
    Number(fromMonth),
    Number(fromYear),
    Number(toMonth),
    Number(toYear)
  );
};
const getPrettyDates = (
  fromMonth: number,
  fromYear: number,
  toMonth: number,
  toYear: number
) => {
  const prettyFromMonth =
    fromMonth && fromMonth !== -1 ? months[fromMonth - 1] + ' ' : '';
  const prettyFromYear = fromYear && fromYear !== -1 ? fromYear : '';
  const prettyToMonth =
    toMonth && toMonth !== -1 ? months[toMonth - 1] + ' ' : '';
  const prettyToYear = toYear && toYear !== -1 ? toYear : '';
  const bothYears = prettyFromYear && prettyToYear ? ' - ' : '';
  return (
    prettyFromMonth +
    prettyFromYear +
    bothYears +
    prettyToMonth +
    prettyToYear +
    ': '
  );
};
