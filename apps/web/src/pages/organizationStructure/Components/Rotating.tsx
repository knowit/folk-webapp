import { useState } from 'react'
import { select } from 'd3-selection'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

interface Props {
  groupRef: React.MutableRefObject<SVGGElement>
  svgRef: React.MutableRefObject<SVGGElement>
  zoomTransformValue: any
  setZoomTransformValue: any
  rotateValue: number
  setRotateValue: any
}

const Wrapper = styled('div')({
  width: '200px',
})

const Rotating = ({ groupRef, zoomTransformValue, setRotateValue }: Props) => {
  const [sliderValue, setSliderValue] = useState(50)
  const rotateLeft = (value) => {
    const newValue = (value - 50) * 4 - 10
    setRotateValue(newValue)
    select(groupRef.current).attr(
      'transform',
      `translate(${zoomTransformValue.x},${zoomTransformValue.y}) scale(${zoomTransformValue.k}), rotate(${newValue})`
    )
  }
  const rotateRight = (value) => {
    const newValue = (value - 50) * 4 + 10
    setRotateValue(newValue)
    select(groupRef.current).attr(
      'transform',
      `translate(${zoomTransformValue.x},${zoomTransformValue.y}) scale(${zoomTransformValue.k}), rotate(${newValue})`
    )
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
