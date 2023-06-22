import { styled } from '@mui/material'
import LevelButton from './LevelButton'
import { InfoTooltip } from '../../../../components/InfoTooltip'

const FilterWrapper = styled('div')({
  padding: '4px 7px',
  background: '#E4E1DB',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '4px',
  display: 'flex',
  float: 'right',
})

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
  hideEmployeesWithoutChildren: boolean
}

const Filter = ({ toggleEmployees }: Props) => {
  const nodeType = [
    /** 'Daglig leder', 'Avdelingsleder', 'Gruppeleder',*/
    'Ansatt',
  ]

  const description =
    'Du kan klikke på noden til en gruppeleder for å vise eller skjule gruppebarna til personen.'

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
      {nodeType.map((type, index) => (
        <LevelButton
          key={type + index}
          title={type}
          index={index}
          onClick={toggleEmployees}
        />
      ))}
    </FilterWrapper>
  )
}

export default Filter
