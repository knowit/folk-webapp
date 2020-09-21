import React from 'react';
import { Avatar, FormControlLabel, Link } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { ReactComponent as FallbackUserIcon } from '../assets/fallback_user.svg';
import CloseIcon from '@material-ui/icons/Close';
import GetApp from '@material-ui/icons/GetApp';
import CharacterLimitBox from '../components/CharacterLimitBox';

import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';

const useConsultantCellStyles = makeStyles({
  root: {
    display: 'flex',
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 15,
  },
});

export function ConsultantCell({ data }: { data: { value: string, image: string | undefined } }) {
  const classes = useConsultantCellStyles();
  return (
    <div className={classes.root}>
      <Avatar alt={data.value} className={classes.image} /*src={data.image}*/ >
        <FallbackUserIcon className={classes.image} />
      </Avatar>
      <span className={classes.text}>{data.value}</span>
    </div>
  );
}

const useProjectStatusStyles = makeStyles({
  root: ({ percentData }: { percentData: string }) => ({
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    padding: '4px 10px',
    lineHeight: 1,
    width: percentData,
  }),
});

const useExperienceStyles = makeStyles({
  root: {
    backgroundColor: '#f1f0ec',
    width: '433px',
    minHeight: '50px',
    maxHeight: '400px',
    border: ' 1px solid #d8d7d4',
    overflow: 'auto',
    pointerEvents: 'all',
  },
  content: {
    padding: '0 20px 20px',
    '& h4': {
      marginBottom: 0,
    },
  },
  cvBoxHeader: {
    backgroundColor: '#f1f0ec',
    padding: '20px 20px 5px',
    position: 'sticky',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: '0',
    boxShadow: '10px 10px 10px #f1f0ec',
    '& > div': {
      marginRight: '5px',
    },
    '& >h2': {
      margin: '0 0 8px 0',
      padding: 0,
    },
    '& a': {
      cursor: 'pointer',
      color: '#333',
    },
  },
  triggerLink: {
    color: '#333',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
});

const DummyCVData = () => (
  <div>
    <div>
      <h4>Des 2019</h4>
      <div>Knowit Objectnet</div>
      <div>Dataplatform</div>
    </div>
    <div>
      <h4>Aug 2019 - Nov 2019</h4>
      <div>Knowit Objectnet</div>
      <div>Miljøteam</div>
    </div>
    <div>
      <h4>2018</h4>
      <div>Tryggchat As</div>
      <div>SmartChat</div>
    </div>
    <div>
      <h4>2018</h4>
      <div>Tryggchat As</div>
      <div>SmartChat</div>
    </div>
    <div>
      <h4>2018</h4>
      <div>Tryggchat As</div>
      <div>SmartChat</div>
    </div>
    <div>
      <h4>2018</h4>
      <div>Tryggchat As</div>
      <div>SmartChat</div>
    </div>
    <div>
      <h4>2018</h4>
      <div>Tryggchat As</div>
      <div>SmartChat</div>
    </div>
    <div>
      <h4>2018</h4>
      <div>Tryggchat As</div>
      <div>SmartChat</div>
    </div>
  </div>
);

export function ExperienceCell() {
  const [showExperienceData, setExperienceData] = React.useState(false);
  const classes = useExperienceStyles();

  return (
    <>
      <Link
        onClick={() => setExperienceData(!showExperienceData)}
        className={classes.triggerLink}
      >
        Se prosjekter
      </Link>
      <Modal
        open={showExperienceData}
        onClose={() => setExperienceData(!showExperienceData)}
        BackdropProps={{ invisible: true }}
      >
        <Fade in={showExperienceData}>
          <div className={classes.modal}>
            <div className={classes.root}>
              <div className={classes.cvBoxHeader}>
                <h2>Navn på konsulenten</h2>
                <div>
                  <Link
                    onClick={() => setExperienceData(!showExperienceData)}
                    title="Lukk"
                  >
                    <CloseIcon />
                  </Link>
                </div>
              </div>

              <div className={classes.content}>{DummyCVData()}</div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
export function EducationCell() {
  // TODO: get data for education
  return <CharacterLimitBox
          lim={36}
          text = "Master - Software engineering at the University of a Very Long Name in a Very Long Named City"
        />;
}

const useCvCellStyles = makeStyles({
  linkStyle: {
    color: '#707070',
    cursor: 'pointer',
    textDecoration: 'underline',
    '& :hover': {
      color: '#333',
    },
  },
});

export function CvCell() {
  // TODO: get url for CV-partner
  const classes = useCvCellStyles();
  return (
    <Link className={classes.linkStyle} title="Last ned CV">
      <GetApp />
    </Link>
  );
}

export function ProjectStatusCell({ data }: { data: number }) {
  const percentData = `${data}%`;
  const classes = useProjectStatusStyles({ percentData });

  return data > 0 ? (
    <div className={classes.root}>{percentData}</div>
  ) : (
    <>{'Ikke i prosjekt'}</>
  );
}

const colorLookupTable = {
  red: '#D10000',
  green: '#4C8E00',
};

const useCustomerStatusStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  statusLabel: ({ status }: { status: 'red' | 'green' }) => ({
    backgroundColor: colorLookupTable[status],
    width: 20,
    height: 20,
    borderRadius: 10,
  }),
});

export function CustomerStatusCell({
  data: { value, status },
}: {
  data: { value: string; status: 'red' | 'green' };
}) {
  const classes = useCustomerStatusStyles({ status });

  return (
    <div className={classes.root}>
      <div>{value || '-'}</div>
      <div className={classes.statusLabel} />
    </div>
  );
}

const BlackCheckBox = withStyles({
  root: {
    color: '#333333',
    '&$checked': {
      color: '#333333',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  checked: {},
})((props: CheckboxProps) => (
  <Checkbox color="default" disableRipple {...props} />
));

const useCheckBoxStyles = makeStyles({
  label: {
    marginRight: 0,
  },
  position: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export interface CheckBoxChangeHandlerProps {
  event: React.ChangeEvent<HTMLInputElement>;
}

export function CheckBoxHeaderCell({
  title,
  checkBoxLabel,
  checkBoxChangeHandler,
}: {
  title: string;
  checkBoxLabel: string;
  checkBoxChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const classes = useCheckBoxStyles();

  return (
    <div className={classes.position}>
      {title}
      <FormControlLabel
        className={classes.label}
        control={<BlackCheckBox onChange={checkBoxChangeHandler} />}
        label={checkBoxLabel}
      />
    </div>
  );
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

export function CompetenceMapping() {
  const classes = useCompetenceMappingStyles();
  const competences = [
    'Veldig lang tekst for å se hvordan det blir',
    'Prosjektledelse',
    'Prototyping',
  ];
  const interestLevels = ['Uinteressert', 'Tja', 'Interessert'];
  return (
    <div className={classes.root}>
      <div>
        {competences.map((competence, i) => (
          <div key={i} title={competence}>
            {competence}
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
