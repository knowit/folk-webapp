import { Navigate, Route, Routes } from 'react-router-dom'
import {
  CompetencePage,
  CustomerPage,
  CustomerSitePage,
  DebugPage,
  EmployeePage,
  EmployeeProfilePage,
  NotFoundPage,
  OrganizationStructurePage,
  StartPage,
  UnderConstructionPage,
} from '../pages'
import { useUserInfo } from '../hooks/useUserInfo'

export default function Content() {
  const { isAuthenticated } = useUserInfo()

  return (
    <>
      {isAuthenticated && (
        <Routes>
          <Route path="/" element={<Navigate replace to="/start" />} />
          <Route path="/start" element={<StartPage />} />
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
      )}
    </>
  )
}
