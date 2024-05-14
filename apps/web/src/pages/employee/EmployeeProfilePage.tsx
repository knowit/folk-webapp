import * as React from 'react'
import { useParams } from 'react-router-dom'
import { EmployeeProfileContent } from './components/EmployeeProfileContent'
import { EmployeeNotFound } from './components/EmployeeNotFound'
import { useEffect } from 'react'
import { useMatomo } from '@jonkoops/matomo-tracker-react'

// We might have to create better validation if IDs should be more flexible
const validEmailRegex = /^[\w.-]+@knowit.no$/

export default function EmployeeProfile() {
  const { trackPageView } = useMatomo()
  const routeParameters = useParams()
  const employeeEmail = routeParameters.id ?? ''

  useEffect(() => {
    trackPageView({
      documentTitle: `Employee - ${employeeEmail}`,
    })
  })

  const isValidId = employeeEmail.match(validEmailRegex)

  if (!isValidId) {
    return <EmployeeNotFound employeeId={employeeEmail} />
  }

  return <EmployeeProfileContent employeeEmail={employeeEmail} />
}
