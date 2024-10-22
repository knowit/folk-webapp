import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { styled } from '@mui/material/styles'

const LinkStyled = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
}))

const OtherCard = () => {
  return (
    <GridItem>
      <GridItemHeader title={'Annet'} />
      <GridItemContent>
        <div>
          <LinkStyled
            href={
              'https://knowit.sharepoint.com/sites/Org-320-internal/SitePages/Bedriftskontoer-(bedriftskonti)-og-mat.aspx'
            }
            target="_blank"
          >
            Bedriftskonti
          </LinkStyled>
        </div>
        <div>
          <LinkStyled
            href={'https://knowit.sharepoint.com/sites/Org-320-internal'}
            target="_blank"
          >
            Objectnet på Sharepoint
          </LinkStyled>
        </div>
        <div>
          <LinkStyled
            href={'https://knowit.sharepoint.com/sites/Local-320-fagrommet'}
            target="_blank"
          >
            Fagrommet på Sharepoint
          </LinkStyled>
        </div>
        <div>
          <LinkStyled
            href={
              'https://knowit.sharepoint.com/:u:/r/sites/Local-320-aktiviteter/SitePages/Bedriftsidrettslag.aspx?csf=1&=&web=1&e=18ZzpQ'
            }
            target="_blank"
          >
            Bedriftidrettslag
          </LinkStyled>
        </div>
        <div>
          <LinkStyled href={'https://hvaskjer.knowit.no/'} target="_blank">
            Hva Skjer
          </LinkStyled>
        </div>
        <div>
          <LinkStyled
            href={'https://github.com/Knowit-Objectnet'}
            target="_blank"
          >
            Objectnet github
          </LinkStyled>
        </div>
        <div>
          <LinkStyled href={'https://github.com/knowit'} target="_blank">
            Knowit github
          </LinkStyled>
        </div>
      </GridItemContent>
    </GridItem>
  )
}

export default OtherCard
