import React, { useEffect, useRef } from 'react'
import { EmployeeNode } from 'server/routers/employees/employeesTypes'
import { hierarchy, cluster, HierarchyNode, HierarchyLink } from 'd3-hierarchy'
import { descending } from 'd3-array'
import { linkRadial } from 'd3-shape'
import { zoom } from 'd3-zoom'
import { select } from 'd3-selection'
import { useTheme } from '@mui/material'

interface Props {
  data: EmployeeNode
  width: number
  height: number
  margin: number
}

function toCartesian(x: number, y: number) {
  return [y * Math.cos(x), y * Math.sin(x)]
}

const rightSide = (radians: number) =>
  radians < Math.PI / 2 || radians > (3 * Math.PI) / 2

const nodeFillColors = [
  'rgb(75, 100, 85)',
  'rgb(165, 177, 170)',
  'rgb(183, 222, 189)',
  'rgb(219, 238, 222)',
]

const nodeStrokeColors = [
  'rgb(52, 70, 60)',
  'rgb(116, 124, 119)',
  'rgb(128, 155, 132)',
  'rgb(153, 167, 155)',
]

const linkColors = [
  'rgb(75, 100, 85)',
  ' rgb(132, 142, 136)',
  ' rgb(146, 178, 151)',
  ' rgb(175, 190, 178)',
]

const size = [15, 10, 6, 5]

const hierchyLevel = (d) => {
  if (d.depth === 0) return 0
  if (!d.children) return 3
  if (d.depth === 1 || d.height > 1) return 1
  if (d.children) return 2
  return 3
}

const linkColor = (d) => linkColors[hierchyLevel(d)]
const nodeSize = (d) => size[hierchyLevel(d)]
const fill = (d) => nodeFillColors[hierchyLevel(d)]
const nodeStroke = (d) => nodeStrokeColors[hierchyLevel(d)]

type Node = HierarchyNode<EmployeeNode> & {
  x: number
  y: number
}

type Link = HierarchyLink<EmployeeNode> & {
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

const OrganizationStructureTree = ({ data, width, height, margin }: Props) => {
  const theme = useTheme()
  const halo = theme.palette.background.paper // Stroke around the labels in case they overlap with a link
  const haloWidth = 0.2
  const svgRef = useRef<SVGSVGElement>(null)
  const groupRef = useRef<SVGGElement>(null)
  console.log('render')

  const root = hierarchy(data)
  root.sort((a, b) => descending(a.height, b.height))
  const descendants = root.descendants() as Node[]

  const marginTop = margin
  const marginRight = margin
  const marginBottom = margin
  const marginLeft = margin
  const radius =
    Math.min(
      width - marginLeft - marginRight,
      height - marginTop - marginBottom
    ) / 2

  // Compute the layout.
  cluster()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent == b.parent ? 1 : 3))(root)

  // Sets the group leader with the most children to start at the 9 o'clock position
  descendants[0].children[0].x = Math.PI

  // Sets the angle of the CEO to 0
  descendants[0].x = 0

  // Aligns the y position of the direct children of CEO
  descendants.forEach((d) => {
    if (d.depth === 1 && d.height !== 0) {
      d.y = 175
    }
    if (d.depth === 2 && d.height == 2) {
      d.y -= 30
    }
  })

  const links = root.links() as Link[]
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

  useEffect(() => {
    const zoomCall = zoom().on('zoom', (event) => {
      if (groupRef.current) {
        groupRef.current.setAttribute('transform', event.transform)
      }
    })
    select(svgRef.current).call(zoomCall)
  }, [groupRef, svgRef])

  return (
    <svg
      viewBox={`${-marginLeft - radius}  ${
        -marginTop - radius
      } ${width} ${height}`}
      width={width}
      height={height}
      style={{ maxWidth: '100%', height: 'auto' }}
      fontFamily={'sans-serif'}
      ref={svgRef}
      fontSize={12}
    >
      <g ref={groupRef}>
        <g>
          {links.map((link) => (
            <React.Fragment key={link.target.data.employee.email}>
              <path
                fill="none"
                stroke={linkColor(link.target)}
                d={link.path}
                id={link.target.data.employee.email}
              />
              {link.innerLink && (
                <text
                  stroke={halo}
                  strokeWidth={haloWidth}
                  paintOrder="stroke"
                  fill={theme.palette.text.primary}
                >
                  <textPath
                    xlinkHref={'#' + link.target.data.employee.email}
                    startOffset={link.inverted ? '100%' : null}
                    textAnchor={link.inverted ? 'end' : null}
                  >
                    <tspan dy="-2px" dx={link.inverted ? '-2px' : '2px'}>
                      {link.target.children
                        ? link.target.data.employee.name
                        : ''}
                    </tspan>
                  </textPath>
                </text>
              )}
            </React.Fragment>
          ))}
        </g>
        <g>
          {descendants.map((node) => {
            return (
              <g
                key={node.data.employee.email}
                transform={`rotate(${(node.x * 180) / Math.PI}) translate(${
                  node.y
                })`}
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
                  x={
                    rightSide(node.x) ? nodeSize(node) + 3 : -nodeSize(node) - 3
                  }
                  textAnchor={rightSide(node.x) ? 'start' : 'end'}
                  paintOrder="stroke"
                  stroke={halo}
                  fill={theme.palette.text.primary}
                  strokeWidth={haloWidth}
                >
                  {node.children && node.depth !== 0
                    ? ''
                    : node.data.employee.name}
                </text>
              </g>
            )
          })}
        </g>
      </g>
    </svg>
  )
}

export default OrganizationStructureTree
