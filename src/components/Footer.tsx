import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
        footer: {
            marginTop: '40px',
            marginBottom: '30px',
            paddingBottom: '70px',
            textAlign: 'center',
            fontSize: '12px',
        }
    })
)


export default function Footer() {
    const classes = useStyles()
    

    return (
        <div className={classes.root}>
           <footer className={classes.footer}>
               <p>Her kommer en avsendertekst med enkelt kontaktpunkt via e-post link og annet som eventuelt identifiserer tjenesten.</p>
           </footer>
        </div>
    )
}