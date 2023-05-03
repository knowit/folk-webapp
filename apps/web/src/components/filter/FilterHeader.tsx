import { styled } from '@mui/material/styles'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Chip, Slider } from '@mui/material'
import { EmployeeTableColumnMapping, FilterEntry } from './FilterUtil'

const ComponentRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderBottom: `solid 1px ${theme.palette.background.darker}`,
  padding: '0 15px',
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
}))
const ComponentTitle = styled('div')(() => ({
  paddingTop: 20,
  fontWeight: 'bold',
}))
const ComponentTagsContainer = styled('div')(() => ({
  padding: 15,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  flex: 'auto',
}))
const FilterThresholdContainer = styled('div')(() => ({
  display: 'flex',
  justifyContents: 'flex-start',
  alignItems: 'center',
  borderLeft: 'solid 1px #e0ded7',
  padding: 5,
}))

const FilterThresholdTitle = styled('label')(() => ({
  padding: 10,
  paddingTop: 6,
  paddingLeft: 5,
  fontStyle: 'italic',
  alignSelf: 'flex-start',
}))

const Tag = ({ label, onDelete }: { label: string; onDelete: () => void }) => {
  return (
    <Chip
      size="small"
      variant="outlined"
      label={label}
      onDelete={onDelete}
      deleteIcon={<CloseIcon />}
    />
  )
}

const RemoveAllTag = (onDelete: { onDelete: () => void }) => {
  return (
    <Chip
      size="small"
      label="Fjern alle"
      onDelete={onDelete.onDelete}
      deleteIcon={<CloseIcon />}
    />
  )
}

interface Props {
  title: string
  filterList: FilterEntry[]
  onThresholdUpdate: (value: string, threshold: number) => void
  onSkillClick: (value: string, threshold: number) => void
  type: EmployeeTableColumnMapping
}

interface Mark {
  value: number
  label: string
}

export function FilterHeader({
  title,
  filterList,
  onThresholdUpdate,
  onSkillClick,
  type,
}: Props) {
  const threshold = filterThreshold

  function handleThresholdSliderChange(
    _event: object,
    value: number | number[]
  ) {
    if (Array.isArray(value)) {
      value = value?.[0]
    }
    if (value !== filterThreshold) {
      onThresholdUpdate(value)
    }
  }

  const thresholdLabels: Mark[] = [
    { value: 1, label: '1+' },
    { value: 2, label: '2+' },
    { value: 3, label: '3+' },
    { value: 4, label: '4+' },
    { value: 5, label: '5' },
  ]

  return (
    <ComponentRoot>
      <ComponentTitle>{title}</ComponentTitle>
      <ComponentTagsContainer>
        {filterList.length > 1 && (
          <RemoveAllTag onDelete={() => onSkillClick([])} />
        )}
        {filterList.map((skill) => (
          <Tag
            key={skill}
            label={skill}
            onDelete={() =>
              onSkillClick(filterList.filter((item) => item !== skill))
            }
          />
        ))}
      </ComponentTagsContainer>
      {type != EmployeeTableColumnMapping.CUSTOMER ? (
        <FilterThresholdContainer>
          <FilterThresholdTitle htmlFor={`${type}-threshold-slider`}>
            Terskel:
          </FilterThresholdTitle>
          <Slider
            id={`${type}-threshold-slider`}
            value={threshold}
            step={1}
            valueLabelDisplay="auto"
            marks={thresholdLabels}
            valueLabelFormat={(value) =>
              thresholdLabels.find((mark) => mark.value === value)?.label ??
              value
            }
            min={1}
            max={5}
            onChange={handleThresholdSliderChange}
          />
        </FilterThresholdContainer>
      ) : null}
    </ComponentRoot>
  )
}
