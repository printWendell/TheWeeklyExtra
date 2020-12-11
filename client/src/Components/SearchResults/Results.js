import React from 'react';
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { Box, Divider } from '@material-ui/core';
import SearchBar from '../Navbar/SearchBar';
const queryString = require('query-string');

import Articles from '../Articles/Articles';
import ResultsPagination from './ResultsPagination';
import SortResults from './SortResults';

function Results() {
  const [results, setResults] = useState([]);

  const query = queryString.parse(location.search);

  useEffect(() => {
    async function getSearchResults() {
      const res = await fetch(
        `/api/news/search/?search=${query.search}&sort=${query.sort}&page=${query.page}`
      );
      const data = await res.json();
      setResults(data.articles);
      console.log(data);
    }
    getSearchResults();
  }, []);

  return (
    <div className="results">
      {/* Helmet Title */}
      <Helmet>
        <title>Search Results: {`'${query.search}'`} | TheWeeklyExtra</title>
        <meta charSet="utf-8" />
      </Helmet>

      <Box className="results-display" mt={4} mb={4}>
        <p>
          Dispaying {(query.page || 1) * 20 - 19} -{20 * (query.page || 1)} out
          of 100 for <strong>{`"${query.search}"`}</strong>
        </p>
        <SearchBar resultsFor={query.search} />
      </Box>

      <SortResults page={query.page} search={query.search} sort={query.sort} />

      <Divider />
      <Box className="results-articles" mb={3}>
        {results.map((article, index) => (
          <article className="articles" key={index}>
            <Articles article={article} articleSection="bottom" />
          </article>
        ))}
      </Box>
      <ResultsPagination
        page={query.page}
        search={query.search}
        sort={query.sort}
      />
    </div>
  );
}

export default Results;
