import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Divider, Drawer } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
  menu: {
    background: '#2E3B55',
    color: 'white',
    paddingTop: '2rem',
    paddingBottom: '1.5rem',
    width: '100%',
  },

  menuClose: {
    marginBottom: '1.6rem',
    marginLeft: '5%',
    '&:hover': {
      color: fade(theme.palette.error.light, 0.75),
      cursor: 'pointer',
    },
    width: '10%',
  },

  menuItem: {
    margin: 'auto',
    width: '80%',
  },

  menuItemHeader: {
    textAlign: 'center',
  },

  menuItemSearch: {
    marginBottom: '2rem',
  },

  menuItemLink: {
    textDecoration: 'none',
  },

  linkTitle: {
    color: 'white',
    fontSize: '.8rem',
    '&:hover': {
      color: fade(theme.palette.error.light, 0.75),
    },
  },

  menuButton: {
    marginRight: theme.spacing(1),
  },
}));

function NavBurgerMenu() {
  const classes = useStyles();

  const [state, setState] = useState({ top: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ [anchor]: open });
  };

  // list of links
  const navLinks = [
    { title: `Home`, path: '/' },
    { title: `Business`, path: `/business` },
    { title: `Health`, path: `/health` },
    { title: `Science`, path: `/science` },
    { title: `Sports`, path: `/sports` },
    { title: `Entertainment`, path: `/entertainment` },
  ];

  const Menulist = (anchor) => (
    <div
      className={classes.menu}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.menuClose}>
        <CloseIcon />
      </div>
      <div component="nav" className={classes.menuItem}>
        <div className={classes.menuItemSearch}>
          <SearchBar />
        </div>
        <h2 className={classes.menuItemHeader}>Sections</h2>
        <Divider />
        {navLinks.map(({ title, path }) => (
          <Link to={path} key={title} className={classes.menuItemLink}>
            <p className={classes.linkTitle}>{title}</p>
            <Divider />
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer('top', true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="top"
        open={state.top}
        onOpen={toggleDrawer('top', true)}
        onClose={toggleDrawer('top', false)}
      >
        {Menulist('top')}
      </Drawer>
    </React.Fragment>
  );
}

export default NavBurgerMenu;
