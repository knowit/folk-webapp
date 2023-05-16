import React from 'react'
import { EmployeeNode } from 'server/routers/employees/employeesTypes'
import { Node } from '../type'
import { fill, haloWidth, nodeSize, nodeStroke, rightSide } from '../util'
import { Theme } from '@mui/material'

interface Props {
  data?: EmployeeNode
  node: Node
  clickedParent: Node
  halo: string
  theme: Theme
  showChilden: any
}

const OrganizationStructureTreeLeaders = ({
  data,
  node,
  clickedParent,
  halo,
  theme,
  showChilden,
}: Props) => {
  const checkParent = () => {
    if (
      clickedParent &&
      node.data.employee.manager_email === clickedParent.data.employee.email &&
      !node.data.children
    ) {
      return true
    } else return false
  }

  return (
    <>
      {node.data.children || checkParent() ? (
        <circle
          onClick={() => showChilden(node)}
          fill={fill(node)}
          stroke={nodeStroke(node)}
          strokeWidth={1}
          r={nodeSize(node)}
        />
      ) : (
        <></>
      )}
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
        {checkParent() && node.data.employee.name}
        {node.depth === 0 && node.data.employee.name}
      </text>
    </>
  )
}

export default OrganizationStructureTreeLeaders
