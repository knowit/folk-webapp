import { useMatomo } from '@jonkoops/matomo-tracker-react'
import NavTab from '../../components/header/NavTab'
import CustomerList from './customer-list/CustomerList'
import { CustomerOverview } from './customer-overview/CustomerOverview'
import { useEffect } from 'react'
import { pageTitle } from '../../utils/pagetitle'

export default function Customer() {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      documentTitle: 'Kunder',
    })
    pageTitle('Kundeliste')
  }, [trackPageView])

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
