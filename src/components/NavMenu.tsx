import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
    ButtonBase
} from '@material-ui/core'
import { Link as RouterLink, useLocation } from 'react-router-dom'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '100%',
            overflow: 'hidden',
        },
        menuItem: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            height: 'inherit',
            borderBottomColor: '#FAC0B1',
            borderBottomWidth: '1px',
            fontSize: '21px',
            fontFamily: 'Arial'
        },
        menuItemSelected: selected => ({
            fontWeight: selected ? 'bold' : 'normal',
            borderBottomStyle: selected ? 'solid' : 'none',
            color: selected ? '#FAC0B1' : '#F1F0ED'
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
            disableRipple={true}
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
