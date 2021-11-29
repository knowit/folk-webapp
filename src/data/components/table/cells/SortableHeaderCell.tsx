import React, { Dispatch, useEffect, useState } from 'react';
import { Action } from '../../../DDTable';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';

export enum SORT_ORDER {
    None,
    Ascending,
    Descending,
}

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
    },
  })
);


export default function SortableHeaderCell(cellData: {
  title: string;
  dispatch: Dispatch<Action>;
  index: number;
}) {
  const [currentOrder, setCurrentOrder] = useState(SORT_ORDER.None);
  const [sortIcon, setSortIcon] = useState<React.ReactElement<SvgIconProps>>();

  const classes = useSortableHeaderStyles();

  const nextOrder = (currentOrder: SORT_ORDER) => {
    switch (currentOrder) {
      case SORT_ORDER.Descending:
        setSortIcon(<ArrowUpward />);
        return SORT_ORDER.Ascending;
      case SORT_ORDER.Ascending:
      default:
        setSortIcon(<ArrowDownward />);
        return SORT_ORDER.Descending;
    }
  };

  const sortClick = () => {
    setCurrentOrder(nextOrder(currentOrder));
  };

  useEffect(() => {
    cellData.dispatch({
      type: 'SORT_COLUMN',
      columnIndex: cellData.index,
      sortOrder: currentOrder,
    });
  }, [currentOrder]);


  return (
    <div className={classes.position}
      onClick={() => {
        sortClick()
      }}
    >
      { cellData.title }
      { sortIcon }
    </div>
  );
}
