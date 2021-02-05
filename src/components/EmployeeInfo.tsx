import React, { Dispatch, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { useFetchedData } from '../hooks/service';
import { NoData } from './ErrorText';
import { RowStates, Action } from '../data/components/table/DataTable';
import { ChartSkeleton, ExperienceData } from '../pages/EmployeeSite';
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
  allExperience?.map((job) => {
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
    },
    erfaring: {
      width: '365px',
      borderLeft: `1px solid white`,
      paddingLeft: '15px',
      overflowY: 'auto',
      maxHeight: '390px',
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
  rowStates,
  dispatch,
}: {
  data: { competenceUrl: string; user_id: string; email_id: string };
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
    if (!list || list === undefined) return <NoData />;
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
            <>
              <b>Total arbeidserfaring:</b>{' '}
              {totalExperience(empData?.workExperience)}
            </>
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
          getWorkExperience(empData?.workExperience)
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
          url={'/api/data/employeeRadar?user_id=' + data.email_id}
          title="Motivasjon"
          Component={DDChart}
          SkeletonComponent={ChartSkeleton}
          fullSize
          dataComponentProps={{
            valueKey: ['motivasjon', 'kompetanse'],
          }}
        />
      </div>
    </div>
  );
}

function getWorkExperience(workExp: Experience[] | undefined) {
  if (!workExp) return <div> Fant ingen arbeidserfaring </div>;
  const timeToNumber = (year: number, month: number) => {
    return Number(year + (month > 9 ? '' : '0') + month);
  };
  const sortedExp = workExp.sort(
    (expA, expB) =>
      timeToNumber(expB.year_from, expB.month_from) -
      timeToNumber(expA.year_from, expA.month_from)
  );
  return sortedExp.map((exp, index) => (
    <div key={index}>
      {exp.year_from !== -1 ? exp.year_from : ' '} - {exp.employer}
    </div>
  ));
}

const GetProjects = (expData: { expData: ExperienceData | null }) => {
  const classes = useStyles();
  if (!expData || !expData.expData || !expData.expData.experience)
    return <div> Fant ingen prosjekter </div>;
  const timeToNumber = (time: string) => Number(time.split('/').join(''));
  const sortedExp = expData!.expData!.experience.sort(
    (projectA, projectB) =>
      timeToNumber(projectB.time_from) - timeToNumber(projectA.time_from)
  );
  return (
    <>
      {sortedExp.map((exp, index) => (
        <div className={classes.prosjektliste} key={index}>
          {exp.project}
        </div>
      ))}
    </>
  );
};
