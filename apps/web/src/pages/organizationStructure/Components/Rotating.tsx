import { useState } from 'react'
import { select } from 'd3-selection'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

interface Props {
  groupRef: React.MutableRefObject<SVGGElement>
  svgRef: React.MutableRefObject<SVGGElement>
  zoomTransformValue: any
  setZoomTransformValue: any
  handleRotateValueChange: (value: number) => void
}

const Wrapper = styled('div')({
  width: '200px',
})

const Rotating = ({
  groupRef,
  zoomTransformValue,
  handleRotateValueChange,
}: Props) => {
  const [sliderValue, setSliderValue] = useState(50)

  const rotateLeft = (currentSliderValue) => {
    const newValue = ((currentSliderValue - 50) / 1) * 7.2
    select(groupRef.current).attr(
      'transform',
      `translate(${zoomTransformValue.x},${zoomTransformValue.y}) scale(${zoomTransformValue.k}), rotate(${newValue})`
    )
    handleRotateValueChange(newValue)
  }
  const rotateRight = (currentSliderValue) => {
    const newValue = ((currentSliderValue - 50) / 1) * 7.2
    select(groupRef.current).attr(
      'transform',
      `translate(${zoomTransformValue.x},${zoomTransformValue.y}) scale(${zoomTransformValue.k}), rotate(${newValue})`
    )
    handleRotateValueChange(newValue)
  }

  const handleChange = (e) => {
    const currentSliderValue = e.target.value
    if (currentSliderValue < sliderValue) {
      rotateLeft(currentSliderValue)
    } else if (currentSliderValue > sliderValue) {
      rotateRight(currentSliderValue)
    }
    setSliderValue(currentSliderValue)
  }

  return (
    <Wrapper>
      <Slider
        valueLabelDisplay="auto"
        track={false}
        defaultValue={50}
        value={sliderValue}
        step={1}
        onChange={handleChange}
      />
    </Wrapper>
  )
}
export default Rotating
