import React from 'react'
import NavTab from '../components/header/NavTab'
import CustomerList from './customer/CustomerList'
import { CustomerOverview } from './customer/CustomerOverview'

export default function Customer() {
  return (
    <NavTab
      contentList={[
        { content: CustomerList(), title: 'Listevisning' },
        { content: CustomerOverview(), title: 'Overordnet oversikt' },
      ]}
    />
  )
}
