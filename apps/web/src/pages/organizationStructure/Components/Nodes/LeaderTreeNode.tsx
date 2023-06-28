import { Node } from '../../type'
import { useTheme } from '@mui/material'
import {
  checkRotateDegree,
  fill,
  haloWidth,
  nodeSizeNormal,
  nodeSizeBig,
  nodeStroke,
} from '../../util'
import ChildrenCount from './ChildrenCount'

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
    <g
      style={{ cursor: 'pointer', paddingRight: '100px' }}
      key={node.data.employee.email}
      transform={`rotate(${(node.x * 180) / Math.PI}) translate(${node.y})`}
      onClick={() => showChildren(node)}
    >
      <circle
        fill={fill(node)}
        stroke={nodeStroke(node)}
        strokeWidth={showHiddenChildsCount ? 1 : 2}
        r={!showHiddenChildsCount ? nodeSizeBig(node) : nodeSizeNormal(node)}
        cx={!showHiddenChildsCount ? (node.depth > 1 ? '5' : '3') : '0'}
      />
      {node.depth === 0 && (
        <text
          transform={`rotate(${
            checkRotateDegree(degree, rotateValue) ? 0 : 180
          })`}
          dy={checkRotateDegree(degree, rotateValue) ? '10' : '-5'}
          x={checkRotateDegree(degree, rotateValue) ? 22 : -22}
          textAnchor={checkRotateDegree(degree, rotateValue) ? 'start' : 'end'}
          paintOrder="stroke"
          stroke={halo}
          fill={theme.palette.text.primary}
          strokeWidth={haloWidth}
        >
          {node.data.employee.name}
        </text>
      )}
      <ChildrenCount
        node={node}
        showHiddenChildsCount={showHiddenChildsCount}
        degree={degree}
        rotateValue={rotateValue}
      />
    </g>
  )
}

export default LeaderTreeNode
