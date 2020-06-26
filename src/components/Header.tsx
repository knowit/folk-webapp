import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
    AppBar,
    Toolbar
} from '@material-ui/core'
import { NavMenu, NavMenuItem } from './NavMenu'
import knowitLogo from'../logo.png'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logo: {
            height: '32px'
        }
    })
)

export default function Header() {
    const classes = useStyles()
    

    return (
        <AppBar position="sticky">
            <Toolbar >
                <img className={classes.logo} src={knowitLogo} alt="logo"/>

                <NavMenu>
                    <NavMenuItem label="Ansatte" to="/ansatte" />
                    <NavMenuItem label="Kunder" to="/kunder" />
                    <NavMenuItem label="Kompetanse" to="/kompetanse" />
                    <NavMenuItem label="Arbeidsmiljø" to="/arbeidsmiljo" />
                    <NavMenuItem label="Rekruttering" to="/rekruttering" />
                </NavMenu>

            </Toolbar>
        </AppBar>
    )
}
