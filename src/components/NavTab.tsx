import React, { useState } from 'react'
import { createStyles, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

interface NavTabContent {
  content: any;
  title: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    tabsContainer: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      backgroundColor: '#333333',
      padding: '10px 25px 0px 25px',
      gap: '15px',
    },
    tabsTab: {
      fontSize: '32px',
      display: 'flex',
      alignItems: 'stretch',
      textTransform: 'none',
      borderRadius: '5px 5px 0 0',
      backgroundColor: '#F1F0ED',
      lineHeight: "1.0",
    },
    " & :selected": {
      backgroundColor: '#330059',
    },
    indicator: {
      display: 'none',
    },
    root: {
      marginTop: "-78px",
      marginBottom: "20px",
    }
  })
)

interface NavTabProps {
  contentList: NavTabContent[];
}

const localStorageKey = "ClientPageCurrentTab"
const getCurrentTabValue = () => {
  const currentTabValue = sessionStorage.getItem(localStorageKey)
  return currentTabValue ? parseInt(currentTabValue) : 0
}

export default function NavTab(props: NavTabProps) {
  const currentTabValue = getCurrentTabValue()
  const [value, setValue] = useState<number>(currentTabValue);
  const classes = useStyles();

  const handleChange = (event: any, tabValue: number) => {
    setValue(tabValue)
    sessionStorage.setItem(localStorageKey, `${tabValue}`)
  }

  const createTabs = () => {
    return props.contentList.map((content, index) =>
      <Tab
        classes={{ root: classes.tabsTab }}
        value={index}
        key={`navigation-tab-${content.title}`}
        label={content.title}
      />)
  }

  return (
    <>
      <Tabs
        classes={{
          root: classes.root,
          flexContainer: classes.tabsContainer,
          indicator: classes.indicator
        }}
        value={value}
        onChange={handleChange}
        variant="fullWidth"
      >
        {createTabs()}
      </Tabs>
      { props.contentList[value].content }
    </>
  )
}
