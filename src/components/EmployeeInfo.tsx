import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CharacterLimitBox from './CharacterLimitBox';

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
  interestLevels,
}: {
  competences: string[];
  interestLevels: string[];
}) {
  const classes = useCompetenceMappingStyles();
  return (
    <div className={classes.root}>
      <div>
        {competences.map((competence, i) => (
          <div key={i}>
            <CharacterLimitBox text={competence} lim={15} />
          </div>
        ))}
      </div>
      <div className={classes.gradient}>
        {interestLevels.map((level, i) => (
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

export default function EmployeeInfo() {
  const classes = useStyles();

  const competences = [
    'Continious Integration',
    'Prosjektledelse',
    'Team Foundation Server (TFS)',
  ];
  const interestLevels = ['Uinteressert', 'Tja', 'Interessert'];

  return (
    <div className={classes.root}>
      <div className={classes.cell}>
        <b>Hovedkompetanse:</b> UX, GUI, UU, mobil, web, prototyping.
      </div>
      <div className={classes.cell}>
        <b>Roller:</b> Interaksjonsdesigner, grafisk designer, team lead, kokk,
        trommeslager, tryllekunstner.
      </div>
      <div className={classes.cell}>
        <b>Startet i Knowit:</b> 01.02 - 2018
      </div>
      <div className={classes.cell}>
        <b>Total arbeidserfaring:</b> 7 år
      </div>
      <div className={classes.cell}>
        <b>Språk:</b> Norsk (morsmål), engelsk, tysk, russisk, flamsk.
      </div>
      <CompetenceMapping
        competences={competences}
        interestLevels={interestLevels}
      />
    </div>
  );
}
