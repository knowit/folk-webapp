import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minHeight: '100vh',
      width: '1215px',
      margin: 'auto',
    },
    contentContainer: {
      paddingTop: '78px',
      paddingLeft: '30px',
      paddingRight: '30px',
      backgroundColor: '#F1F0ED',
      minHeight: 'calc(100vh - 139px)',
      borderRadius: '0px 0px 10px 10px',
    },
  })
);

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.contentContainer}>
        <Content />
        <Footer />
      </div>
    </div>
  );
}
