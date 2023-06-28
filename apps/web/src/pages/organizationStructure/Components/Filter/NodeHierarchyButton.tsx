import { styled } from '@mui/material'
import { useState } from 'react'

interface Props {
  title: string
  onClick: () => void
}
const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const StyledSvg = styled('svg')({
  width: '80px',
  height: '40px',
  display: 'flex',
  flexDirection: 'column',
  marginTop: '5px',
})

const StyledCircle = styled('circle')({
  width: '36px',
  height: '36px',
  display: 'flex',
  cursor: 'pointer',
})

const Text = styled('div')({
  fontSize: '12px',
  padingTop: '1px',
})

const NodeHierarchyButton = ({ title, onClick }: Props) => {
  const [hideClickedCategory, setHideClickedCategory] = useState(false)

  const nodeFillColors = 'rgb(219, 238, 222)'
  const nodeFillColorsClicked = 'rgb(160, 160, 160)'
  const nodeStrokeColors = 'rgb(153, 167, 155)'

  return (
    <Wrapper>
      <StyledSvg>
        <StyledCircle
          onClick={() => {
            onClick()
            setHideClickedCategory(!hideClickedCategory)
          }}
          cx="40"
          cy="20"
          r="18"
          strokeWidth={1}
          fill={hideClickedCategory ? nodeFillColorsClicked : nodeFillColors}
          stroke={nodeStrokeColors}
        />
      </StyledSvg>
      <Text>{title}</Text>
    </Wrapper>
  )
}
export default NodeHierarchyButton
