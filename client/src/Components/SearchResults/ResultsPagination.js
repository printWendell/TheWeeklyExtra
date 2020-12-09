import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pagination: {
    textAlign: 'center',
    '& li': {
      padding: '10px',
    },
    '& li > button': {
      fontSize: '1rem',
    },
  },
  [theme.breakpoints.down('md')]: {
    pagination: {
      '& li': {
        padding: '7px',
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    pagination: {
      '& li': {
        padding: '5px',
        marginLeft: '-10px',
      },
      '& li > button': {
        fontSize: '.9rem',
      },
    },
  },
  [theme.breakpoints.down('xs')]: {
    pagination: {
      '& li': {
        padding: '2px',
        marginLeft: '-10px',
      },
      '& li > button': {
        fontSize: '.7rem',
      },
    },
  },
}));

function ResultsPagination({ page, search }) {
  const classes = useStyles();
  const handleChange = (event, value) => {
    event.preventDefault();
    console.log(value);
    location.assign(`/search?search=${search}&page=${value}`);
  };

  return (
    <div>
      <Pagination
        count={10}
        page={page ? parseInt(page) : 1}
        onChange={handleChange}
        className={classes.pagination}
      />
    </div>
  );
}

ResultsPagination.propTypes = {
  // query: PropTypes.object,
  page: PropTypes.string,
  search: PropTypes.string,
};

export default ResultsPagination;
