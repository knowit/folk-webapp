import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import CharacterLimitBox from './CharacterLimitBox';
import { useFetchedData } from '../hooks/service';
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

const makeKeyFromText = (value: string): string => value.replace(' ', '_');

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
          competencesList.map((competence) => (
            <div key={makeKeyFromText(competence)}>
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
        {['Uinteressert', 'Tja', 'Interessert'].map((level) => (
          <div key={makeKeyFromText(level)}>{level}</div>
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

export default function EmployeeInfo({
  data,
  callBack,
  id,
}: {
  data: { competenceUrl: string };
  callBack: (rowKey: string, height: number) => void;
  id: string;
}) {
  let targetRef: any;
  function setRef(ref: any) {
    targetRef = ref;
  }
  const getOffsetHeight = (thisTargetRef: any) => thisTargetRef.offsetHeight;
  const classes = useStyles();
  const url = data.competenceUrl;
  const [empData, pending] = useFetchedData<EmployeeInfoData>({ url });
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

    return knowit === undefined || knowit.year_from < 0 ? (
      <NoData />
    ) : (
      `${[monthFrom, knowit?.year_from].join(' - ')}.`
    );
  };

  const getStringFromList = (
    list: string[] | null | undefined,
    listName: 'skills' | 'roles' | 'languages'
  ) => {
    return list && list.length > 0 ? (
      `${Array.from(new Set(empData?.tags[listName]))
        .filter((x) => x)
        .join(', ')}.`
    ) : (
      <NoData />
    );
  };

  useEffect(() => {
    if (!pending && data && targetRef) {
      const dataHeight = getOffsetHeight(targetRef);
      callBack(id, dataHeight + 77);
    }
  }, [pending, empData, targetRef, id, data]);
  return (
    <div className={classes.root} ref={setRef}>
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
            <b>Startet i Knowit:</b> {startedInKnowit(empData?.workExperience)}
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
      {pending ? (
        <Skeleton variant="rect" height={67} animation="wave" />
      ) : (
        <CompetenceMapping competences={empData?.competence} />
      )}
    </div>
  );
}
