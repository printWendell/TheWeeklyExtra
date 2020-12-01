import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import NavAccount from './NavAccount';
import NavBurgerMenu from './NavBurgerMenu';

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
  navItem: {
    marginRight: '1rem',
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      color: fade(theme.palette.common.white, 0.75),
    },
  },
  [theme.breakpoints.down('xs')]: {
    title: {
      marginRight: '1rem',
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
                  <Typography variant="h5">WX</Typography>
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
