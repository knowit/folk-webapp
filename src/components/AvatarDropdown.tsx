/* AvatarDropdown is a dropdown menu on the Avatar icon.
    As of 25.10.21, the only functionality that would be present in the dropdown menu
    is the logout/login functionality. An avatar dropdown menu with only one item in
    it is not a great design, therefore we opt for using the LoginLogoutButton
    instead. Since Profile, Shopping Cart, Settings, and similar functionalities may
    be added in the future, this file remains here for the time being.
 */
/*
import { Avatar, Box, Fade, IconButton, ListItemIcon, Menu, MenuItem } from '@material-ui/core';
import { ReactComponent as FallbackUserIcon } from '../assets/fallback_user.svg';
import { ExitToApp, PersonOutline, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import { useUserInfo } from '../LoginProvider';
import { createStyles, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() =>
  createStyles({
    userAvatar: {
      height: '40px',
    },
  })
);

export const AvatarDropdown = () => {
  const classes = useStyles();
  const userInfo = useUserInfo();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let buttonText = '';
  if (userInfo.email == undefined) {
    buttonText = 'Logg inn'
  } else {
    buttonText = 'Logg ut'
  }

  const handleLoginLogoutClick = () => {
    if (userInfo.email == undefined) {
      window.location.replace('/auth/login');
    } else {
      window.location.replace('/auth/logout');
    }
  };


  return(
    <React.Fragment>
      <Box>
        <IconButton onClick={handleClick}>
          <Avatar
            alt={userInfo.name}
            src={userInfo.picture}
            className={classes.userAvatar}
          >
            <FallbackUserIcon />
          </Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{elevation:0,
          style: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            marginTop: 1.5,
          },
        }}
        getContentAnchorEl={null}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClick} >
          <ListItemIcon style={{minWidth: '0',marginRight: '15px'}}>
            <PersonOutline fontSize={"small"}/>
          </ListItemIcon>
          Profil
        </MenuItem>
        <MenuItem onClick={handleClick} >
          <ListItemIcon style={{minWidth: '0',marginRight: '15px'}}>
            <ShoppingCartOutlined fontSize={"small"}/>
          </ListItemIcon>
          Hadlevogn
        </MenuItem>
        <MenuItem onClick={handleLoginLogoutClick} >
          <ListItemIcon style={{minWidth: '0',marginRight: '15px'}}>
            <ExitToApp fontSize={"small"}/>
          </ListItemIcon>
          {buttonText}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

 */
