import { Node } from '../../type'
import { checkRotateDegree, fill, nodeSizeNormal, nodeStroke } from '../../util'
import NameText from '../NameText'

interface Props {
  node: Node
  rotateValue: number
  degree: number
  clickedParents: string[]
  searchTerm: string
}

const EmployeeTreeNode = ({
  node,
  rotateValue,
  degree,
  clickedParents,
  searchTerm,
}: Props) => {
  const rotate =
    !node.children && node.depth !== 0
      ? checkRotateDegree(degree, rotateValue)
      : true

  const checkIfParentIsClicked = clickedParents.some(
    (employee) => employee === node.data.employee.manager_email
  )

  return (
    <>
      {checkIfParentIsClicked && (
        <g
          key={node.data.employee.email}
          transform={`rotate(${(node.x * 180) / Math.PI}) translate(${node.y})`}
        >
          <circle
            fill={fill(node)}
            stroke={nodeStroke(node)}
            strokeWidth={1}
            r={nodeSizeNormal(node)}
          />
          <NameText
            employee={node.data.employee}
            searchTerm={searchTerm}
            transform={`rotate(${rotate ? 0 : 180})`}
            dy={node.depth === 0 ? '10px' : '0.32em'}
            x={rotate ? nodeSizeNormal(node) + 3 : -nodeSizeNormal(node) - 3}
            textAnchor={rotate ? 'start' : 'end'}
          >
            {node.data.employee.name}
          </NameText>
        </g>
      )}
    </>
  )
}

export default EmployeeTreeNode
