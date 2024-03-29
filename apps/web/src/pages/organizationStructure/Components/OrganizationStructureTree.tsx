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
import SearchInput from '../../../components/SearchInput'
import { styled } from '@mui/material/styles'

const SearchFieldStyled = styled('div')(() => ({
  marginBottom: '5px',
}))

interface Props {
  data: EmployeeNode[]
  width: number
  height: number
  margin: number
  hideChildNodes: boolean
}

const OrganizationStructureTree = ({
  data,
  width,
  height,
  margin,
  hideChildNodes,
}: Props) => {
  const [clickedParents, setClickedParents] = useState<string[]>([])
  const [rotateValue, setRotateValue] = useState(0)
  const [zoomTransformValue, setZoomTransformValue] = useState({
    k: 1,
    x: 0,
    y: 0,
  })
  const [searchTerm, setSearchTerm] = useState('')
  const svgRef = useRef<SVGSVGElement>(null)
  const groupRef = useRef<SVGGElement>(null)

  const roots = data.map((d) => hierarchy({ ...d }))
  const root = roots.find((r) => !!r.children)

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
      <AbsolutelyPositionedBox>
        <SearchFieldStyled>
          <SearchInput
            placeholder={'Søk i ansatte'}
            onSearch={(searchTerm) => {
              setSearchTerm(searchTerm.toLowerCase())
            }}
            onClear={() => setSearchTerm('')}
          />
        </SearchFieldStyled>
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
      </AbsolutelyPositionedBox>
      <svg
        viewBox={`${-margin - radius}  ${-margin - radius} ${width} ${height}`}
        style={{ maxWidth: '100%', height: 'auto', position: 'absolute' }}
        fontFamily={'sans-serif'}
        ref={svgRef}
        fontSize={12}
      >
        <g ref={groupRef}>
          <Links
            links={linksSorted}
            clickedParents={clickedParents}
            rotateValue={rotateValue}
            searchTerm={searchTerm}
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
                  searchTerm={searchTerm}
                />
              )
            })}

            <LeadersOverview
              hideChildNodes={hideChildNodes}
              descendants={descendantsWithChildren}
              clickedParents={clickedParents}
              setClickedParents={setClickedParents}
              rotateValue={rotateValue}
              searchTerm={searchTerm}
            />
          </g>
        </g>
      </svg>
    </>
  )
}

export default OrganizationStructureTree

const AbsolutelyPositionedBox = styled('div')({
  position: 'absolute',
  'z-index': '5',
})
