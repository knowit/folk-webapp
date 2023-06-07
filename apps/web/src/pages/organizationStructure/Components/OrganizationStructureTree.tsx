import { useRef, useState } from 'react'
import { EmployeeNode } from 'server/routers/employees/employeesTypes'
import { hierarchy, cluster } from 'd3-hierarchy'
import { descending } from 'd3-array'
import { Link, Node } from '../type'
import Links from './Links/Links'
import EmployeeTreeNode from './EmployeeTreeNode'
import Zooming from './Zooming'
import Rotating from './Rotating'

interface Props {
  data: EmployeeNode
  width: number
  height: number
  margin: number
}

const OrganizationStructureTree = ({ data, width, height, margin }: Props) => {
  const [rotateValue, setRotateValue] = useState(0)
  const [zoomTransformValue, setZoomTransformValue] = useState({
    k: 1,
    x: 0,
    y: 0,
  })

  const handleRotateValueChange = (value: number) => {
    setRotateValue(value)
  }

  const svgRef = useRef<SVGSVGElement>(null)
  const groupRef = useRef<SVGGElement>(null)

  const root = hierarchy(data)
  root.sort((a, b) => descending(a.height, b.height))
  const descendants = root.descendants() as Node[]
  const links = root.links() as Link[]

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

  const descendantsWithChildren = descendants.filter((node) => node.children)

  // Sort descendants by x-values, and splice it up som the node that starts at 0 degree is first
  const descendantsWithoutChildren = descendants
    .filter((node) => !node.children)
    .sort((a, b) => a.x - b.x)

  const indexes = Math.floor(descendantsWithoutChildren.length / 4)
  const lastQuarter = descendantsWithoutChildren.splice(-indexes)
  const descendantsSorted = lastQuarter.concat(descendantsWithoutChildren)

  // Used to give each node a degree from 0-360 when mapped for EmployeeTreeNode
  const antall = 360 / descendantsWithoutChildren.length

  return (
    <>
      <div>
        <Rotating
          groupRef={groupRef}
          svgRef={svgRef}
          zoomTransformValue={zoomTransformValue}
          setZoomTransformValue={setZoomTransformValue}
          handleRotateValueChange={handleRotateValueChange}
        />
        <Zooming
          groupRef={groupRef}
          svgRef={svgRef}
          zoomTransformValue={zoomTransformValue}
          setZoomTransformValue={setZoomTransformValue}
          rotateValue={rotateValue}
        />
      </div>
      <svg
        viewBox={`${-marginLeft - radius}  ${
          -marginTop - radius
        } ${width} ${height}`}
        style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
        fontFamily={'sans-serif'}
        ref={svgRef}
        fontSize={12}
      >
        <g ref={groupRef}>
          <Links links={links} />
          <g>
            {descendantsSorted.map((node, i) => {
              return (
                <EmployeeTreeNode
                  node={node}
                  key={i}
                  rotateValue={rotateValue}
                  degree={i * antall}
                />
              )
            })}
            {descendantsWithChildren.map((node, i) => {
              return (
                <EmployeeTreeNode
                  node={node}
                  key={i}
                  rotateValue={rotateValue}
                />
              )
            })}
          </g>
        </g>
      </svg>
    </>
  )
}

export default OrganizationStructureTree
