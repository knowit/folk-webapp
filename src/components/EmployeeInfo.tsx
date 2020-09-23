import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CharacterLimitBox from './CharacterLimitBox';
import { useFetchedData } from '../hooks/service';
import { Skeleton } from '@material-ui/lab';

type Experience = {
  employer: string;
  month_from: number;
  year_from: number;
};

type CompetenceMap = {
  [key: string]: { competance: number; motivation: number };
};

interface EmployeeInfoData {
  competanse: CompetenceMap;
  tags: {
    languages: string[];
    skills: string[];
    roles: string[];
  };
  workExperience: Experience[];
}

const useCompetenceMappingStyles = makeStyles({
  root: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    '& > div': {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
      '& > div': {
        width: '33%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      },
      '& :nth-child(2)': {
        textAlign: 'center',
      },
      '& :nth-child(3)': {
        textAlign: 'right',
      },
    },
  },
  gradient: {
    backgroundImage: 'linear-gradient(to right, #0040d5, #ff0707)',
    '& >div': {
      fontSize: '10px',
      fontWeight: 'bold',
      color: 'white',
      padding: '2px 5px',
    },
  },
});

function CompetenceMapping({
  competences,
}: {
  competences: CompetenceMap | undefined;
}) {
  const classes = useCompetenceMappingStyles();

  const competenceMap = Object.entries(competences || {}).sort(
    ([, { motivation: a }], [, { motivation: b }]) => a - b
  );
  const competencesList =
    competenceMap.length > 2
      ? [
          competenceMap[0][0],
          competenceMap[Math.floor(competenceMap.length / 2)][0],
          competenceMap.slice(-1)[0][0],
        ]
      : [];

  return (
    <div className={classes.root}>
      <div>
        {competencesList.map((competence, i) => (
          <div key={i}>
            <CharacterLimitBox text={competence}/>
          </div>
        ))}
      </div>
      <div className={classes.gradient}>
        {competencesList.length > 0
          ? ['Uinteressert', 'Tja', 'Interessert'].map((level, i) => (
              <div key={i}>{level}</div>
            ))
          : null}
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    lineHeight: '1.2em',
    whiteSpace: 'normal',
    marginTop: '10px',
    width: '380px',
    background:
      'transparent linear-gradient(180deg, #FFFFFF 0%, #F7F7F7 100%) 0% 0%',
    '& div.expandable-box-cell': {},
  },
  cell: {
    marginBottom: '12px',
    padding: '0 15px',
  },
});

export default function EmployeeInfo({
  data: { competanceUrl: url },
}: {
  data: { competanceUrl: string };
}) {
  const classes = useStyles();
  const [data, pending] = useFetchedData<EmployeeInfoData>({ url });

  const totalExperience = (allExperience: Experience[] | undefined) => {
    const firstJob = allExperience?.sort(
      (a, b) => a.year_from - b.year_from
    )[0];
    return `${2020 - (firstJob ? firstJob?.year_from : 2020)} år`;
  };

  const startedInKnowit = (allExperience: Experience[] | undefined) => {
    const knowit = allExperience?.find((x) =>
      x.employer.toLowerCase().includes('knowit') ||
      x.employer.toLowerCase().includes('objectnet') ||
      x.employer.toLowerCase().includes('know it')
    );
    return [knowit?.year_from, knowit?.month_from].join('/');
  };

  return (
    <div className={classes.root}>
      <div className={classes.cell}>
        {pending ? (
          <Skeleton variant="rect" width={340} height={15} animation="wave" />
        ) : (
          <>
            <b>Hovedkompetanse:</b>{' '}
            {data?.tags.skills.filter((x) => x).join(', ')}
          </>
        )}
      </div>
      <div className={classes.cell}>
        {pending ? (
          <Skeleton variant="rect" width={340} height={15} animation="wave" />
        ) : (
          <>
            <b>Roller:</b> {data?.tags.roles.filter((x) => x).join(', ')}
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
            <b>Språk:</b> {data?.tags.languages.filter((x) => x).join(', ')}
          </>
        )}
      </div>
      {pending ? (
        <Skeleton variant="rect" height={67} animation="wave" />
      ) : (
        <CompetenceMapping competences={data?.competanse} />
      )}
    </div>
  );
}
