import { createStyles, makeStyles } from '@material-ui/core/styles'
import React, { Dispatch } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { Action, SearchableColumn } from '../data/DDTable'
import { Mark, Slider } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    filterHeaderRoot: {
      backgroundColor: '#ffffff',
      borderBottom: 'solid 1px #e0ded7',
      padding: '0 15px',
      display: 'flex',
      justifyContent: 'flex-start',
    },
    filterHeaderTitle: {
      paddingTop: '20px',
      fontWeight: 'bold',
    },
    filterTagsContainer: {
      padding: '15px',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      flex: 'auto',
    },
    removeAllTag: {
      padding: '1px 15px 1px 1px',
    },
    skillTag: {
      padding: '1px 1px 1px 15px',
    },
    tag: {
      display: 'flex',
      alignItems: 'center',
      height: '24px',
      margin: '2px',
      lineHeight: '22px',
      backgroundColor: '#fafafa',
      border: '1px solid #e8e8e8',
      boxSizing: 'content-box',
      outline: 0,
      overflow: 'hidden',
      '&:hover': {
        borderColor: 'rgb(250, 192, 177)',
        backgroundColor: '#fac0b11f',
      },
      '&:span': {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
      '&:svg': {
        fontSize: '12px',
        cursor: 'pointer',
        padding: '4px',
      },
    },
    filterThresholdContainer: {
      display: 'flex',
      justifyContents: 'flex-start',
      alignItems: 'center',
      borderLeft: 'solid 1px #e0ded7',
      padding: '5px',
    },
    filterThresholdTitle: {
      padding: '10px',
      paddingTop: '6px',
      paddingLeft: '5px',
      fontStyle: 'italic',
      alignSelf: 'flex-start',
    },
    thresholdSlider: { minWidth: '150px' },
    thresholdInput: { display: 'none' },
  })
)

const Tag = ({ label, onDelete }: { label: string; onDelete: () => void }) => {
  const classes = useStyles()
  return (
    <div
      className={[classes.tag, classes.skillTag].join(' ')}
      onClick={onDelete}
    >
      <span>{label}</span>
      <CloseIcon
        style={{
          height: '10px',
          width: '10px',
          marginLeft: '10px',
          marginBottom: '10px',
          backgroundColor: '#e4e1db',
        }}
      />
    </div>
  )
}

const RemoveAllTag = (onDelete: { onDelete: () => void }) => {
  const classes = useStyles()
  return (
    <div
      className={[classes.tag, classes.removeAllTag].join(' ')}
      onClick={onDelete.onDelete}
    >
      <CloseIcon />
      <span>Fjern alle</span>
    </div>
  )
}

export function FilterHeader({
  filterList,
  filterThreshold,
  dispatch,
  allRows,
  searchableColumns,
  type,
}: {
  filterList: string[]
  filterThreshold: number
  dispatch: Dispatch<Action>
  allRows: any[]
  searchableColumns: SearchableColumn[]
  type: 'COMPETENCE' | 'MOTIVATION'
}) {
  const classes = useStyles()

  const dispatchRemove =
    type === 'COMPETENCE'
      ? 'REMOVE_FROM_COMPETENCE_FILTER'
      : 'REMOVE_FROM_MOTIVATION_FILTER'
  const dispatchClear =
    type === 'COMPETENCE'
      ? 'CLEAR_COMPETENCE_FILTER'
      : 'CLEAR_MOTIVATION_FILTER'
  const dispatchThresholdUpdate =
    type === 'COMPETENCE'
      ? 'UPDATE_COMPETENCE_THRESHOLD'
      : 'UPDATE_MOTIVATION_THRESHOLD'

  function updateThresholdFilter(threshold: number) {
    dispatch({
      type: dispatchThresholdUpdate,
      threshold,
      allRows,
      searchableColumns,
    })
  }

  function handleThresholdSliderChange(
    event: React.ChangeEvent<unknown>,
    value: number | number[]
  ) {
    if (Array.isArray(value)) {
      value = value?.[0]
    }
    if (value !== filterThreshold) {
      updateThresholdFilter(value)
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
    <div className={classes.filterHeaderRoot}>
      <div className={classes.filterHeaderTitle}>
        {type === 'COMPETENCE' ? 'Kompetansefilter' : 'Motivasjonsfilter'}:{' '}
      </div>
      <div className={classes.filterTagsContainer}>
        {filterList.length > 1 && (
          <RemoveAllTag
            onDelete={() =>
              dispatch({ type: dispatchClear, allRows, searchableColumns })
            }
          />
        )}
        {filterList.map((skill) => (
          <Tag
            key={skill}
            label={skill}
            onDelete={() =>
              dispatch({
                type: dispatchRemove,
                filter: skill,
                allRows,
                searchableColumns,
              })
            }
          />
        ))}
      </div>
      <div className={classes.filterThresholdContainer}>
        <label
          htmlFor={`${type}-threshold-slider`}
          className={classes.filterThresholdTitle}
        >
          Terskel:
        </label>
        <Slider
          className={classes.thresholdSlider}
          id={`${type}-threshold-slider`}
          value={filterThreshold}
          step={1}
          valueLabelDisplay="auto"
          marks={thresholdLabels}
          valueLabelFormat={(value) =>
            thresholdLabels.find((mark) => mark.value === value)?.label ?? value
          }
          min={1}
          max={5}
          onChange={handleThresholdSliderChange}
        />
      </div>
    </div>
  )
}
