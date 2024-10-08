import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import GroupMember from '../GroupMember'

const RecruitmentCard = () => {
  return (
    <GridItem>
      <GridItemHeader title="Principal Engineers" />
      <GridItemContent>
        <GroupMember employeeId={'alexander.royne-helgesen@knowit.no'} />
        <GroupMember employeeId={'christian.karlsson@knowit.no'} />
        <GroupMember employeeId={'gunnar.larsen@knowit.no'} />
        <GroupMember employeeId={'kenneth.stigen@knowit.no'} />
        <GroupMember employeeId={'llu@knowit.no'} />
        <GroupMember employeeId={'pal.de.vibe@knowit.no'} />
        <GroupMember employeeId={'hd@knowit.no'} />
      </GridItemContent>
    </GridItem>
  )
}

export default RecruitmentCard
