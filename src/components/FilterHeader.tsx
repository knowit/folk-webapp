import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { ChangeEvent, Dispatch, FormEvent } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Action } from '../data/DDTable';
import { Slider } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    gridHeaderRoot: {
      minHeight: '55.3px',
      backgroundColor: '#ffffff',
      borderBottom: 'solid 1px #e0ded7',
      padding: '0px 15px 0px 15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'left',
      flexWrap: 'wrap',
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
    thresholdContainer: {
      display: 'flex',
      width: '450px',
      justifyContents: 'flex-start',
      alignItems: 'center',
      gap: '20px',
      '& > :last-child': {
        flexBasis: '50px',
      },
    },
  })
);

const Tag = ({ label, onDelete }: { label: string; onDelete: () => void }) => {
  const classes = useStyles();
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
  );
};

const RemoveAllTag = (onDelete: { onDelete: () => void }) => {
  const classes = useStyles();
  return (
    <div
      className={[classes.tag, classes.removeAllTag].join(' ')}
      onClick={onDelete.onDelete}
    >
      <CloseIcon />
      <span>Fjern alle</span>
    </div>
  );
};

export function FilterHeader({
  filterList,
  filterThreshold,
  dispatch,
  allRows,
  searchableColumns,
  type,
}: {
  filterList: string[];
  filterThreshold: number;
  dispatch: Dispatch<Action>;
  allRows: any[];
  searchableColumns: [string, number][];
  type: 'COMPETENCE' | 'MOTIVATION';
}) {
  const classes = useStyles();
  const dispatchRemove =
    type === 'COMPETENCE'
      ? 'REMOVE_FROM_COMPETENCE_FILTER'
      : 'REMOVE_FROM_MOTIVATION_FILTER';
  const dispatchClear =
    type === 'COMPETENCE'
      ? 'CLEAR_COMPETENCE_FILTER'
      : 'CLEAR_MOTIVATION_FILTER';
  const dispatchThresholdUpdate =
    type === 'COMPETENCE'
      ? 'UPDATE_COMPETENCE_THRESHOLD'
      : 'UPDATE_MOTIVATION_THRESHOLD';

  const updateThresholdFilter = (threshold: number) => {
    dispatch({
      type: dispatchThresholdUpdate,
      threshold,
      allRows,
      searchableColumns,
    });
  };

  function handleThresholdSliderChange(
    event: React.ChangeEvent<unknown>,
    value: number | number[]
  ) {
    if (Array.isArray(value)) {
      value = value?.[0];
    }
    if (value !== filterThreshold) {
      updateThresholdFilter(value);
    }
  }

  function handleThresholdInputChange(event: FormEvent<HTMLInputElement>) {
    const value = Number(event.currentTarget.value);
    console.log(value);
    // // if (value === 0) {
    // //   event.preventDefault();
    // // }
    if (value !== filterThreshold) {
      updateThresholdFilter(value);
    }
  }

  return (
    <div className={classes.gridHeaderRoot}>
      <b>
        {type === 'COMPETENCE' ? 'Kompetansefilter' : 'Motivasjonsfilter'}:{' '}
      </b>
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
      <div className={classes.thresholdContainer}>
        <b>Terskel:</b>
        <Slider
          value={filterThreshold}
          // getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-custom"
          step={1}
          valueLabelDisplay="auto"
          // marks={marks}
          min={1}
          max={5}
          onChange={handleThresholdSliderChange}
        />
        <input
          type="number"
          name="number"
          id="number"
          min="1"
          max="5"
          value={filterThreshold}
          onChange={handleThresholdInputChange}
        />
      </div>
    </div>
  );
}
