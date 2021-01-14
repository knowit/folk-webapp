import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useFetchedData } from '../hooks/service';
import { startedInKnowit, totalExperience } from '../components/EmployeeInfo';

type Experience = {
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
type TagData = {
  skill: string;
  role: string;
  language: string;
};
type EmpSiteData = {
  id: string;
  employee: EmpData;
  tags: TagData;
  workExperience: Experience[];
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

export default function EmployeeSite() {
  const location = useLocation();
  const email = location.pathname.split('/')[2];
  const idRegex = /(\w+\.?)*@knowit.no/;
  const url = '/api/data/empData?email=' + email;
  const [data, pending] = useFetchedData<EmpSiteData>({ url });
  const classes = useStyles();

  if (!email.match(idRegex)) {
    return <Redirect to={{ pathname: '/404' }} />;
  }

  const emp = data ? data.employee : null;
  const tags = data ? data.tags : null;
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
              <b>Startet i Knowit:</b> {startedInKnowit(data?.workExperience)}
            </>
          )}
        </div>
        <div className={classes.cell}>
          {pending ? (
            <Skeleton variant="rect" width={340} height={15} animation="wave" />
          ) : (
            <>
              <b>Total arbeidserfaring:</b>{' '}
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
      </div>
    </>
  );
}
