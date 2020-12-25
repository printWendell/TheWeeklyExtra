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

const useStyles = makeStyles(() => ({
  loggedIcon: {
    backgroundColor: '#8D91A4',
  },
  accountIcon: {
    '& svg': {
      color: 'white',
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <span>
      <IconButton onClick={handleClickOpen} className={classes.accountIcon}>
        {user.name ? (
          <Avatar className={classes.loggedIcon}>{user.name.charAt(0)}</Avatar>
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth="sm"
      >
        <NavDialogBoxContent handleClose={handleClose} />
      </Dialog>
    </span>
  );
}

export default NavAccount;
