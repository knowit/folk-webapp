import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
    AppBar,
    Toolbar
} from '@material-ui/core'
import { NavMenu, NavMenuItem } from './NavMenu'
import { ReactComponent as KnowitLogo } from'../assets/logo.svg'
import { ReactComponent as FallbackUserIcon } from'../assets/fallback_user.svg'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            top: 0,
            left: 'auto',
            right: 0,
            position: 'sticky',
            zIndex: 1100,
            backgroundColor: 'white',
            paddingTop: '30px',

        },
        appbar: {
            height: '79px',
            boxShadow: 'none',
            borderBottomStyle: 'solid',
            borderBottomColor: '#FAC0B1',
            backgroundColor: '#333333',
        },
        toolbar: {
            height: '100%',
            paddingLeft: '30px',
            paddingRight: '30px'
        },
        logo: {
            height: '27px',
        },
        loginIcon: {
            height: '40px',
        }
    })
)

export default function Header() {
    const classes = useStyles()
    

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} position={"relative"}>
                <Toolbar className={classes.toolbar}>
                    <KnowitLogo className={classes.logo} />

                    <NavMenu>
                        <NavMenuItem label="Ansatte" to="/ansatte" />
                        <NavMenuItem label="Kunder" to="/kunder" />
                        <NavMenuItem label="Kompetanse" to="/kompetanse" />
                        <NavMenuItem label="Arbeidsmiljø" to="/arbeidsmiljo" />
                        <NavMenuItem label="Rekruttering" to="/rekruttering" />
                    </NavMenu>

                    <FallbackUserIcon className={classes.loginIcon} />
                </Toolbar>
            </AppBar>
        </div>
    )
}
