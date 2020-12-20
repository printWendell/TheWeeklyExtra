import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import NavDialogBoxContent from './NavbarDialogBox/NavDialogBoxContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
        <AccountCircle />
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
