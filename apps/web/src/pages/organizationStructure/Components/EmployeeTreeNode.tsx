import { Node } from '../type'
import { useTheme } from '@mui/material'
import {
  checkRotateDegree,
  fill,
  haloWidth,
  nodeSize,
  nodeStroke,
} from '../util'

interface Props {
  node: Node
  rotateValue: number
  degree?: number
}

const EmployeeTreeNode = ({ node, rotateValue, degree }: Props) => {
  const theme = useTheme()
  const halo = theme.palette.background.paper

  const rotate =
    !node.children && node.depth !== 0
      ? checkRotateDegree(degree, rotateValue)
      : true

  return (
    <g
      key={node.data.employee.email}
      transform={`rotate(${(node.x * 180) / Math.PI}) translate(${node.y})`}
    >
      <circle
        fill={fill(node)}
        stroke={nodeStroke(node)}
        strokeWidth={1}
        r={nodeSize(node)}
      />
      <text
        transform={`rotate(${rotate ? 0 : 180})`}
        dy={node.depth === 0 ? '10px' : '0.32em'}
        x={rotate ? nodeSize(node) + 3 : -nodeSize(node) - 3}
        textAnchor={rotate ? 'start' : 'end'}
        paintOrder="stroke"
        stroke={halo}
        fill={theme.palette.text.primary}
        strokeWidth={haloWidth}
      >
        {node.children && node.depth !== 0 ? '' : node.data.employee.name}
      </text>
    </g>
  )
}

export default EmployeeTreeNode
