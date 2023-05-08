import { pageTitle } from '../../utils/pagetitle'
import { useParams } from 'react-router-dom'
import { CustomerSiteContent } from './components/CustomerSiteContent'

export default function CustomerSite() {
  pageTitle('Kundeoversikt')

  const routeParameters = useParams()
  const customerId = routeParameters.id
  return <CustomerSiteContent customerId={customerId} />
}
