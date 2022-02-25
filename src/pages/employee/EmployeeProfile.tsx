import * as React from 'react'
import { useParams } from 'react-router-dom'
import { EmployeeProfileContent } from './components/EmployeeProfileContent'

// TODO: We might have to create better validation if IDs should be more flexible
const validEmailRegex = /^[\w.-]+@knowit.no$/

export default function EmployeeProfile() {
  const routeParameters = useParams()
  const employeeEmail = routeParameters.id ?? ''

  const isValidId = employeeEmail.match(validEmailRegex)

  if (!isValidId) {
    // TODO: improve error message
    return <p>Not a valid Knowit email</p>
  }

  return <EmployeeProfileContent employeeEmail={employeeEmail} />
}
