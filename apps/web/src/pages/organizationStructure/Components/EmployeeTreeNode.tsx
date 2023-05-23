import React from 'react'
import { Node } from '../type'
import { useTheme } from '@mui/material'
import { fill, haloWidth, nodeSize, nodeStroke, rightSide } from '../util'
import { styled } from '@mui/material/styles'

interface Props {
  node: Node
}

const EmployeeTreeNode = ({ node }: Props) => {
  const theme = useTheme()
  const halo = theme.palette.background.paper

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
        transform={`rotate(${rightSide(node.x) ? 0 : 180})`}
        dy={node.depth === 0 ? '10px' : '0.32em'}
        x={rightSide(node.x) ? nodeSize(node) + 3 : -nodeSize(node) - 3}
        textAnchor={rightSide(node.x) ? 'start' : 'end'}
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
