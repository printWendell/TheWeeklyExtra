import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pagination: {
    textAlign: 'center',
    '& li': {
      paddingLeft: '15px',
      paddingRight: '15px',
    },
    '& li > button': {
      fontSize: '1.2rem',
    },
  },
  [theme.breakpoints.down('md')]: {
    pagination: {
      '& li': {
        paddingLeft: '10px',
        paddingRight: '10px',
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    pagination: {
      '& li': {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
      '& li > button': {
        fontSize: '1rem',
      },
    },
  },
  [theme.breakpoints.down('xs')]: {
    pagination: {
      '& li': {
        paddingLeft: '4px',
        paddingRight: '4px',
        marginLeft: '-13px',
      },
      '& li > button': {
        fontSize: '.8rem',
      },
    },
  },
}));

function ResultsPagination({ page, search, sort }) {
  const classes = useStyles();
  const handleChange = (event, value) => {
    event.preventDefault();
    console.log(value);
    location.assign(
      `/search?search=${search}&page=${value}&sort=${sort || 'relevancy'}`
    );
  };

  return (
    <div>
      <Pagination
        count={5}
        page={page ? parseInt(page) : 1}
        onChange={handleChange}
        className={classes.pagination}
      />
    </div>
  );
}

ResultsPagination.propTypes = {
  page: PropTypes.string,
  search: PropTypes.string,
  sort: PropTypes.string,
};

export default ResultsPagination;
