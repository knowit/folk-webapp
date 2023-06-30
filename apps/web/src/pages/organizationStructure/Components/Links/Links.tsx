import React from 'react'
import { Link } from '../../type'
import { toCartesian, hierarchyLevel, sizeNormal } from '../../util'
import { linkRadial } from 'd3-shape'
import LinkElement from './LinkElement'
import { checkRotateDegree } from '../Nodes/util'

interface Props {
  links: Link[]
  clickedParents: any
  rotateValue: number
  searchTerm: string
}

const Links = ({ links, clickedParents, rotateValue, searchTerm }: Props) => {
  const LinksCount = 360 / links.length

  links.forEach((d: Link, i: number) => {
    const childsFromDepartmentManager =
      d.target.depth === 2 &&
      d.target.height === 0 &&
      d.source.depth === 1 &&
      d.source.height === 3 &&
      clickedParents.some(
        (employee) => employee === d.source.data.employee.email
      )
    if (
      d.target.height !== 0 ||
      d.target.depth === 0 ||
      childsFromDepartmentManager ||
      (childsFromDepartmentManager &&
        d.target.height === 0 &&
        d.source.children.filter((child) => child.height != 0).length > 3)
    ) {
      d.degree = i * LinksCount
      d.innerLink = true
      const [x1, y1] = toCartesian(d.source.x, d.source.y)
      const [x2, y2] = toCartesian(d.target.x, d.target.y)

      const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
      const u = [(x2 - x1) / distance, (y2 - y1) / distance]

      const offsetTarget = sizeNormal[hierarchyLevel(d.target)]
      const offsetSource = sizeNormal[hierarchyLevel(d.source)]

      const x4 = x1 + (distance - offsetTarget) * u[0]
      const y4 = y1 + (distance - offsetTarget) * u[1]

      const x3 = x1 + offsetSource * u[0]
      const y3 = y1 + offsetSource * u[1]

      d.target.cartX = x3
      d.target.cartY = y3
      d.source.cartX = x4
      d.source.cartY = y4

      if (checkRotateDegree(d.degree, rotateValue, true)) {
        d.inverted = true
        d.path = `M ${x3},${y3} L ${x4},${y4}`
      } else {
        d.inverted = false
        d.path = `M ${x4},${y4} L ${x3},${y3}`
      }
    } else {
      d.innerLink = false
      if (
        clickedParents.some(
          (employee) => employee === d.source.data.employee.email
        )
      ) {
        d.path = linkRadial()
          .angle((d: any) => d.x + Math.PI / 2)
          .radius((d: any) => d.y)(d as any)
      }
    }
  })

  return (
    <g>
      {links.map((link, i) => (
        <LinkElement link={link} key={i} searchTerm={searchTerm} />
      ))}
    </g>
  )
}

export default Links
