import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { styled } from '@mui/material/styles'

const LinkStyled = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
}))

const MyEmploymentCard = () => {
  return (
    <GridItem>
      <GridItemHeader title={'Min ansettelse'} />
      <GridItemContent>
        <div>
          <LinkStyled
            href={
              'https://knowit.sharepoint.com/teams/profilbilder/Pictures/Forms/Ansatt.aspx?id=%2Fteams%2Fprofilbilder%2FPictures%2FAnsatt%2FKnowit%20Objectnet&viewid=32518de6%2Dc021%2D43e9%2D9418%2D9807285ba4f0'
            }
            target="_blank"
          >
            Profilbilder
          </LinkStyled>
        </div>
        <div>
          <LinkStyled href={'https://cv.knowit.no/'} target="_blank">
            CVPartner
          </LinkStyled>
        </div>
        <div>
          <LinkStyled
            href={
              'https://knowit.sharepoint.com/sites/Org-320-internal/SitePages/How-to-articles.aspx'
            }
            target="_blank"
          >
            Hvordan skrive CV
          </LinkStyled>
        </div>
        <div>
          <LinkStyled href={'https://seatit.knowit.no/'} target="_blank">
            Seatit
          </LinkStyled>
        </div>
        <div>
          <LinkStyled href={'https://kompetanse.knowit.no/'} target="_blank">
            Kompetansekartlegging
          </LinkStyled>
        </div>
        <div>
          <LinkStyled
            href={'https://handbooks.simployer.com/nb-no/handbook/104949'}
            target="_blank"
          >
            Personalhåndbok
          </LinkStyled>
        </div>
        <div>
          <LinkStyled href={'https://my.simployer.com/'} target="_blank">
            Simployer
          </LinkStyled>
        </div>
        <div>
          <LinkStyled href={'https://www.gjensidige.no/'} target="_blank">
            Forsikring
          </LinkStyled>
        </div>
        <div>
          <LinkStyled href={'https://eyr.md/no/'} target="_blank">
            Eyr
          </LinkStyled>
        </div>
        <div>
          <LinkStyled
            href={'https://booking.minfirmahytte.no/vacation-rentals'}
            target="_blank"
          >
            Firmahytter
          </LinkStyled>
        </div>
        <div>
          <LinkStyled
            href={
              'https://knowit.sharepoint.com/sites/Org-320-internal/SitePages/Telenor-mobilabonnement-for-familie.aspx'
            }
            target="_blank"
          >
            Telefon-abonnement for familie
          </LinkStyled>
        </div>
      </GridItemContent>
    </GridItem>
  )
}

export default MyEmploymentCard
