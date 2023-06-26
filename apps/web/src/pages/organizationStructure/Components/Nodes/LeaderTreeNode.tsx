import { Node } from '../../type'
import { useTheme } from '@mui/material'
import {
  checkRotateDegree,
  fill,
  haloWidth,
  nodeSize,
  nodeSize2,
  nodeStroke,
} from '../../util'

interface Props {
  node: Node
  clickedParents: string[]
  showChildren: (node: Node) => void
  degree: number
  rotateValue: number
}

const LeaderTreeNode = ({
  node,
  showChildren,
  clickedParents,
  degree,
  rotateValue,
}: Props) => {
  const theme = useTheme()
  const halo = theme.palette.background.paper

  const showHiddenChildsCount = clickedParents.some(
    (employee) => employee === node.data.employee.email
  )

  return (
    <>
      <g
        key={node.data.employee.email}
        transform={`rotate(${(node.x * 180) / Math.PI}) translate(${node.y})`}
        onClick={() => showChildren(node)}
        style={{ cursor: 'pointer', paddingRight: '100px' }}
      >
        <circle
          fill={fill(node)}
          stroke={nodeStroke(node)}
          strokeWidth={showHiddenChildsCount ? 1 : 2}
          r={!showHiddenChildsCount ? nodeSize2(node) : nodeSize(node)}
          cx={!showHiddenChildsCount ? (node.depth > 1 ? '5' : '3') : '0'}
        />
        {node.depth === 0 && (
          <text
            transform={`rotate(${
              checkRotateDegree(degree, rotateValue) ? 0 : 180
            })`}
            dy={checkRotateDegree(degree, rotateValue) ? '10' : '-5'}
            x={checkRotateDegree(degree, rotateValue) ? 22 : -22}
            textAnchor={
              checkRotateDegree(degree, rotateValue) ? 'start' : 'end'
            }
            paintOrder="stroke"
            stroke={halo}
            fill={theme.palette.text.primary}
            strokeWidth={haloWidth}
          >
            {node.data.employee.name}
          </text>
        )}
      </g>
    </>
  )
}

export default LeaderTreeNode
