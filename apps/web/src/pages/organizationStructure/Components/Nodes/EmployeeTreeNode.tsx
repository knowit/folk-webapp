import { Node } from '../../type'
import { useTheme } from '@mui/material'
import {
  checkRotateDegree,
  fill,
  haloWidth,
  nodeSizeNormal,
  nodeStroke,
} from '../../util'

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
  const theme = useTheme()
  const halo = theme.palette.background.paper

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
          <text
            transform={`rotate(${rotate ? 0 : 180})`}
            dy={node.depth === 0 ? '10px' : '0.32em'}
            x={rotate ? nodeSizeNormal(node) + 3 : -nodeSizeNormal(node) - 3}
            textAnchor={rotate ? 'start' : 'end'}
            paintOrder="stroke"
            stroke={halo}
            fill={theme.palette.text.primary}
            strokeWidth={haloWidth}
            opacity={
              searchTerm.length < 0
                ? 1
                : node.data.employee.name.toLowerCase().includes(searchTerm)
                ? 1
                : 0.3
            }
          >
            {node.data.employee.name}
          </text>
        </g>
      )}
    </>
  )
}

export default EmployeeTreeNode
