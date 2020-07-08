import React from 'react'
import { Route, Switch, Redirect } from "react-router"
import {
    NotFound,
    UnderConstruction,
    Employee
} from '../pages'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: '78px',
            paddingLeft: '30px',
            paddingRight: '30px',
            backgroundColor: '#EDEDE9',
            minHeight: 'calc(100vh - 103px)'
        },
    })
)

export default function PageContainer() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
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
        </div>
    )
}