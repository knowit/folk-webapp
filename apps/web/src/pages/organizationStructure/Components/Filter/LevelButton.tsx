import { styled } from '@mui/material'
import { useState } from 'react'

interface Props {
  index: number
  title: string
  onClick: () => void
}
const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const Svg = styled('svg')({
  width: '80px',
  height: '40px',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '5px',
})

const Circle = styled('circle')({
  width: '36px',
  height: '36px',
  display: 'flex',
  cursor: 'pointer',
})

const Text = styled('div')({
  fontSize: '12px',
  padingTop: '1px',
})

const CircleButton = ({ index, title, onClick }: Props) => {
  const [clicked, setClicked] = useState(false)

  const nodeFillColors = ['rgb(219, 238, 222)']
  const nodeFillColorsClicked = ['grey'] //TODO
  const nodeStrokeColors = ['rgb(153, 167, 155)']

  return (
    <Wrapper>
      <Svg>
        <Circle
          onClick={() => {
            onClick()
            setClicked(!clicked)
          }}
          cx="40"
          cy="20"
          r="18"
          strokeWidth={1}
          fill={clicked ? nodeFillColorsClicked[0] : nodeFillColors[index]}
          stroke={nodeStrokeColors[index]}
        />
      </Svg>
      <Text>{title}</Text>
    </Wrapper>
  )
}
export default CircleButton
