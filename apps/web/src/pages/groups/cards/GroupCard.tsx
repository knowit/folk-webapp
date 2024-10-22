import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import GroupMember from '../GroupMember'

const GroupCard = ({ members, title }) => {
  return (
    <GridItem>
      <GridItemHeader title={title} />
      <GridItemContent>
        {members.map(function (member) {
          return <GroupMember {...member} />
        })}
      </GridItemContent>
    </GridItem>
  )
}

export default GroupCard
