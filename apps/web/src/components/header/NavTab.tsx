import { useState } from 'react'
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
  backgroundColor: theme.palette.background.paper,
  padding: 0,
  alignItems: 'stretch',
  borderRadius: 5,
  opacity: 0.5,
}))
const TabsStyled = styled(Tabs)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: 20,
  '& .MuiTabs-indicator': { display: 'none' },
  '& .Mui-selected': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    opacity: 1,
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
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        textColor="inherit"
      >
        {createTabs()}
      </TabsStyled>
      {props.contentList.map((content, i) =>
        i === value ? content.content : undefined
      )}
    </>
  )
}
