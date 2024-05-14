import { useParams } from 'react-router-dom'
import { CustomerSiteContent } from './components/CustomerSiteContent'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { useEffect } from 'react'

export default function CustomerSite() {
  const { trackPageView } = useMatomo()
  const routeParameters = useParams()
  const customerId = routeParameters.id

  useEffect(() => {
    trackPageView({
      documentTitle: `Customer - ${customerId}`,
    })
  })

  return <CustomerSiteContent customerId={customerId} />
}
