import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Cookie from 'js-cookie';
import { cookieStrToObj } from '../../../Helpers/functions';
import { Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  profileHeader: {
    marginTop: '-8px',
    backgroundColor: '#2E3B55',
    color: 'white',
  },
  loggedIcon: {
    backgroundColor: '#8D91A4',
    fontSize: '1.7rem',
    padding: '.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  profileMenuLink: {
    textDecoration: 'none',
  },
  menuLinkItem: {
    color: 'black',
    marginBottom: '6px',
    padding: '1rem 3.5rem',
    '&:hover': {
      borderLeft: '7px solid #3f51b5',
      paddingLeft: '3.06rem',
    },
  },
}));

function LoggedInMenu(props) {
  const classes = useStyles();
  const cookie = Cookie.get('user');
  const user = cookieStrToObj(cookie);

  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.handleCloseMenu}
        className="profile"
      >
        <Box
          textAlign="center"
          mb={2}
          pt={3}
          pb={2}
          className={classes.profileHeader}
        >
          <Avatar className={classes.loggedIcon}>{user.name.charAt(0)}</Avatar>
          <h3>{user.name}</h3>
        </Box>
        <Link to="/profile" className={classes.profileMenuLink}>
          <MenuItem className={classes.menuLinkItem}>
            <PersonIcon />
            Profile
          </MenuItem>
        </Link>
        <MenuItem className={classes.menuLinkItem}>
          <ExitToAppIcon />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

LoggedInMenu.propTypes = {
  anchorEl: PropTypes.string,
  handleCloseMenu: PropTypes.func,
};

export default LoggedInMenu;
