import React from 'react';
import { Avatar, makeStyles } from '@material-ui/core';
import { ReactComponent as FallbackUserIcon } from '../../../../assets/fallback_user.svg';
import CharacterLimitBox from '../../../../components/CharacterLimitBox';

const useCompetenceMappingStyles = makeStyles({
  root: {
    display: 'flex',
    width: '300px',
    alignItems: 'center',
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

export default function ConsultantCell(cellData: {
  data: { value: string; image: string | undefined };
}) {
  const { data } = cellData;
  const classes = useCompetenceMappingStyles();
  return (
    <div className={classes.root}>
      {data.image ? (
        <Avatar alt={data.value} className={classes.image} src={data.image} />
      ) : (
        <Avatar alt={data.value} className={classes.image}>
          <FallbackUserIcon className={classes.image} />
        </Avatar>
      )}
      <span className={classes.text}>
        <CharacterLimitBox text={data.value} />
      </span>
    </div>
  );
}
