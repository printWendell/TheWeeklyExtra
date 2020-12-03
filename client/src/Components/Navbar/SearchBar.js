import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: '1rem',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  searchColor: {
    backgroundColor: '#e7edf7',
    borderRadius: '5px',
    color: '#171d23',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
}));

// resultsFor props come from Results.js
function SearchBar({ resultsFor }) {
  const classes = useStyles();

  const [search, setSearch] = useState();

  function handleFormChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function searchNews(e) {
    e.preventDefault();
    window.location.assign(`/search/${search}/`);
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <form
        onSubmit={searchNews}
        className={resultsFor ? classes.searchColor : null}
      >
        <InputBase
          // check if there is a search query to place as placeholder
          placeholder={resultsFor ? resultsFor : 'Search...'}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleFormChange}
        />
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  // resultsFor: PropTypes.object,
  resultsFor: PropTypes.string,
};

export default SearchBar;
