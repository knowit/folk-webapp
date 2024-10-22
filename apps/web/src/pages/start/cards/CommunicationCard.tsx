import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { styled } from '@mui/material/styles'

const LinkStyled = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
}))

const CommunicationCard = () => {
  return (
    <GridItem>
      <GridItemHeader title={'Kommunikasjon'} />
      <GridItemContent>
        <div>
          <LinkStyled href={'http://epost.knowit.no/'} target="_blank">
            Epost
          </LinkStyled>
        </div>
        <div>
          <LinkStyled href={'https://knowit.slack.com'} target="_blank">
            Knowit Slack
          </LinkStyled>
        </div>
        <div>
          <LinkStyled
            href={'https://knowitobjectnet.slack.com/'}
            target="_blank"
          >
            Objectnet Slack
          </LinkStyled>
        </div>
      </GridItemContent>
    </GridItem>
  )
}

export default CommunicationCard
