import React, { Dispatch, useEffect, useState } from 'react';
import { Action } from '../../../DDTable';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';

export type SortOrder = 'none' | 'ascending' | 'descending';

const useSortableHeaderStyles = makeStyles((theme: Theme) =>
  createStyles({
    position: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: '16px',
      height: '100%',
      width: '100%',
      borderBottom: `1px solid ${theme.palette.background.paper}`,
      borderLeft: `1px solid ${theme.palette.background.paper}`,
      padding: 0,
      paddingRight: '15px',
      paddingLeft: '15px',
      cursor: 'pointer',
    },
  })
);


export default function SortableHeaderCell(cellData: {
  title: string;
  dispatch: Dispatch<Action>;
  index: number;
}) {
  const [currentOrder, setCurrentOrder] = useState<SortOrder>('none');
  const classes = useSortableHeaderStyles();


  const sortClick = () => {
    setCurrentOrder(currentOrder  === 'ascending' ? 'descending' : 'ascending');
  };

  useEffect(() => {
    cellData.dispatch({
      type: 'SORT_COLUMN',
      columnIndex: cellData.index,
      sortOrder: currentOrder,
    });
  }, [currentOrder]);

  const sortIcon = () => {
    switch (currentOrder) {
      case 'ascending':
        return <ArrowUpward />;
      case 'descending':
        return <ArrowDownward />;
      case 'none':
      default:
        return null;
    }
  };

  return (
    <div className={classes.position}
      onClick={() => {
        sortClick()
      }}
    >
      { cellData.title }
      { sortIcon() }
    </div>
  );
}
