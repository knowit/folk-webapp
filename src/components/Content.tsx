import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { isLoggedIn } from '../api/auth/authHelpers'
import { useUserInfo } from '../context/UserInfoContext'
import {
  Competence,
  Customer,
  EmployeePage,
  EmployeeProfile,
  NotFound,
  UnderConstruction,
} from '../pages'
import Debug from '../pages/DebugPage'
import LoginPage from '../pages/login/LoginPage'

export default function Content() {
  const { user } = useUserInfo()

  if (!isLoggedIn(user)) {
    return <LoginPage />
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/ansatte" />} />
      <Route path="/ansatte" element={<EmployeePage />} />
      <Route path="/ansatt/:id" element={<EmployeeProfile />} />
      <Route path="/kunder" element={<Customer />} />
      <Route path="/kompetanse" element={<Competence />} />
      <Route path="/arbeidsmiljo" element={<UnderConstruction />} />
      <Route path="/rekruttering" element={<UnderConstruction />} />
      <Route path="/debug" element={<Debug />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
