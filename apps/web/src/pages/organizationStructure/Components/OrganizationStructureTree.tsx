import { useRef, useState } from 'react'
import { EmployeeNode } from 'server/routers/employees/employeesTypes'
import { hierarchy, cluster } from 'd3-hierarchy'
import { descending } from 'd3-array'
import { Link, Node } from '../type'
import Links from './Links/Links'
import Zooming from './Zooming'
import Rotating from './Rotating'
import LeadersOverview from '../LeadersOverview'
import EmployeeTreeNode from './Nodes/EmployeeTreeNode'
import { spliceArray } from '../util'

interface Props {
  data: EmployeeNode
  width: number
  height: number
  margin: number
  hideEmployeesWithoutChildren: boolean
}

const OrganizationStructureTree = ({
  data,
  width,
  height,
  margin,
  hideEmployeesWithoutChildren,
}: Props) => {
  const [clickedParents, setClickedParents] = useState<string[]>([])
  const [rotateValue, setRotateValue] = useState(0)
  const [zoomTransformValue, setZoomTransformValue] = useState({
    k: 1,
    x: 0,
    y: 0,
  })
  const svgRef = useRef<SVGSVGElement>(null)
  const groupRef = useRef<SVGGElement>(null)
  const root = hierarchy(data)
  root.sort((a, b) => descending(a.height, b.height))
  const descendants = root.descendants() as Node[]
  const links = root.links() as Link[]
  const radius = Math.min(width - margin - margin, height - margin - margin) / 2

  const handleRotateValueChange = (value: number) => {
    setRotateValue(value)
  }

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
      d.y -= 60
    }
  })

  //Sort descentants with children
  const descendantsWithChildren = descendants.filter((node) => node.children)
  descendantsWithChildren.sort((a, b) => a.x - b.x)

  // Sort descendants by x-values, and splice it up som the node that starts at 0 degree is first
  const descendantsWithoutChildren = descendants
    .filter((node) => !node.children)
    .sort((a, b) => a.x - b.x)

  // Used to give each node a degree from 0-360 when mapped for EmployeeTreeNode
  const countChildren = 360 / descendantsWithoutChildren.length
  const descendantsWithoutChildrenSorted = spliceArray(
    descendantsWithoutChildren
  )

  links.sort((a, b) => a.target.x - b.target.x)
  const linksSorted = spliceArray(links)

  return (
    <>
      <div>
        <Rotating
          groupRef={groupRef}
          zoomTransformValue={zoomTransformValue}
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
        viewBox={`${-margin - radius}  ${-margin - radius} ${width} ${height}`}
        style={{ maxWidth: '100%', height: 'auto' }}
        fontFamily={'sans-serif'}
        ref={svgRef}
        fontSize={12}
      >
        <g ref={groupRef}>
          <Links
            links={linksSorted}
            clickedParents={clickedParents}
            rotateValue={rotateValue}
          />
          <g>
            {descendantsWithoutChildrenSorted.map((node, i) => {
              return (
                <EmployeeTreeNode
                  node={node}
                  key={i}
                  rotateValue={rotateValue}
                  degree={(i + 1) * countChildren}
                  clickedParents={clickedParents}
                />
              )
            })}
            <LeadersOverview
              hideEmployeesWithoutChildren={hideEmployeesWithoutChildren}
              descendants={descendantsWithChildren}
              clickedParents={clickedParents}
              setClickedParents={setClickedParents}
              rotateValue={rotateValue}
            />
          </g>
        </g>
      </svg>
    </>
  )
}

export default OrganizationStructureTree
