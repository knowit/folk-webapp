import React, { useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { pageTitle } from '../../utils/pagetitle'

interface NavTabContent {
  content: any
  title: string
  pageTitle: string
}

const classes = {
  sxTabs: [
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
