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

const Text = styled('div')({
  fontSize: '12px',
  padingTop: '1px',
})

const StyledCircle = styled('circle', {
  shouldForwardProp: (prop) => prop !== 'hideClickedCategory',
})<{ hideClickedCategory: boolean }>(({ hideClickedCategory }) => ({
  r: '18',
  width: '36px',
  height: '36px',
  display: 'flex',
  cursor: 'pointer',
  fill: hideClickedCategory ? 'rgb(153, 167, 155)' : 'rgb(219, 238, 222)',
  stroke: hideClickedCategory ? 'rgb(219, 238, 222)' : 'rgb(153, 167, 155)',
  strokeWidth: 1,
  '&:hover': {
    fill: 'rgb(153, 167, 155)',
    stroke: 'rgb(219, 238, 222)',
    r: '20',
  },
}))

const NodeHierarchyButton = ({ title, onClick }: Props) => {
  const [hideClickedCategory, setHideClickedCategory] = useState(false)

  return (
    <Wrapper>
      <StyledSvg>
        <StyledCircle
          hideClickedCategory={hideClickedCategory}
          onClick={() => {
            onClick()
            setHideClickedCategory(!hideClickedCategory)
          }}
          cx="40"
          cy="20"
        />
      </StyledSvg>
      <Text>{title}</Text>
    </Wrapper>
  )
}
export default NodeHierarchyButton
