import { styled } from '@mui/material'
import NodeHierchyButton from './NodeHierarchyButton'
import { InfoTooltip } from '../../../../components/InfoTooltip'

const FilterWrapper = styled('div')(({ theme }) => ({
  background: theme.palette.background.default,
  padding: '4px 7px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '4px',
  display: 'flex',
  position: 'absolute',
  right: 0,
  'z-index': 5,
}))

const StyledText = styled('p')({
  width: '200px',
  fontSize: '12px',
  marginTop: '0px',
  marginBottom: '0px',
})

const HeaderText = styled('h4')({
  marginBottom: '2px',
  marginTop: '3px',
  display: 'flex',
  flexDirection: 'row',
})

interface Props {
  toggleEmployees: () => void
}

const Filter = ({ toggleEmployees }: Props) => {
  const nodeType = 'Ansatt'
  const description =
    'Du kan klikke på noden til en gruppeleder for å vise eller skjule gruppebarn som tilhører ytterste nivå av grafen.'

  return (
    <FilterWrapper>
      <div>
        <HeaderText>
          Åpne og lukke nivå
          <InfoTooltip description={description} placement="right" />
        </HeaderText>
        <StyledText>
          Klikk på sirkelen for å lukke eller åpne alle i kategorien
        </StyledText>
      </div>

      <NodeHierchyButton title={nodeType} onClick={toggleEmployees} />
    </FilterWrapper>
  )
}

export default Filter
