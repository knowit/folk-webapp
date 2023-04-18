import React, { useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { pageTitle } from '../../utils/pagetitle'

interface NavTabContent {
  content: any
  title: string
  pageTitle: string
}

const classes = {
  sxTab: {
    padding: '0',
    color: '#000',
    fontSize: '32px',
    display: 'flex',
    alignItems: 'stretch',
    textTransform: 'none',
    borderRadius: '5px',
    backgroundColor: '#b8b8b6',
    lineHeight: '1',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '10px',
  },
  sxTabs: [
    {
      marginTop: '-10px',
      marginBottom: '20px',
      display: 'flex',
      flexWrap: 'wrap',
      backgroundColor: '#333333',
      padding: '10px 25px 0px 25px',
    },
    { '& .MuiTabs-indicator': { display: 'none' } },
    {
      '& .Mui-selected': {
        backgroundColor: '#F1F0ED',
        color: '#000',
      },
    },
  ],
}

interface NavTabProps {
  contentList: NavTabContent[]
}

const localStorageKey = 'ClientPageCurrentTab'
const getCurrentTabValue = () => {
  const currentTabValue = sessionStorage.getItem(localStorageKey)
  return currentTabValue ? parseInt(currentTabValue) : 0
}

export default function NavTab(props: NavTabProps) {
  const currentTabValue = getCurrentTabValue()
  const [value, setValue] = useState<number>(currentTabValue)

  const handleChange = (event: any, tabValue: number) => {
    setValue(tabValue)
    sessionStorage.setItem(localStorageKey, `${tabValue}`)
    pageTitle(props.contentList[tabValue].pageTitle)
  }

  const createTabs = () => {
    return props.contentList.map((content, index) => (
      <Tab
        sx={classes.sxTab}
        value={index}
        key={`navigation-tab-${content.title}`}
        label={content.title}
      />
    ))
  }

  return (
    <>
      <Tabs
        sx={classes.sxTabs}
        value={value}
        onChange={handleChange}
        variant="fullWidth"
      >
        {createTabs()}
      </Tabs>
      {props.contentList[value].content}
    </>
  )
}
