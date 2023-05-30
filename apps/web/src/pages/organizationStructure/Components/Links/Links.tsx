import React from 'react'
import { Link } from '../../type'
import { toCartesian, hierchyLevel, size } from '../../util'
import { linkRadial } from 'd3-shape'
import LinkElement from './LinkElement'

interface Props {
  links: Link[]
}

const Links = ({ links }: Props) => {
  links.forEach((d: Link) => {
    if (
      d.target.height !== 0 ||
      d.target.depth === 1 ||
      (d.target.height === 0 &&
        d.source.children.filter((child) => child.height != 0).length > 3)
    ) {
      d.innerLink = true
      const [x1, y1] = toCartesian(d.source.x, d.source.y)
      const [x2, y2] = toCartesian(d.target.x, d.target.y)

      const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
      const u = [(x2 - x1) / distance, (y2 - y1) / distance]

      const offsetTarget = size[hierchyLevel(d.target)]
      const offsetSource = size[hierchyLevel(d.source)]

      const x4 = x1 + (distance - offsetTarget) * u[0]
      const y4 = y1 + (distance - offsetTarget) * u[1]

      const x3 = x1 + offsetSource * u[0]
      const y3 = y1 + offsetSource * u[1]

      d.target.cartX = x3
      d.target.cartY = y3
      d.source.cartX = x4
      d.source.cartY = y4
      if (x4 > x3) {
        d.inverted = true
        d.path = `M ${x3},${y3} L ${x4},${y4}`
      } else {
        d.inverted = false
        d.path = `M ${x4},${y4} L ${x3},${y3}`
      }
    } else {
      d.innerLink = false
      d.path = linkRadial()
        .angle((d: any) => d.x + Math.PI / 2)
        .radius((d: any) => d.y)(d as any)
    }
  })

  return (
    <g>
      {links.map((link, i) => (
        <LinkElement link={link} key={i} />
      ))}
    </g>
  )
}

export default Links
