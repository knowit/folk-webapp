import { styled } from '@mui/material/styles'
import { useEffect } from 'react'
import { zoom } from 'd3-zoom'
import { select } from 'd3-selection'
import { Button } from '@mui/material'
import { AddIcon, RemoveIcon } from '../../../assets/Icons'
import { useTheme } from '@mui/material/styles'

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
  width: '200px',
  display: 'flex',
  justifyContent: 'center',
})

const Percent = styled('div')({
  fontSize: '24px',
})

const ZoomButton = styled(AddIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.text.secondary,
  },
}))

export const IconBaseStyle = () => {
  const theme = useTheme()
  return {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.text.primary,
    },
  }
}

const Zooming = ({
  groupRef,
  svgRef,
  setZoomTransformValue,
  zoomTransformValue,
  rotateValue,
}: Props) => {
  const zoom_in = zoomTransformValue.k + 0.1
  const zoom_out = zoomTransformValue.k - 0.1
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
    select(svgRef.current).transition().call(zoomCall.scaleTo, zoom_in)
  }

  const zoomOut = () => {
    select(svgRef.current).transition().call(zoomCall.scaleTo, zoom_out)
  }

  const getPercent = () => {
    const prosent = 100 - ((1 - zoomTransformValue.k.toFixed(1)) / 1) * 100
    return prosent.toFixed(0)
  }

  return (
    <ButtonWrapper>
      <Button onClick={zoomIn}>
        <ZoomButton />
      </Button>
      <Percent>{getPercent()}%</Percent>
      <Button onClick={zoomOut}>
        <RemoveIcon />
      </Button>
    </ButtonWrapper>
  )
}
export default Zooming
