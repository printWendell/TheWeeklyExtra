import React from 'react';
import { Link } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  //   root: {
  //     flexGrow: 1,
  //   },
  //   navbar: {
  //     background: '#2E3B55',
  //   },
  //   navbarHomeLink: {
  //     color: 'white',
  //     textDecoration: 'none',
  //     '&:hover': {
  //       color: fade(theme.palette.common.white, 0.75),
  //     },
  //   },
  //   menuButton: {
  //     marginRight: theme.spacing(2),
  //   },
  //   navLeft: {
  //     flexGrow: 1,
  //   },
  //   title: {
  //     // flexGrow: 1,
  //     marginRight: '4rem',
  //     color: 'black',
  //   },
  navItem: {
    marginRight: '1rem',
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      color: fade(theme.palette.common.white, 0.75),
    },
  },
  //   search: {
  //     position: 'relative',
  //     borderRadius: theme.shape.borderRadius,
  //     backgroundColor: fade(theme.palette.common.white, 0.15),
  //     '&:hover': {
  //       backgroundColor: fade(theme.palette.common.white, 0.25),
  //     },
  //     marginLeft: 0,
  //     marginRight: '1rem',
  //     width: '100%',
  //     [theme.breakpoints.up('sm')]: {
  //       marginLeft: theme.spacing(1),
  //       width: 'auto',
  //     },
  //   },
  //   searchIcon: {
  //     padding: theme.spacing(0, 2),
  //     height: '100%',
  //     position: 'absolute',
  //     pointerEvents: 'none',
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  //   inputRoot: {
  //     color: 'inherit',
  //   },
  //   inputInput: {
  //     padding: theme.spacing(1, 1, 1, 0),
  //     // vertical padding + font size from searchIcon
  //     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  //     transition: theme.transitions.create('width'),
  //     width: '100%',
  //     [theme.breakpoints.up('sm')]: {
  //       width: '12ch',
  //       '&:focus': {
  //         width: '20ch',
  //       },
  //     },
  //   },
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
