import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ButtonBase } from '@material-ui/core';

const useStyles = makeStyles( () =>
  createStyles({
    buttonItem: {
      fontSize: '15px',
      fontWeight: 'bold',
      color: '#F1F0ED',
      paddingLeft: '13.75px',
      paddingRight: '13.75px',
      marginLeft: '13.75px',
      marginRight: '13.75px',
      height: 'inherit',
    },
  })
);

export const LogoutButton = () =>{
  const classes = useStyles();
  const handleLogout = () => {
    window.location.replace('/auth/logout');
  };

  return (
    <ButtonBase
      className={`${classes.buttonItem}`}
      onClick={handleLogout}
    >
      Logg ut
    </ButtonBase>
  );
};


