import React, { Dispatch, useState } from 'react';
import { IconButton } from '@material-ui/core';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import SortIcon from '@material-ui/icons/Sort';
import { Action } from '../../../DDTable';

enum SORT_ORDER {
    None,
    Ascending,
    Descending,
}


export default function SortableHeaderCell(cellData: {
  title: string;
  dispatch: Dispatch<Action>;
  id: number;
}) {
  const [currentOrder, setCurrentOrder] = useState(SORT_ORDER.None);
  const [sortIcon, setSortIcon] = useState(<SortIcon/>);

  const nextOrder = (currentOrder: SORT_ORDER) => {
    switch (currentOrder) {
      case SORT_ORDER.None:
        setSortIcon(<SortByAlphaIcon />);
        return SORT_ORDER.Ascending;
      case SORT_ORDER.Ascending:
        setSortIcon(<SortIcon />);
        return SORT_ORDER.Descending;
      case SORT_ORDER.Descending:
        setSortIcon(<div>lol</div>);
        return SORT_ORDER.None;
      default:
        return SORT_ORDER.None;
    }
  };

  const sortClick = () => {
    setCurrentOrder(nextOrder(currentOrder));
    console.log(currentOrder)
    cellData.dispatch({
      type: 'SORT_COLUMN',
      columnId: cellData.id,
      sortOrder: currentOrder,
    });
  };

  return (
    <IconButton
      style={{backgroundColor: 'transparent'}}
      disableRipple
      onClick={() => {
        sortClick()
      }}
    >
      { cellData.title }
      { sortIcon }
    </IconButton>
  );
}
