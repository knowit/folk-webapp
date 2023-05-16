import React from 'react'
import { styled } from '@mui/material/styles'
import { usePrivacyPolicy } from '../api/other/otherQueries'

const FooterStyled = styled('footer')(({ theme }) => ({
  width: '100%',
  paddingTop: 40,
  textAlign: 'center',
  fontSize: 12,
  color: theme.palette.text.primary,
}))
const LinkStyled = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
}))

export default function Footer() {
  const domain = '.no'
  const improvementsEmail =
    'dataplattform' + String.fromCharCode(64) + `knowit${domain}`
  const datacorrectionEmail =
    'drift' + String.fromCharCode(64) + `knowit${domain}`

  const improvementsHref = `mailto:${improvementsEmail}`
  const correctionHref = `mailto:${datacorrectionEmail}?subject=Melding%20om%20datafeil&body=Feilen%20ble%20funnet%20her%3A%20%0D%0AOg%20omhandler%20dette%3A%20`
  const { data: policyUrl } = usePrivacyPolicy()

  return (
    <FooterStyled>
      <p>
        Knowit Folk. Universitetsgata 1, 0164 Oslo &ensp;|&ensp; Tlf. 02486
        &ensp;| &ensp;
        <LinkStyled href={improvementsHref}>
          Kontakt og tilbakemeldinger
        </LinkStyled>
        &ensp; | &ensp;
        <LinkStyled href={correctionHref}>Meld om datafeil</LinkStyled>
        {policyUrl ? (
          <>
            &ensp; | &ensp;
            <LinkStyled href={policyUrl.urlname} download>
              Personvernserklæring
            </LinkStyled>
          </>
        ) : null}
      </p>
    </FooterStyled>
  )
}
