import { Node } from '../../type'
import { useTheme } from '@mui/material'
import { fill, haloWidth, nodeSize, nodeStroke } from '../../util'

interface Props {
  node: Node
  showChildren: (node: Node) => void
}

const LeaderTreeNode = ({ node, showChildren }: Props) => {
  const theme = useTheme()
  const halo = theme.palette.background.paper

  return (
    <>
      <g
        key={node.data.employee.email}
        transform={`rotate(${(node.x * 180) / Math.PI}) translate(${node.y})`}
      >
        <circle
          fill={fill(node)}
          stroke={nodeStroke(node)}
          strokeWidth={1}
          r={nodeSize(node)}
          onClick={() => showChildren(node)}
          style={{ cursor: 'pointer' }}
        />

        <text
          transform={`rotate(0)`}
          dy={node.depth === 0 ? '10px' : '0.32em'}
          x={nodeSize(node) + 3}
          textAnchor="start"
          paintOrder="stroke"
          stroke={halo}
          fill={theme.palette.text.primary}
          strokeWidth={haloWidth}
        >
          {node.depth === 0 && node.data.employee.name}
        </text>
      </g>
    </>
  )
}

export default LeaderTreeNode
