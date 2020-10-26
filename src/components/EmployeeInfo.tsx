import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CharacterLimitBox from './CharacterLimitBox';
import { useFetchedData } from '../hooks/service';
import { Skeleton } from '@material-ui/lab';
import { NoData } from './ErrorText';

type Experience = {
  employer: string;
  month_from: number;
  year_from: number;
};

type CompetenceMap = {
  [key: string]: { competence: number; motivation: number };
};

interface EmployeeInfoData {
  competence: CompetenceMap;
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
        {competencesList.length > 0 ? (
          competencesList.map((competence, i) => (
            <div key={i}>
              <CharacterLimitBox
                text={competence.charAt(0).toUpperCase() + competence.slice(1)}
              />
            </div>
          ))
        ) : (
          <>
            <div key={1}>
              <NoData />
            </div>
            <div key={2}>
              <NoData />
            </div>
            <div key={3}>
              <NoData />
            </div>
          </>
        )}
      </div>
      <div className={classes.gradient}>
        {['Uinteressert', 'Tja', 'Interessert'].map((level, i) => (
          <div key={i}>{level}</div>
        ))}
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    lineHeight: '1.2em',
    whiteSpace: 'normal',
    marginTop: '10px',
    fontSize: '12px',
    background:
      'transparent linear-gradient(180deg, #FFFFFF 0%, #F7F7F7 100%) 0% 0%',
    '& div.expandable-box-cell': {},
  },
  cell: {
    marginBottom: '12px',
    padding: '0 15px',
    lineHeight: '18px',
  },
});

export default function EmployeeInfo(cellData: { competenceUrl: string }) {
  const classes = useStyles();
  const url = cellData.competenceUrl;
  const [data, pending] = useFetchedData<EmployeeInfoData>({ url });
  const totalExperience = (allExperience: Experience[] | undefined) => {
    const firstJob = allExperience?.sort(
      (a, b) => a.year_from - b.year_from
    )[0];
    return firstJob?.year_from === undefined || firstJob?.year_from < 0 ? (
      <NoData />
    ) : (
      `${new Date().getFullYear() - firstJob?.year_from} år.`
    );
  };

  const startedInKnowit = (allExperience: Experience[] | undefined) => {
    const knowit = allExperience?.find(
      (x) =>
        x.employer ?
          x.employer.toLowerCase().includes('knowit') ||
          x.employer.toLowerCase().includes('objectnet') ||
          x.employer.toLowerCase().includes('know it')
        : null
    );

    const monthFrom =
      knowit && knowit?.month_from < 10
        ? '0' + knowit?.month_from
        : knowit?.month_from;
  
    return knowit === undefined || knowit.year_from < 0 ? (
      <NoData />
    ) : (
      [monthFrom, knowit?.year_from].join(' - ') + '.'
    );
  };

  const getHovedkompetanse = (skills:string[] | null | undefined) => {
    return(
      skills
        ?skills.length > 0
          ? skills.filter((x) => x).join(', ') +"."
          : <NoData/>
        : <NoData/>
    );
  }

  const getRoles = (roles:string[]|null|undefined) => {
    return(
      roles
        ?roles.length > 0
          ? Array.from(new Set(data?.tags.roles)).filter((x) => x).join(', ')+ "."
          : <NoData/>
        : <NoData/>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.cell}>
        {pending ? (
          <Skeleton variant="rect" width={340} height={15} animation="wave" />
        ) : (
          <>
            <b>Hovedkompetanse:</b>{' '}
            {getHovedkompetanse(data?.tags.skills)}
          </>
        )}
      </div>
      <div className={classes.cell}>
        {pending ? (
          <Skeleton variant="rect" width={340} height={15} animation="wave" />
        ) : (
          <>
            <b>Roller:</b>{' '}
            {getRoles(data?.tags.roles)}
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
            <b>Språk:</b>{' '}
            {data?.tags.languages ? (
              data?.tags.languages.filter((x) => x).join(', ') + '.'
            ) : (
              <NoData />
            )}
          </>
        )}
      </div>
      {pending ? (
        <Skeleton variant="rect" height={67} animation="wave" />
      ) : (
        <CompetenceMapping competences={data?.competence} />
      )}
    </div>
  );
}
