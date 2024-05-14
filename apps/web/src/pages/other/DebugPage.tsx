import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { useEffect } from 'react'

const Debug = () => {
  const { trackPageView } = useMatomo()

  useEffect(() => {
    trackPageView({
      documentTitle: 'Debug',
    })
  })

  return <div>buggin</div>
}

export default Debug
