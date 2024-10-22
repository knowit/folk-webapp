import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { styled } from '@mui/material/styles'

const LinkStyled = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
}))

const AdministrasjonCard = () => {
  return (
    <GridItem>
      <GridItemHeader title={'Administrasjon'} />
      <GridItemContent>
        <div>
          <LinkStyled href={'https://timer.knowit.no/'} target="_blank">
            Timeføring
          </LinkStyled>
        </div>
        <div>
          <LinkStyled href={'https://knowit.unit4cloud.no/'} target="_blank">
            Utlegg
          </LinkStyled>
        </div>
        <div>
          <LinkStyled href={'http://kalender.knowit.no/'} target="_blank">
            Kalender
          </LinkStyled>
        </div>
        <div>
          <LinkStyled href={'https://knowit.1password.eu'} target="_blank">
            1password
          </LinkStyled>
        </div>
        <div>
          <LinkStyled href={'https://tullin.munu.shop/'} target="_blank">
            Kantine
          </LinkStyled>
        </div>
        <div>
          <LinkStyled href={'https://helpit.knowit.se/'} target="_blank">
            Helpit
          </LinkStyled>
        </div>
        <div>
          <LinkStyled
            href={
              'https://knowit.sharepoint.com/sites/groupcommon/itsupport/SitePages/Knowit--Printix.aspx?web=1&CT=1728381612322&OR=OWA-NT-Mail&CID=cb86ef7f-3f5c-8826-7c08-88a0c6d6b79f'
            }
            target="_blank"
          >
            Print
          </LinkStyled>
        </div>
        <div>
          <LinkStyled href={'https://knowit.se/brandbook/'}>
            Brandbook for Knowit
          </LinkStyled>
        </div>
      </GridItemContent>
    </GridItem>
  )
}

export default AdministrasjonCard
