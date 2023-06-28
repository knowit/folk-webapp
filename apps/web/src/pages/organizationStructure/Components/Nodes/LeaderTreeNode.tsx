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
import { styled } from '@mui/material'

interface Props {
  node: Node
  clickedParents: string[]
  showChildren: (node: Node) => void
  degree: number
  rotateValue: number
}

const StyledNode = styled('circle', {
  shouldForwardProp: (prop) => prop !== 'node' && prop !== 'showCount',
})<{ node?: Node; showCount: boolean }>(({ node, showCount }) => ({
  fill: fill(node),
  stroke: nodeStroke(node),
  strokeWidth: showCount ? 1 : 1.5,
  r: showCount ? nodeSizeNormal(node) : nodeSizeBig(node),
  cx: !showCount ? (node.depth > 1 ? '5' : '3') : '0',
  cursor: 'pointer',
  '&:hover': {
    fill: nodeStroke(node),
  },
}))

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
      key={node.data.employee.email}
      transform={`rotate(${(node.x * 180) / Math.PI}) translate(${node.y})`}
      onClick={() => showChildren(node)}
    >
      <StyledNode node={node} showCount={showHiddenChildsCount} />
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
