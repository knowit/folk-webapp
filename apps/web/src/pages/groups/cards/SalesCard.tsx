import { GridItem } from '../../../components/gridItem/GridItem'
import { GridItemHeader } from '../../../components/gridItem/GridItemHeader'
import { GridItemContent } from '../../../components/gridItem/GridItemContent'
import GroupMember from '../GroupMember'

const RecruitmentCard = () => {
  return (
    <GridItem>
      <GridItemHeader title="Salg og rådgivning" />
      <GridItemContent>
        <GroupMember employeeId={'torbjorn.moen@knowit.no'} />
        <GroupMember employeeId={'hans.frisvold@knowit.no'} />
        <GroupMember employeeId={'kai.eidissen@knowit.no'} />
        <GroupMember employeeId={'jonas.gurrich@knowit.no'} />
      </GridItemContent>
    </GridItem>
  )
}

export default RecruitmentCard
