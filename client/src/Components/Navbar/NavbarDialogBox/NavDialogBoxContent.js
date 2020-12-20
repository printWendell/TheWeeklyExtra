import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import NavDialogForms from './NavDialogForms';
import { makeStyles } from '@material-ui/core/styles';
import { fade, Box } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    backgroundColor: '#2E3B55',
    color: 'white',
  },
  title: {
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
  },
  dialogClose: {
    color: 'white',
    fontSize: '25px',
    marginBottom: '-1rem',
    '&:hover': {
      color: fade(theme.palette.error.light, 0.85),
      cursor: 'pointer',
    },
    '& svg': {
      fontSize: 'calc(1rem + 1vw)',
    },
  },
  accountIcon: {
    marginBottom: '-1rem',
    '& svg': {
      fontSize: 'calc(1rem + 1.7vw)',
      maxWidth: '3rem',
    },
  },
  dialogContent: {
    color: 'black',
    textAlign: 'center',
  },
  dialogText: {
    color: 'black',
  },
  dialogTextLink: {
    color: '#2E3B55',
    textDecoration: 'none',
    '&:hover': {
      color: fade(theme.palette.error.light, 0.85),
    },
  },
  [theme.breakpoints.down('xs')]: {
    dialogClose: {
      marginBottom: '-2rem',
    },
    dialogText: {
      fontSize: 'calc(.6rem + .7vw)',
    },
  },
}));

function NavDialogBoxContent(props) {
  const classes = useStyles();
  return (
    <Box className={classes.dialog}>
      <Box className={classes.dialogTitle}>
        <Box ml={1}>
          <IconButton
            onClick={() => props.handleClose()}
            className={classes.dialogClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box textAlign="center">
          <DialogTitle id="alert-dialog-slide-title">
            <Hidden xsDown>
              <div className={classes.accountIcon}>
                <AccountCircle fontSize="large" />
              </div>
            </Hidden>
            <div className={classes.title}>
              <h2>Login</h2>
            </div>
          </DialogTitle>
        </Box>
      </Box>
      <Box className={classes.dialogContent}>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Box mb={4} mt={2} className={classes.dialogText}>
              New To TheWeeklyExtra?{' '}
              <Link
                to="/register"
                onClick={() => props.handleClose()}
                className={classes.dialogTextLink}
              >
                Sign Up!
              </Link>
            </Box>

            <NavDialogForms />
          </DialogContentText>
        </DialogContent>
      </Box>
    </Box>
  );
}

NavDialogBoxContent.propTypes = {
  handleClose: PropTypes.func,
};

export default NavDialogBoxContent;
