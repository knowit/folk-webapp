import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { NotFound, UnderConstruction, Employee, Competence } from '../pages';

export default function Content() {
  return (
    <Switch>
      <Route path="/ansatte">
        <Employee />
      </Route>
      <Route path="/kunder">
        <UnderConstruction />
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

      <Route exact path="/">
        <Redirect to="/ansatte" />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
