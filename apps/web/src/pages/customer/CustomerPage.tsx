import React from 'react'
import NavTab from '../../components/header/NavTab'
import CustomerList from './components/CustomerList'
import { CustomerOverview } from './components/CustomerOverview'
import { pageTitle } from '../../utils/pagetitle'

export default function Customer() {
  pageTitle('Kunder')

  return (
    <NavTab
      contentList={[
        {
          content: CustomerList(),
          title: 'Listevisning',
          pageTitle: 'Kundeliste',
        },
        {
          content: CustomerOverview(),
          title: 'Overordnet oversikt',
          pageTitle: 'Kundeoversikt',
        },
      ]}
    />
  )
}
