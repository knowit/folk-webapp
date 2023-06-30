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
  searchTerm: string
}

const StyledNode = styled('circle', {
  shouldForwardProp: (prop) =>
    prop !== 'node' && prop !== 'showCount' && prop != 'hasChildren',
})<{ node?: Node; showCount: boolean; hasChildren: boolean }>(
  ({ node, showCount, hasChildren }) => ({
    fill: fill(node),
    stroke: nodeStroke(node),
    strokeWidth: showCount ? 1 : 1.5,
    r: showCount && hasChildren ? nodeSizeNormal(node) : nodeSizeBig(node),
    cx: !showCount && hasChildren ? (node.depth > 1 ? '5' : '3') : '0',
    cursor: hasChildren && 'pointer',
    '&:hover': {
      fill: hasChildren && nodeStroke(node),
    },
  })
)

const LeaderTreeNode = ({
  node,
  showChildren,
  clickedParents,
  degree,
  rotateValue,
  searchTerm,
}: Props) => {
  const theme = useTheme()
  const halo = theme.palette.background.paper

  const showHiddenChildsCount = clickedParents.some(
    (employee) => employee === node.data.employee.email
  )

  const childrenOuterLayerCount = () => {
    const newArray = node.children.filter((node) => !node.children)
    return newArray.length
  }
  return (
    <g
      key={node.data.employee.email}
      transform={`rotate(${(node.x * 180) / Math.PI}) translate(${node.y})`}
      onClick={() => {
        childrenOuterLayerCount() > 0 && showChildren(node)
      }}
    >
      <StyledNode
        node={node}
        showCount={showHiddenChildsCount}
        hasChildren={childrenOuterLayerCount() > 0}
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
      )}
      <ChildrenCount
        node={node}
        showHiddenChildsCount={showHiddenChildsCount}
        degree={degree}
        rotateValue={rotateValue}
        childrenOuterLayerCount={childrenOuterLayerCount()}
      />
    </g>
  )
}

export default LeaderTreeNode
