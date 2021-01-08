import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import NavAccount from './NavAccount';
import NavBurgerMenu from './NavBurgerMenu';

import Logo from '../../images/TheWeeklyExtraLogo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    background: '#2E3B55',
  },
  navbarHomeLink: {
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      color: fade(theme.palette.common.white, 0.75),
    },
  },
  navLeft: {
    flexGrow: 1,
  },
  title: {
    marginRight: '4rem',
    color: 'black',
  },
  navbar_logo: {
    width: '118px',
  },
  navItem: {
    marginRight: '1rem',
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      color: fade(theme.palette.common.white, 0.75),
    },
  },
  [theme.breakpoints.down('md')]: {
    navbar_logo: {
      width: '85px',
    },
  },
  [theme.breakpoints.down('xs')]: {
    title: {
      marginRight: '1rem',
    },
    navbar_logo: {
      width: '65px',
    },
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" className={classes.navbar}>
        <Container>
          <Toolbar>
            <div className={classes.navLeft}>
              <Hidden mdUp>
                <NavBurgerMenu />
              </Hidden>

              {/* temporary logo */}
              <Button color="inherit" className={classes.title}>
                <Link to="/" className={classes.navbarHomeLink}>
                  <img
                    src={Logo}
                    alt="theweeklyextra-logo"
                    className={classes.navbar_logo}
                  />
                </Link>
              </Button>

              <Hidden smDown>
                <NavLinks />
              </Hidden>
            </div>

            <Hidden smDown>
              <SearchBar />
            </Hidden>

            <NavAccount />
          </Toolbar>
        </Container>
      </AppBar>
      {/* for now keep this */}
      <Toolbar />
    </div>
  );
}

export default Navbar;
