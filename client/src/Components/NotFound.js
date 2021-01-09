import React from 'react';
import { Box } from '@material-ui/core';
import { Helmet } from 'react-helmet';

function NotFound() {
  return (
    <Box mt={5}>
      {/* Helmet Title */}
      <Helmet>
        <title>404 | Wrong Pages</title>
        <meta charset="utf-8" />
      </Helmet>

      <h1>404</h1>
      <h1>Oops! Turn back bro</h1>
    </Box>
  );
}

export default NotFound;
