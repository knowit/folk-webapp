import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
    ButtonBase
} from '@material-ui/core'
import { Link as RouterLink, useLocation } from 'react-router-dom'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            height: '64px',
            overflow: 'hidden'
        },
        menuItem: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            height: 'inherit',
        },
        menuItemSelected: selected => ({
            borderBottom: selected ? 'solid' : 'none'
        })
    })
)


export function NavMenuItem({ label, to } : { label: string, to: string }) {
    const location = useLocation()
    const classes = useStyles(location.pathname === to)

    return (
        <ButtonBase
            className={`${classes.menuItem} ${classes.menuItemSelected}`}
            to={to}
            component={RouterLink}
        >
            {label}
        </ButtonBase>
    )
}

export function NavMenu({ children } : { children: React.ReactNode }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            {children}
        </div>
    )
}
