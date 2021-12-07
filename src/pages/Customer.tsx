import React from 'react'
import NavTab from '../components/NavTab'
import CustomerGraphs from '../components/CustomerGraphs'
import CustomerList from '../components/CustomerList'

export default function Customer() {
  return (
    <NavTab
      contentList={[
        { content: CustomerList(), title: 'Listevisning' },
        { content: CustomerGraphs(), title: 'Overordnet oversikt' },
      ]}
    />
  )
}
