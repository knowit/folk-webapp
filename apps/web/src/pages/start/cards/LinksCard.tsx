import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { styled } from '@mui/material/styles'

const LinkStyled = styled('a')(({ theme }) => ({
  color: theme.palette.text.primary,
}))

const LinksCard = ({ title, links }) => {
  return (
    <GridItem>
      <GridItemHeader title={title} />
      <GridItemContent>
        {links.map(function (link, index) {
          return (
            <div>
              <LinkStyled key={index} href={link.href} target="_blank">
                {link.title}
              </LinkStyled>
            </div>
          )
        })}
      </GridItemContent>
    </GridItem>
  )
}

export default LinksCard
