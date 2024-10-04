import { useEffect } from 'react'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { pageTitle } from '../../utils/pagetitle'
import Links from './Links'

export default function StartPage() {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      documentTitle: 'Start',
    })
    pageTitle('Start')
  }, [trackPageView])

  return <Links />
}
