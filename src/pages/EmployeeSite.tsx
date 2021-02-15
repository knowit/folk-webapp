import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import DDItem, { DDChart } from '../data/DDItem';
import { useFetchedData } from '../hooks/service';
import { GetProjects, GetWorkExperience, startedInKnowit, totalExperience } from '../components/EmployeeInfo';
import { ReactComponent as FallbackUserIcon } from '../assets/fallback_user.svg';

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
  manager: string;
};

export interface ProjectExperience {
  customer: string;
  project: string;
  time_to: string;
  time_from: string;
}

export interface ExperienceData {
  name: string;
  experience: ProjectExperience[];
}

type EmpSiteData = {
  email_id: string;
  user_id: string;
  employee: EmpData;
  image: string;
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
    paddingLeft: '25px',
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
  firstPart: {
    display: 'flex',
    flexDirection: 'row',
    gap: '70px',
  },
  left: {
    width: '50%',
  },
  right: {
    width: '50%',
  },
  image: {
    borderRadius: '50%',
    backgroundColor: '#C4C4C4',
    height: '158px',
    width: '158px',
  },
  cell: {
    marginBottom: '12px',
    lineHeight: '20px',
  },
  header: {
    display: 'flex',
    paddingRight:'10px',
    paddingBottom: '20px',
    gap: '15px',
    lineHeight: '2em',
    
  },
  nextPart: {
    
  },
});

export const ChartSkeleton = () => (
  <Skeleton variant="rect" height={320} width={400} animation="wave" />
);

export default function EmployeeSite() {
  const location = useLocation();
  const email = location.pathname.split('/')[2];
  const idRegex = /(\w+\.?)*@knowit.no/;
  const url = '/api/data/empData?email=' + email;
  const [data, pending] = useFetchedData<EmpSiteData>({ url });

  const classes = useStyles();

  const email_id = data ? data.email_id : null;
  const user_id = data ? data.user_id : null;
  const emp = data ? data.employee : null;
  const tags = data ? data.tags : null;
  const [expData, expPending] = useFetchedData<ExperienceData>({
    url: `/api/data/employeeExperience?user_id=${user_id}`,
  });
  if (!email.match(idRegex)) {
    return <Redirect to={{ pathname: '/404' }} />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.firstPart}>
        <div className={classes.left}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <div className={classes.header}>
              {data?.image ? (
                <img
                  className={classes.image}
                  src={data?.image}
                  alt={emp?.navn}
                />
              ) : (
                <FallbackUserIcon />
              )}
              <div>
                <h1>{emp?.navn}</h1>
                <h2>{emp?.title}</h2>
              </div>
            </div>
          )}
          <div>
            <div className={classes.cell}>
              {pending ? (
                <Skeleton
                  variant="rect"
                  width={340}
                  height={15}
                  animation="wave"
                />
              ) : (
                <>
                  <b>Hovedkompetanse: </b>
                  {tags?.skill.replace(/;/g, ', ')}
                </>
              )}
            </div>
            <div className={classes.cell}>
              {pending ? (
                <Skeleton
                  variant="rect"
                  width={340}
                  height={15}
                  animation="wave"
                />
              ) : (
                <>
                  <b>Roller: </b>
                  {tags?.role.replace(/;/g, ', ')}
                </>
              )}
            </div>
            <div className={classes.cell}>
              {pending ? (
                <Skeleton
                  variant="rect"
                  width={340}
                  height={15}
                  animation="wave"
                />
              ) : (
                <>
                  <b>Startet i Knowit: </b>{' '}
                  {startedInKnowit(data?.workExperience)}
                </>
              )}
            </div>
            <div className={classes.cell}>
              {pending ? (
                <Skeleton
                  variant="rect"
                  width={340}
                  height={15}
                  animation="wave"
                />
              ) : (
                <div title="beregnet ut i fra første jobb på cv">
                  <b>Beregnet arbeidserfaring: </b>
                  {totalExperience(data?.workExperience)}
                </div>
              )}
            </div>
            <div className={classes.cell}>
              {pending ? (
                <Skeleton
                  variant="rect"
                  width={340}
                  height={15}
                  animation="wave"
                />
              ) : (
                <>
                  <b>Språk: </b>
                  {tags?.language.replace(';', ', ')}
                </>
              )}
            </div>
            <div className={classes.cell}>
              {pending ? (
                <Skeleton
                  variant="rect"
                  width={340}
                  height={15}
                  animation="wave"
                />
              ) : (
                <>
                  <b>Utdanning: </b>
                  {data && data?.degree}
                </>
              )}
            </div>
            <div className={classes.cell}>
              {pending ? (
                <Skeleton
                  variant="rect"
                  width={340}
                  height={15}
                  animation="wave"
                />
              ) : (
                <>
                  <b>Nærmeste leder: </b>
                  *DATA FRA AD HER*
                </>
              )}
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <p><b>Kompetansekartlegging</b></p>
          {pending ? (
            <ChartSkeleton />
          ) : (
            <DDItem
              url={'/api/data/employeeRadar?user_id=' + email_id}
              title="Motivasjon"
              Component={DDChart}
              SkeletonComponent={ChartSkeleton}
              fullSize
              dataComponentProps={{
                chartVariants: [
                  {
                    type: 'Radar',
                    props: {
                      groupKey: 'kategori',
                      valueKey: ['motivasjon', 'kompetanse'],
                    },
                  },
                ],
              }}
            />
          )}
        </div>
      </div>
      <div className={classes.nextPart}>
        <h2>Arbeidserfaring</h2>
        {pending ? (
          <p>loading....</p>
        ) : (
          <GetWorkExperience workExp={data?.workExperience} />
        )}

        <h2>Prosjekterfaring</h2>
        {!expPending && expData ? (
          <GetProjects expData={expData} />
        ) : (
          <p>loading....</p>
        )}
        <h2>Download CV</h2>
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
  );
}
