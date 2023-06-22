import { Node } from './type'
import { useEffect } from 'react'
import LeaderTreeNode from './Components/Nodes/LeaderTreeNode'

interface Props {
  descendants: Node[]
  clickedParents: string[]
  setClickedParents: any
  rotateValue: number
  hideEmployeesWithoutChildren: boolean
}
const LeadersOverview = ({
  descendants,
  clickedParents,
  setClickedParents,
  hideEmployeesWithoutChildren,
}: Props) => {
  //Hide and show children in the outer layer i the graph.
  const handleRemoveItem = (node) => {
    setClickedParents(
      clickedParents.filter((item) => item !== node.data.employee.email)
    )
  }

  const showChilden = (node: Node) => {
    if (
      clickedParents.some((employee) => employee === node.data.employee.email)
    ) {
      handleRemoveItem(node)
    } else {
      setClickedParents((employees) => [...employees, node.data.employee.email])
    }
  }

  useEffect(() => {
    if (hideEmployeesWithoutChildren) {
      setClickedParents([])
    } else {
      descendants.map((node) => {
        setClickedParents((employees) => [
          ...employees,
          node.data.employee.email,
        ])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideEmployeesWithoutChildren])

  return (
    <>
      {descendants.map((node, i) => {
        return <LeaderTreeNode key={i} node={node} showChildren={showChilden} />
      })}
    </>
  )
}
export default LeadersOverview
