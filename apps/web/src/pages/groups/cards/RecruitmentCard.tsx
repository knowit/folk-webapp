import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import GroupMember from '../GroupMember'

const RecruitmentCard = () => {
  return (
    <GridItem>
      <GridItemHeader title="Rekruttering" />
      <GridItemContent>
        <GroupMember employeeId={'lin@knowit.no'} />
        <GroupMember employeeId={'tommi.venning@knowit.no'} />
        <GroupMember employeeId={'daniel.horn@knowit.no'} />
      </GridItemContent>
    </GridItem>
  )
}

export default RecruitmentCard
