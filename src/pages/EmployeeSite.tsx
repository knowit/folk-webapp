import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Grid, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import DDItem, { DDChart } from '../data/DDItem';
import { useFetchedData } from '../hooks/service';
import { startedInKnowit, totalExperience } from '../components/EmployeeInfo';
import {
  getExperience,
  months,
} from '../data/components/table/cells/ExperienceCell';
import { NoData } from '../components/ErrorText';

type WorkExperience = {
  employer: string;
  month_from: number;
  year_from: number;
  month_to: number;
  year_to: number;
};
type EmpData = {
  email: string;
  navn: string;
  title: string;
  user_id: string;
};

interface ProjectExperience {
  customer: string;
  project: string;
  time_to: string;
  time_from: string;
}

interface ExperienceData {
  name: string;
  experience: ProjectExperience[];
}

type EmpSiteData = {
  id: string;
  id2: string;
  employee: EmpData;
  tags: {
    skill: string;
    role: string;
    language: string;
  };
  workExperience: WorkExperience[];
  degree: string;
  links: {
    no_pdf: string;
    int_pdf: string;
    no_word: string;
    int_word: string;
  };
};

const useStyles = makeStyles({
  root: {
    lineHeight: '1.2em',
    whiteSpace: 'normal',
    marginTop: '10px',
    paddingBottom: '10px',
    fontSize: '16px',
  },
  cell: {
    marginBottom: '12px',
    padding: '0 15px',
    lineHeight: '20px',
  },
});

const ChartSkeleton = () => (
  <Skeleton variant="rect" height={320} width={400} animation="wave" />
);

function printWorkExperience(
  workExperience: WorkExperience[] | undefined | null
) {
  if (!workExperience) return <NoData />;
  //sort so newest is first
  workExperience.sort((a, b) => b.year_from - a.year_from);
  const getYear = (year: number) => (year !== -1 ? year : null);
  return workExperience.map((exp, index) => (
    <div key={index}>
      <h4>
        {months[exp.month_from]} {getYear(exp.year_from)} -{' '}
        {months[exp.month_to]} {getYear(exp.year_to)}
      </h4>
      <div>{exp.employer}</div>
    </div>
  ));
}

export default function EmployeeSite() {
  const location = useLocation();
  const email = location.pathname.split('/')[2];
  const idRegex = /(\w+\.?)*@knowit.no/;
  const url = '/api/data/empData?email=' + email;
  const [data, pending] = useFetchedData<EmpSiteData>({ url });

  const classes = useStyles();

  const id = data ? data.id : 'not found';
  const id2 = data ? data.id2 : null;
  const emp = data ? data.employee : null;
  const tags = data ? data.tags : null;
  const [expData, expPending] = useFetchedData<ExperienceData>({
    url: `/api/data/employeeExperience?user_id=${id2}`,
  });
  if (!email.match(idRegex)) {
    return <Redirect to={{ pathname: '/404' }} />;
  }
  return (
    <>
      {pending ? (
        <Skeleton variant="rect" width={340} height={15} animation="wave" />
      ) : (
        <>
          <h1>{emp?.navn}</h1>
          <h2>{emp?.title}</h2>
        </>
      )}
      <div className={classes.root}>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Hovedkompetanse: </b>
              {tags?.skill.replace(/;/g, ', ')}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Roller: </b>
              {tags?.role.replace(/;/g, ', ')}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Startet i Knowit: </b> {startedInKnowit(data?.workExperience)}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Total arbeidserfaring: </b>
              {totalExperience(data?.workExperience)}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Språk: </b>
              {tags?.language.replace(';', ', ')}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Utdanning: </b>
              {data && data?.degree}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Nærmeste leder: </b>
              *DATA FRA AD HER*
            </>
          )}
        </div>
        <Grid container spacing={2}>
          {pending ? (
            <ChartSkeleton />
          ) : (
            <DDItem
              url={'/api/data/employeeRadar?user_id=' + id}
              title="Motivasjon"
              Component={DDChart}
              SkeletonComponent={ChartSkeleton}
              dataComponentProps={{
                valueKey: ['motivasjon', 'kompetanse'],
              }}
            />
          )}
        </Grid>
        <div>
          <h1>Arbeidserfaring</h1>
          {pending ? (
            <p>loading....</p>
          ) : (
            printWorkExperience(data?.workExperience)
          )}
        </div>
        <div>
          <h1>Prosjekterfaring</h1>
          {!expPending && expData && expData !== undefined ? (
            getExperience(expData.experience)
          ) : (
            <p>loading....</p>
          )}
        </div>
        <div>
          <h1>Download CV</h1>
          {pending || !data ? (
            <p>loading....</p>
          ) : (
            Object.entries(data!.links).map((link) => (
              <p key={link[1]}>
                <a href={link[1]}>{link[0]}</a>
              </p>
            ))
          )}
        </div>
      </div>
    </>
  );
}
