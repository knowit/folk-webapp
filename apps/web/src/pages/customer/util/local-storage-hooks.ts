import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { useEffect, useState } from 'react'

export const useSelectedCustomerIds = () => {
  const { trackEvent } = useMatomo()
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([])

  useEffect(() => {
    const items = localStorage.getItem('selectedCustomerIds')
    setSelectedCustomerIds(JSON.parse(items) || [])
  }, [])

  useEffect(() => {
    trackEvent({ category: 'filter-kunde', action: 'click-event' })
    localStorage.setItem(
      'selectedCustomerIds',
      JSON.stringify(selectedCustomerIds)
    )
  }, [selectedCustomerIds, trackEvent])

  return { selectedCustomerIds, setSelectedCustomerIds }
}
