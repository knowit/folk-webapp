import React from 'react';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles({
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

export default function ExperienceCell() {
  const [showExperienceData, setExperienceData] = React.useState(false);
  const classes = useStyles();

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
