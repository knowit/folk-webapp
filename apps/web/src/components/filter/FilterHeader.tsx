import { styled } from '@mui/material/styles'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Chip, Rating, Divider } from '@mui/material'
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
const StyledRating = styled(Rating)(() => ({
  color: 'black',
}))

const Tag = ({
  label,
  threshold,
  onDelete,
  onThresholdChange,
}: {
  label: string
  threshold: number
  onDelete: () => void
  onThresholdChange: (value) => void
}) => {
  return (
    <Chip
      size="small"
      variant="outlined"
      label={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {label}
          <Divider
            orientation="vertical"
            style={{ marginLeft: '2px', marginRight: '2px' }}
            flexItem
          />
          <StyledRating
            size="small"
            value={threshold}
            onChange={(_, value) => onThresholdChange(value)}
          />
        </div>
      }
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
  onSkillClick: (value: string[]) => void
  type: EmployeeTableColumnMapping
}

export function FilterHeader({
  title,
  filterList,
  onThresholdUpdate,
  onSkillClick,
}: Props) {
  return (
    <ComponentRoot>
      <ComponentTitle>{title}</ComponentTitle>
      <ComponentTagsContainer>
        {filterList.length > 1 && (
          <RemoveAllTag onDelete={() => onSkillClick([])} />
        )}
        {filterList.map((skill) => (
          <Tag
            threshold={skill.threshold}
            key={skill.value}
            label={skill.value}
            onThresholdChange={(value: number) =>
              onThresholdUpdate(skill.value, value)
            }
            onDelete={() =>
              onSkillClick(
                filterList
                  .filter((item) => item !== skill)
                  .map((filter) => filter.value)
              )
            }
          />
        ))}
      </ComponentTagsContainer>
    </ComponentRoot>
  )
}
