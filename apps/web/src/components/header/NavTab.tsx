import React, { useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import { styled } from '@mui/material/styles'
import { pageTitle } from '../../utils/pagetitle'

interface NavTabContent {
  content: any
  title: string
  pageTitle: string
}
interface NavTabProps {
  contentList: NavTabContent[]
}

const TabStyled = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.primary,
  // fontSize: 26,
  backgroundColor: theme.palette.primary.light,
  padding: 0,
  alignItems: 'stretch',
  borderRadius: 5,
}))
const TabsStyled = styled(Tabs)(({ theme }) => ({
  marginBottom: 20,
  '& .MuiTabs-indicator': { display: 'none' },
  '& .Mui-selected': {
    backgroundColor: theme.palette.background.paper,
  },
}))

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
      <TabStyled
        value={index}
        key={`navigation-tab-${content.title}`}
        label={content.title}
      />
    ))
  }

  return (
    <>
      <TabsStyled
        textColor="primary"
        value={value}
        onChange={handleChange}
        variant="fullWidth"
      >
        {createTabs()}
      </TabsStyled>
      {props.contentList[value].content}
    </>
  )
}
