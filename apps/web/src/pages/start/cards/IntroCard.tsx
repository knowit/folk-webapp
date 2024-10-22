import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import { GridItem } from '../../../components/gridItem/GridItem'

const IntroCard = () => {
  return (
    <GridItem fullSize={true}>
      <GridItemHeader title={'Velkommen'} />
      <GridItemContent>
        Her finner du raskt og enkelt oversikt over de mest brukte lenkene vi
        bruker i det daglige. Savner du noe, så ikke nøl med å si ifra.
      </GridItemContent>
    </GridItem>
  )
}

export default IntroCard
