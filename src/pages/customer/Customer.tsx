import React from 'react'
import NavTab from '../../components/header/NavTab'
import CustomerList from './CustomerList'
import { CustomerOverview } from './CustomerOverview'

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
