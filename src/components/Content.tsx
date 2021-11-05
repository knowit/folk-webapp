import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  NotFound,
  UnderConstruction,
  Employee,
  Competence,
  EmployeeSite,
  Customer
} from '../pages';

export default function Content() {
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
  );
}
