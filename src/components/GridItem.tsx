import React from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Info from './Info';

const useStyles = makeStyles(() =>
  createStyles({
    gridRoot: {
      boxShadow: '0px 4px 10px #00000012',
      borderRadius: '0px 0px 6px 6px',
      overflow: 'hidden',
    },
    gridHeaderRoot: {
      height: '65px',
      backgroundColor: '#E4E1DB',
      paddingLeft: '15px',
      paddingRight: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    bigGridHeaderRoot: {
      height: '102.7px',
    },
    gridHeaderTitle: {
      fontSize: '18px',
      fontWeight: 'normal',
    },
    BigGridHeaderTitle: {
      fontSize: '30px',
      fontWeight: 'normal',
      paddingLeft: '11px',
    },
    gridContentRoot: {
      width: '100%',
      padding: '15px',
      backgroundColor: 'white',
      borderLeft: '1px solid #E4E1DB',
      borderBottom: '1px solid #E4E1DB',
      borderRight: '1px solid #E4E1DB',
      borderRadius: '0px 0px 6px 6px',
    },
    knowitGreen: {
      backgroundColor: '#00897B',
      width: '100%',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '0px',
    }
  })
);

interface GridItemHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode | React.ReactNode[];
  big?: boolean;
  green?: boolean;
}

export function GridItemHeader({
  title,
  description,
  children = null,
  big,
  green = false,
}: GridItemHeaderProps) {
  const classes = useStyles();
  const headerHeight = big ? classes.bigGridHeaderRoot : null;
  const fontSize = big ? classes.BigGridHeaderTitle : null;
  const knowitGreen = green ? classes.knowitGreen : null;

  return (
    <div className={[classes.gridHeaderRoot, headerHeight, knowitGreen].join(' ')}>
      <Grid container direction="row" alignItems="center">
        <h3 className={[classes.gridHeaderTitle, fontSize].join(' ')}>
          {title}
          {big}
        </h3>
        <Info description={description} />
      </Grid>
      {children}
    </div>
  );
}
interface GridItemContentProps {
  children: React.ReactNode | React.ReactNode[];
}

export function GridItemContent({ children }: GridItemContentProps) {
  const classes = useStyles();
  return <div className={classes.gridContentRoot}>{children}</div>;
}

interface GridItemProps {
  fullSize?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export function GridItem({ children, fullSize = false }: GridItemProps) {
  const classes = useStyles();

  return (
    <Grid item xs={fullSize ? 12 : 6}>
      <div className={classes.gridRoot}>{children}</div>
    </Grid>
  );
}
