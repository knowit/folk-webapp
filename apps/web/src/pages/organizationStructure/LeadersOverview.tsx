import LeaderTreeNode from './Components/Nodes/LeaderTreeNode'
import { Node } from './type'
import { useEffect } from 'react'
import { spliceArray } from './util'

interface Props {
  descendants: Node[]
  clickedParents: string[]
  setClickedParents: any
  rotateValue: number
  searchTerm: string
  hideChildNodes: boolean
}
const LeadersOverview = ({
  descendants,
  clickedParents,
  setClickedParents,
  rotateValue,
  searchTerm,
  hideChildNodes,
}: Props) => {
  const antallParents = 360 / descendants.length
  const descendantsWithChildrenSorted = spliceArray(descendants)

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
    if (hideChildNodes) {
      setClickedParents([])
    } else {
      descendantsWithChildrenSorted.map((node) => {
        setClickedParents((employees) => [
          ...employees,
          node.data.employee.email,
        ])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideChildNodes])

  return (
    <>
      {descendantsWithChildrenSorted.map((node, i) => {
        return (
          <LeaderTreeNode
            key={i}
            node={node}
            showChildren={showChilden}
            clickedParents={clickedParents}
            degree={(i + 1) * antallParents}
            rotateValue={rotateValue}
            searchTerm={searchTerm}
          />
        )
      })}
    </>
  )
}
export default LeadersOverview
