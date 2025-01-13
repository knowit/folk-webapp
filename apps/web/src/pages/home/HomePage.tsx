import { useEffect } from 'react'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { pageTitle } from '../../utils/pagetitle'
import ReactMarkdown from 'react-markdown'
import homeContents from './Home.md'
import style from './markdown-styles.module.css'

export default function HomePage() {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      documentTitle: 'Hjem',
    })
    pageTitle('Hjem')
  }, [trackPageView])

  return (
    <ReactMarkdown className={style.reactMarkDown}>
      {homeContents}
    </ReactMarkdown>
  )
}
