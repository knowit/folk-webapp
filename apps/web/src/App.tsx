import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Header from './components/header/Header'
import Content from './components/Content'
import Footer from './components/Footer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minHeight: '100vh',
      width: '1215px',
      margin: 'auto',
      paddingBottom: '30px',
      display: 'flex',
      flexDirection: 'column',
    },
    contentContainer: {
      padding: '30px',
      backgroundColor: theme.palette.background.paper,
      borderRadius: '0px 0px 10px 10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexGrow: 1,
    },
    mainContent: {
      width: '100%',
      height: '100%',
    },
  })
)

export default function App() {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.contentContainer}>
        <main className={classes.mainContent}>
          <Content />
        </main>
        <Footer />
      </div>
    </div>
  )
}