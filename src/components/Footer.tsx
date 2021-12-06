import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useFetchedData } from '../hooks/service'

interface PrivacyPolicy {
  urlname: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    footer: {
      marginTop: '40px',
      marginBottom: '30px',
      paddingBottom: '70px',
      textAlign: 'center',
      fontSize: '12px',
      color: theme.palette.text.primary,
    },
    link: {
      color: theme.palette.text.primary,
    },
  })
)

export default function Footer() {
  const classes = useStyles()

  const domain = '.no'
  const improvementsEmail =
    'dataplattform' + String.fromCharCode(64) + `knowit${domain}`
  const datacorrectionEmail =
    'drift' + String.fromCharCode(64) + `knowit${domain}`

  const improvementsHref = `mailto:${improvementsEmail}`
  const correctionHref = `mailto:${datacorrectionEmail}?subject=Melding%20om%20datafeil&body=Feilen%20ble%20funnet%20her%3A%20%0D%0AOg%20omhandler%20dette%3A%20`
  const privacyPolicyHref = useFetchedData<PrivacyPolicy>({
    url: '/api/privacyPolicy',
  })[0]?.urlname

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <p>
          Knowit Folk. Lakkegata 53, 0178 Oslo &ensp;|&ensp; Tlf. 02486 &ensp;|
          &ensp;
          <a className={classes.link} href={improvementsHref}>
            Kontakt og tilbakemeldinger
          </a>
          &ensp; | &ensp;
          <a className={classes.link} href={correctionHref}>
            Meld om datafeil
          </a>
          {privacyPolicyHref && (
            <>
              &ensp; | &ensp;
              <a className={classes.link} href={privacyPolicyHref} download>
                Personvernserklæring
              </a>
            </>
          )}
        </p>
      </footer>
    </div>
  )
}
