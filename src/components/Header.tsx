import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
    AppBar,
    Toolbar
} from '@material-ui/core'
import { NavMenu, NavMenuItem } from './NavMenu'
import knowitLogo from'../assets/logo.svg'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            top: 0,
            left: 'auto',
            right: 0,
            position: 'sticky',
            zIndex: 1100,
            backgroundColor: 'white',
            paddingTop: theme.spacing(3),

        },
        appbar: {
            height: '79px',
            boxShadow: 'none',
            borderBottomStyle: 'solid',
            borderBottomColor: '#FAC0B1',
            backgroundColor: '#333333',
        },
        toolbar: {
            height: '100%'
        },
        logo: {
            height: '29px'
        }
    })
)

export default function Header() {
    const classes = useStyles()
    

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position={"relative"}>
                <Toolbar className={classes.toolbar}>
                    <img className={classes.logo} src={knowitLogo} alt="logo"/>

                    <NavMenu>
                        <NavMenuItem label="Ansatte" to="/ansatte" />
                        <NavMenuItem label="Kunder" to="/kunder" />
                        <NavMenuItem label="Kompetanse" to="/kompetanse" />
                        <NavMenuItem label="Arbeidsmiljø" to="/arbeidsmiljo" />
                        <NavMenuItem label="Rekruttering" to="/rekruttering" />
                    </NavMenu>

                    <AccountCircleIcon fontSize={'large'}/>
                </Toolbar>
            </AppBar>
        </div>
    )
}
