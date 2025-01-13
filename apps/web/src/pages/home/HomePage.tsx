import { useEffect } from 'react'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { pageTitle } from '../../utils/pagetitle'
import ReactMarkdown from 'react-markdown'
import homeContents from './Home.md?raw'

export default function HomePage() {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      documentTitle: 'Hjem',
    })
    pageTitle('Hjem')
  }, [trackPageView])

  return <ReactMarkdown>{homeContents}</ReactMarkdown>
}
