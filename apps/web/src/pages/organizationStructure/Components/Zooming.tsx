import { styled } from '@mui/material/styles'
import { useEffect } from 'react'
import { zoom } from 'd3-zoom'
import { select } from 'd3-selection'

interface Props {
  groupRef: React.MutableRefObject<SVGGElement>
  svgRef: React.MutableRefObject<SVGGElement>
  zoomTransformValue: any
  setZoomTransformValue: any
  rotateValue: number
}

const ButtonWrapper = styled('div')({
  border: '1px solid #000000',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '4px',
  width: '134px',
  display: 'flex',
  justifyContent: 'space-between',
  '& button': {
    paddingLeft: '10px',
    paddingRight: '10px',
    border: 'none',
    color: '#333333',
    fontSize: '28px',
  },
})

const Percent = styled('div')({
  fontSize: '24px',
})

const Zooming = ({
  groupRef,
  svgRef,
  setZoomTransformValue,
  zoomTransformValue,
  rotateValue,
}: Props) => {
  const zoomCall = zoom().scaleExtent([0.5, 3]).on('zoom', handleZoom)
  useEffect(() => {
    const zoomCall = zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        if (groupRef.current) {
          select(groupRef.current).attr(
            'transform',
            `${event.transform}, rotate(${rotateValue})`
          )
          setZoomTransformValue(event.transform)
        }
      })
    select(svgRef.current).call(zoomCall)
  }, [groupRef, svgRef, setZoomTransformValue, rotateValue])

  function handleZoom(event) {
    if (groupRef.current) {
      select(groupRef.current).attr(
        'transform',
        `${event.transform}, rotate(${rotateValue})`
      )
      setZoomTransformValue(event.transform)
    }
  }

  const zoomIn = () => {
    select(svgRef.current) /*.transition()*/
      .call(zoomCall.scaleBy, 1.1)
  }

  const zoomOut = () => {
    select(svgRef.current) /*.transition()*/
      .call(zoomCall.scaleBy, 0.9)
  }
  const numberFixed = Math.floor(zoomTransformValue.k * 10) / 10
  //TODO fikse prosent, feil
  const getPercent = () => {
    const p = 1 - numberFixed
    const x = (p / 1) * 100
    const prosent = 100 - x
    return prosent.toFixed(0)
  }

  return (
    <ButtonWrapper>
      <button id="zoom_in" onClick={zoomIn} className="button">
        +
      </button>
      <Percent>{getPercent()}%</Percent>
      <button id="zoom_out" onClick={zoomOut}>
        -
      </button>
    </ButtonWrapper>
  )
}
export default Zooming
