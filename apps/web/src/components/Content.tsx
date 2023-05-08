import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { isLoggedIn } from '../api/auth/authHelpers'
import { useUserInfo } from '../context/UserInfoContext'
import {
  CompetencePage,
  CustomerPage,
  CustomerSitePage,
  EmployeePage,
  EmployeeProfilePage,
  NotFoundPage,
  UnderConstructionPage,
  DebugPage,
  OrganizationStructurePage,
} from '../pages'
import LoginPage from '../pages/login/LoginPage'
import { useMatomo } from '@jonkoops/matomo-tracker-react'
import { useLocation } from 'react-router-dom'

export default function Content() {
  const { user } = useUserInfo()
  const { trackPageView } = useMatomo()
  const location = useLocation()

  useEffect(() => {
    trackPageView()
  }, [trackPageView, location.pathname])

  if (!isLoggedIn(user)) {
    return <LoginPage />
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/ansatte" />} />
      <Route path="/ansatte" element={<EmployeePage />} />
      <Route path="/ansatt/:id" element={<EmployeeProfilePage />} />
      <Route path="/kunder" element={<CustomerPage />} />
      <Route path="/kunder/:id" element={<CustomerSitePage />} />
      <Route path="/kompetanse" element={<CompetencePage />} />
      <Route path="/organisasjon" element={<OrganizationStructurePage />} />
      <Route path="/arbeidsmiljo" element={<UnderConstructionPage />} />
      <Route path="/rekruttering" element={<UnderConstructionPage />} />
      <Route path="/debug" element={<DebugPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
