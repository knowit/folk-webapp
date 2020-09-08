import React from 'react';
import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
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
    gridHeaderTitle: {
      fontSize: '18px',
      fontWeight: 'normal',
    },
    gridContentRoot: {
      width: '100%',
      padding: '20px 15px 15px 15px',
      backgroundColor: 'white',
      borderLeft: '1px solid #E4E1DB',
      borderBottom: '1px solid #E4E1DB',
      borderRight: '1px solid #E4E1DB',
      borderRadius: '0px 0px 6px 6px',
    },
  })
);

interface GridItemHeaderProps {
  title: string;
  children?: React.ReactNode | React.ReactNode[];
}

export function GridItemHeader({
  title,
  children = null,
}: GridItemHeaderProps) {
  const classes = useStyles();

  return (
    <div className={classes.gridHeaderRoot}>
      <h3 className={classes.gridHeaderTitle}>{title}</h3>
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
