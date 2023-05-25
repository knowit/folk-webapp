import { styled } from '@mui/material/styles'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Chip, Rating, Divider } from '@mui/material'
import { EmployeeTableColumnMapping, FilterEntry } from './FilterUtil'

const ComponentRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.darker,
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
const RatingStyled = styled(Rating)(({ theme }) => ({
  color: theme.palette.text.primary,
}))
const DividerStyled = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}))
const ChipStyled = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.background.darker,
  border: `1px solid ${theme.palette.text.primary}`,
  color: theme.palette.text.primary,
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
    <ChipStyled
      size="small"
      variant="outlined"
      label={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {label}
          <DividerStyled
            orientation="vertical"
            style={{ marginLeft: '3px', marginRight: '3px' }}
            flexItem
          />
          <RatingStyled
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
    <ChipStyled
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
        {filterList.map((skill, index) => (
          <Tag
            threshold={skill.threshold}
            key={index}
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
