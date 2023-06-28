import { Node } from '../../type'
import { useTheme } from '@mui/material'
import { haloWidth } from '../../util'
import { checkRotateDegree, setXValue } from './util'

interface Props {
  node: Node
  showHiddenChildsCount: boolean
  degree: number
  rotateValue: number
}

const ChildrenCount = ({
  node,
  showHiddenChildsCount,
  degree,
  rotateValue,
}: Props) => {
  const theme = useTheme()
  const halo = theme.palette.background.paper

  const childrenOuterLayerCount = () => {
    const newArray = node.children.filter((node) => !node.children)
    return newArray.length
  }

  return (
    <g>
      {!showHiddenChildsCount && (
        <text
          transform={`rotate(${
            checkRotateDegree(degree, rotateValue) ? 0 : 180
          })`}
          dy={3}
          x={setXValue(
            childrenOuterLayerCount(),
            degree,
            rotateValue,
            node.depth
          )}
          textAnchor={checkRotateDegree(degree, rotateValue) ? 'start' : 'end'}
          paintOrder="stroke"
          stroke={halo}
          fill={node.depth === 0 ? theme.palette.text.tertiary : '#333'}
          strokeWidth={haloWidth}
          style={{
            fontSize: '10px',
            fontWeight: '550',
            cursor: 'pointer',
          }}
        >
          {childrenOuterLayerCount() > 0 && '+' + childrenOuterLayerCount()}
        </text>
      )}
    </g>
  )
}

export default ChildrenCount
