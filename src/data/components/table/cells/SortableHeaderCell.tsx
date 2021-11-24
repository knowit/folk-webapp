import React, { Dispatch, useEffect, useState } from 'react';
import { Action } from '../../../DDTable';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

export enum SORT_ORDER {
    None,
    Ascending,
    Descending,
}


export default function SortableHeaderCell(cellData: {
  title: string;
  dispatch: Dispatch<Action>;
  index: number;
}) {
  const [currentOrder, setCurrentOrder] = useState(SORT_ORDER.None);
  const [sortIcon, setSortIcon] = useState<React.ReactElement<SvgIconProps>>();

  const nextOrder = (currentOrder: SORT_ORDER) => {
    switch (currentOrder) {
      case SORT_ORDER.Descending:
        setSortIcon(<ArrowDownward />);
        return SORT_ORDER.Ascending;
      case SORT_ORDER.Ascending:
      default:
        setSortIcon(<ArrowUpward />);
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
    <div
      onClick={() => {
        sortClick()
      }}
    >
      { cellData.title }
      { sortIcon }
    </div>
  );
}
