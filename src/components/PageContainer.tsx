import React from 'react'
import { Route, Switch, Redirect } from "react-router"
import { Paper } from '@material-ui/core'
import {
    NotFound,
    UnderConstruction,
    Employee
} from '../pages'

export default function PageContainer() {
    return (
        <Paper>
            <Switch>
                <Route path="/ansatte">
                    <Employee />
                </Route>
                <Route path="/kunder">
                    <UnderConstruction />
                </Route>
                <Route path="/kompetanse">
                    <UnderConstruction />
                </Route>
                <Route path="/arbeidsmiljo">
                    <UnderConstruction />
                </Route>
                <Route path="/rekruttering">
                    <UnderConstruction />
                </Route>

                <Route exact path="/">
                    <Redirect to="/ansatte"/>
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Paper>
    )
}