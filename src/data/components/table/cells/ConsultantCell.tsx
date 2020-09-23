import React from 'react';
import { ReactComponent as FallbackUserIcon } from '../../../../assets/fallback_user.svg';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 15,
  },
});

export default function ConsultantCell({
  data,
}: {
  data: { value: string; image: string | undefined };
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar alt={data.value} className={classes.image} /*src={data.image}*/>
        <FallbackUserIcon className={classes.image} />
      </Avatar>
      <span className={classes.text}>{data.value}</span>
    </div>
  );
}
