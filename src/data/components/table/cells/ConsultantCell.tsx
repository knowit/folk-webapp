import React from 'react';
import { ReactComponent as FallbackUserIcon } from '../../../../assets/fallback_user.svg';
import { Avatar, makeStyles } from '@material-ui/core';
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

export default function ConsultantCell(cellData: {data:{value:string, image:string|undefined}}) {
  const data = cellData.data
  const classes = useCompetenceMappingStyles();
  return (
    <div className={classes.root}>
      {data.image? 
        <Avatar alt={data.value} className={classes.image} src={data.image}></Avatar>
      :
        <Avatar alt={data.value} className={classes.image}>
          <FallbackUserIcon className={classes.image}/>
        </Avatar>
      }
      <span className={classes.text}>
        <CharacterLimitBox text={data.value} />
      </span>
    </div>
  );
}