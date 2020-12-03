import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import SearchBar from '../Navbar/SearchBar';

import Articles from '../Articles/Articles';

function Results({ match: { params } }) {
  const [results, setResults] = useState([]);
  console.log(params);

  useEffect(() => {
    async function getSearchResults() {
      const res = await fetch(`/api/news/search/?search=${params.search}/`);
      const data = await res.json();
      setResults(data.articles);
      console.log(data);
    }
    getSearchResults();
  }, []);

  return (
    <div className="results">
      <Box className="results-display" mt={4} mb={6}>
        <p>
          Displaying results for <strong>{`"${params.search}"`}</strong>
        </p>
        <SearchBar resultsFor={params.search} />
        {/* <Divider /> */}
      </Box>
      <div className="results-articles">
        {results.map((article, index) => (
          <article className="articles" key={index}>
            <Articles article={article} articleSection="bottom" />
          </article>
        ))}
      </div>
    </div>
  );
}

// PropTypes ensures that passed down props adhere to the type checking
Results.propTypes = {
  match: PropTypes.object,
  params: PropTypes.string,
};

export default Results;
