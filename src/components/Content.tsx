import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { isLoggedIn } from '../api/auth/authHelpers'
import { useUserInfo } from '../context/UserInfoContext'
import {
  Competence,
  Customer,
  Employee,
  EmployeeSite,
  NotFound,
  UnderConstruction,
} from '../pages'
import LoginPage from '../pages/login/LoginPage'

export default function Content() {
  const { user } = useUserInfo()

  if (!isLoggedIn(user)) {
    return <LoginPage />
  }

  return (
    <Switch>
      <Route path="/ansatte">
        <Employee />
      </Route>
      <Route path="/kunder">
        <Customer />
      </Route>
      <Route path="/kompetanse">
        <Competence />
      </Route>
      <Route path="/arbeidsmiljo">
        <UnderConstruction />
      </Route>
      <Route path="/rekruttering">
        <UnderConstruction />
      </Route>
      <Route path="/ansatt/:id">
        <EmployeeSite />
      </Route>
      <Route exact path="/">
        <Redirect to="/ansatte" />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}
