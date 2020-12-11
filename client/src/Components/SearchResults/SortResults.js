import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  selectBox: {
    width: '100%',
  },
  selectText: {
    marginTop: '4px',
    marginRight: '8px',
  },
  selectform: {
    marginBottom: '10px',
  },
  selectList: {
    backgroundColor: 'none',
  },
  selectListItem: {
    color: '#2E3B55',
  },
}));

function SortResults({ page, search, sort }) {
  const classes = useStyles();
  const handleChange = (event) => {
    location.assign(
      `/search?search=${search}&page=${page || 1}&sort=${event.target.value}`
    );
  };
  return (
    <Box
      mb={2}
      display="flex"
      alignItems="center"
      className={classes.selectBox}
    >
      <p className={classes.selectText}>Sort By: </p>
      <FormControl className={classes.selectform}>
        <Select
          value={sort || 'relevancy'}
          onChange={handleChange}
          displayEmpty
          className={classes.selectList}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="relevancy" className={classes.selectListItem}>
            relevancy
          </MenuItem>
          <MenuItem value="latest" className={classes.selectListItem}>
            latest
          </MenuItem>
          <MenuItem value="popular" className={classes.selectListItem}>
            popular
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

SortResults.propTypes = {
  page: PropTypes.string,
  search: PropTypes.string,
  sort: PropTypes.string,
};

export default SortResults;
