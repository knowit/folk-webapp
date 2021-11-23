import React from 'react';
import { IconButton } from '@material-ui/core';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import SortIcon from '@material-ui/icons/Sort';


export default function SortableHeaderCell({ title,
                                             ascending,
                                             sortHandler}: {
  title: string;
  ascending: boolean;
  sortHandler: (event: React.ChangeEventHandler) => void;
}) {
  return (
    <div>
      {title}
      <IconButton onClick={() => sortHandler}>
        {ascending ? <SortIcon /> : <SortByAlphaIcon/>}
      </IconButton>
    </div>
  );
}
