import { createStyles, makeStyles, DefaultTheme } from '@mui/styles'
import React from 'react'
import { usePrivacyPolicy } from '../api/other/otherQueries'

const useStyles = makeStyles((theme: DefaultTheme) =>
  createStyles({
    footer: {
      width: '100%',
      paddingTop: '40px',
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
  const { data: policyUrl } = usePrivacyPolicy()

  return (
    <footer className={classes.footer}>
      <p>
        Knowit Folk. Universitetsgata 1, 0164 Oslo &ensp;|&ensp; Tlf. 02486
        &ensp;| &ensp;
        <a className={classes.link} href={improvementsHref}>
          Kontakt og tilbakemeldinger
        </a>
        &ensp; | &ensp;
        <a className={classes.link} href={correctionHref}>
          Meld om datafeil
        </a>
        {policyUrl ? (
          <>
            &ensp; | &ensp;
            <a className={classes.link} href={policyUrl.urlname} download>
              Personvernserklæring
            </a>
          </>
        ) : null}
      </p>
    </footer>
  )
}
