import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { isLoggedIn } from '../api/auth/authHelpers'
import { useUserInfo } from '../context/UserInfoContext'
import {
  CompetencePage,
  CustomerPage,
  EmployeePage,
  EmployeeProfilePage,
  NotFoundPage,
  UnderConstructionPage,
  DebugPage,
} from '../pages'
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
      <Route path="/ansatt/:id" element={<EmployeeProfilePage />} />
      <Route path="/kunder" element={<CustomerPage />} />
      <Route path="/kompetanse" element={<CompetencePage />} />
      <Route path="/arbeidsmiljo" element={<UnderConstructionPage />} />
      <Route path="/rekruttering" element={<UnderConstructionPage />} />
      <Route path="/debug" element={<DebugPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}