import React from 'react';
import Cookie from 'js-cookie';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import NavDialogBoxContent from './NavbarDialogBox/NavDialogBoxContent';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { cookieStrToObj } from '../../Helpers/functions';
import LoggedInMenu from './NavbarLoggedInMenu/LoggedInMenu';

const useStyles = makeStyles((theme) => ({
  loggedIcon: {
    backgroundColor: '#8D91A4',
    fontSize: '1.3rem',
  },
  accountIcon: {
    '& svg': {
      color: 'white',
    },
  },

  [theme.breakpoints.down('xs')]: {
    loggedIcon: {
      fontSize: '1.2rem',
      height: '35px',
      width: '35px',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function NavAccount() {
  const classes = useStyles();

  // user from cookie
  const cookie = Cookie.get('user');
  const user = cookieStrToObj(cookie);

  // state for logged out dialog menu
  const [open, setOpen] = React.useState(false);

  // state for logged in menu box
  const [anchorEl, setAnchorEl] = React.useState(null);

  //========== dialog menu functions==================
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  // =========logged in menu functions==================
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <span>
      <IconButton
        onClick={user.name ? handleClickMenu : handleOpenDialog}
        className={classes.accountIcon}
      >
        {user.name ? (
          <Avatar className={classes.loggedIcon}>{user.name.charAt(0)}</Avatar>
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      {user.name ? (
        <LoggedInMenu anchorEl={anchorEl} handleCloseMenu={handleCloseMenu} />
      ) : (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth={true}
          maxWidth="sm"
        >
          <NavDialogBoxContent handleClose={handleCloseDialog} />
        </Dialog>
      )}
    </span>
  );
}

export default NavAccount;
