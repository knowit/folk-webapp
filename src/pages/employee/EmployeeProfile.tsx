import * as React from 'react'
import { useParams } from 'react-router-dom'
import { EmployeeProfileContent } from './components/EmployeeProfileContent'
import { EmployeeNotFound } from './components/EmployeeNotFound'

// We might have to create better validation if IDs should be more flexible
const validEmailRegex = /^[\w.-]+@knowit.no$/

export default function EmployeeProfile() {
  const routeParameters = useParams()
  const employeeEmail = routeParameters.id ?? ''

  const isValidId = employeeEmail.match(validEmailRegex)

  if (!isValidId) {
    return <EmployeeNotFound employeeId={employeeEmail} />
  }

  return <EmployeeProfileContent employeeEmail={employeeEmail} />
}
