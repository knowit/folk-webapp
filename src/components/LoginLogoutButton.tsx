import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ButtonBase } from '@material-ui/core';
import { useUserInfo } from '../LoginProvider';

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

export const LoginLogoutButton = () => {
  const classes = useStyles();
  const userInfo = useUserInfo();

  let buttonText = '';
  if (userInfo.email == undefined) {
    buttonText = 'Logg inn'
  } else {
    buttonText = 'Logg ut'
  }

  const handleClick = () => {
    if (userInfo.email == undefined) {
      window.location.replace('/auth/login');
    } else {
      window.location.replace('/auth/logout');
    }
  };

  return (
    <ButtonBase
      className={`${classes.buttonItem}`}
      onClick={handleClick}
    >
      {buttonText}
    </ButtonBase>
  );
};


