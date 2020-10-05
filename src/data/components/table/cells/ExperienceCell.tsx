import React from 'react';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { useFetchedData } from '../../../../hooks/service'
import { Skeleton } from '@material-ui/lab';
import { ErrorText, NoData } from '../../../../components/ErrorText';


interface Experience {
  customer: string
  project: string
  time_to: string
  time_from: string
}

interface ExperienceData {
  name: string
  experience: Experience[]
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
  }
})

function ExperiencePopoverModel({
  url,
  onClose
} : {
  url: string,
  onClose: () => void
}) {
  const classes = useModalStyles();
  const [userInfo, pending] = useFetchedData<ExperienceData>({ url });

  return (
    <div className={classes.root}>
      <div className={classes.cvBoxHeader}>
        {pending 
          ? <Skeleton variant="rect" width={220} height={30} animation="wave" /> 
          : <h2>{userInfo?.name}</h2>}
        <div>
          <Link
            onClick={() => onClose()}
            title="Lukk"
          >
            <CloseIcon />
          </Link>
        </div>
      </div>
      <div className={classes.content}>
        {pending 
          ? <Skeleton variant="rect" height={320} animation="wave" />  
          : userInfo?.experience? userInfo?.experience.map(exp => (
            <div>
              <h4>{exp.time_from} - {exp.time_to}</h4>
              <div>{exp.customer}</div>
              <div>{exp.project}</div>
            </div>
          )):<ErrorText/>
        }
      </div>
      
    </div>
  )
}


const useStyles = makeStyles({
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

export default function ExperienceCell({ data } : { data: string }) {
  const [showExperienceData, setExperienceData] = React.useState(false);
  const classes = useStyles();
  return (
    <>
      { data?
      <NoData/>
      :
      <Link
        onClick={() => setExperienceData(!showExperienceData)}
        className={classes.triggerLink}
      >
        Se prosjekter
      </Link>

      }
      
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
