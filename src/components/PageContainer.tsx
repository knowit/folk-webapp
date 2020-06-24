import React from 'react';
import { Route, Switch, Redirect } from "react-router";

export default function PageContainer() {
    return (
        <Switch>
            <Route path="/ansatte">
                <p>Ansatt side</p>
            </Route>
            <Route path="/kunder">
                <p>Kunde side</p>
            </Route>
            <Route path="/kompetanse">
                <p>kompetanse side</p>
            </Route>
            <Route path="/arbeidsmiljo">
                <p>arbeidsmiljø side</p>
            </Route>
            <Route path="/rekruttering">
                <p>rekrutterings side</p>
            </Route>
            <Route>
                <Redirect to="/ansatte"/>
            </Route>
        </Switch>
    )
}