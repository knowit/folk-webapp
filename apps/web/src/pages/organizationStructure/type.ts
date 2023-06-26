import { EmployeeNode } from 'server/routers/employees/employeesTypes'
import { HierarchyNode, HierarchyLink } from 'd3-hierarchy'

export type Node = HierarchyNode<EmployeeNode> & {
  x: number
  y: number
}

export type Link = HierarchyLink<EmployeeNode> & {
  degree?: number
  inverted: boolean
  path: string
  innerLink: boolean
  source: Node & {
    cartX: number
    cartY: number
  }
  target: Node & {
    cartX: number
    cartY: number
  }
}
