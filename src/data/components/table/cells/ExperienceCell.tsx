import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { Skeleton } from '@material-ui/lab';
import { useFetchedData } from '../../../../hooks/service';
import { ErrorText, NoData } from '../../../../components/ErrorText';

interface Experience {
  customer: string;
  project: string;
  time_to: string;
  time_from: string;
}

interface ExperienceData {
  name: string;
  experience: Experience[];
}

const useModalStyles = makeStyles({
  root: {
    backgroundColor: '#f1f0ec',
    width: '433px',
    minHeight: '50px',
    maxHeight: '400px',
    border: ' 1px solid #d8d7d4',
    overflow: 'auto',
    pointerEvents: 'all',
  },
  button: {
    textDecoration: 'none',
    padding: 0,
    minWidth: 'auto',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    padding: '0 20px 20px',
    '& h4': {
      marginBottom: 0,
      fontSize: 16,
    },
    '& div': {
      fontSize: 14,
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

    '& >h2': {
      margin: '0 0 8px 0',
      padding: 0,
    },
    '& a': {
      cursor: 'pointer',
      color: '#333',
    },
  },
});
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
 function toNorwegianMonths(date: string) {
  if (date !== '') {
    const dateArray = date.split('/');
    const formattedMont = months[Number(dateArray[1]) - 1] || '';
    return formattedMont + ' ' + dateArray[0];
  } else {
    return '';
  }
}
export function getExperience(experience: Experience[] | undefined) {
  console.log(experience)
  if (!experience) return <NoData />;
  return experience.map((exp, index) => (
    <div key={index}>
      <h4>
        {toNorwegianMonths(exp.time_from)} - {toNorwegianMonths(exp.time_to)}
      </h4>
      <div>{exp.customer}</div>
      <div>{exp.project}</div>
    </div>
  ));
}
function ExperiencePopoverModel({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  const classes = useModalStyles();
  const [userInfo, pending] = useFetchedData<ExperienceData>({ url });

  return (
    <div className={classes.root}>
      <div className={classes.cvBoxHeader}>
        {pending ? (
          <Skeleton variant="rect" width={220} height={30} animation="wave" />
        ) : (
          <h2>{userInfo?.name}</h2>
        )}
        <div>
          <Button onClick={onClose} title="Lukk" className={classes.button}>
            <CloseIcon />
          </Button>
        </div>
      </div>
      <div className={classes.content}>
        {pending ? (
          <Skeleton variant="rect" height={320} animation="wave" />
        ) : (
          ''
        )}
        {!pending && userInfo?.experience ? (
          getExperience(userInfo.experience)
        ) : (
          <ErrorText />
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  triggerLink: {
    color: '#333',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '14px',
    textTransform: 'inherit',
    padding: '0px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
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

export default function ExperienceCell({ data }: { data: string }) {
  const [showExperienceData, setExperienceData] = React.useState(false);
  const classes = useStyles();
  return (
    <>
      {!data ? (
        <NoData />
      ) : (
        <Button
          onClick={() => setExperienceData(!showExperienceData)}
          className={classes.triggerLink}
        >
          Se prosjekter
        </Button>
      )}

      <Modal
        open={showExperienceData}
        onClose={() => setExperienceData(!showExperienceData)}
        BackdropProps={{ invisible: true }}
      >
        <Fade in={showExperienceData}>
          <div className={classes.modal}>
            <ExperiencePopoverModel
              url={data}
              onClose={() => setExperienceData(!showExperienceData)}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
}
