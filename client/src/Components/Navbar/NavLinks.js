import React from 'react';
import { Link } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navItem: {
    marginRight: '1rem',
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      color: fade(theme.palette.common.white, 0.75),
    },
  },
}));

function NavLinks() {
  const classes = useStyles();
  return (
    <span>
      <Link to="/business" className={classes.navItem}>
        Business
      </Link>

      <Link to="/health" className={classes.navItem}>
        Health
      </Link>

      <Link to="/science" className={classes.navItem}>
        Science
      </Link>

      <Link to="/sports" className={classes.navItem}>
        Sports
      </Link>

      <Link to="/entertainment" className={classes.navItem}>
        Entertainment
      </Link>
    </span>
  );
}

export default NavLinks;
