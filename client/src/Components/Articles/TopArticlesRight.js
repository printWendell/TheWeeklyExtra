import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

//=======material-ui css styles============//
const useStyles = makeStyles(() => ({
  articleLink: {
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  articleText: {
    width: '20vw',
  },

  [theme.breakpoints.down('md')]: {
    articleLink: {
      width: '100%',
    },
    articleText: {
      width: '100%',
    },
  },
}));

// variable for responsive fonts
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

// =========Component==================== //
function TopArticlesRight(article) {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row">
      <a
        className={`article ${classes.articleLink}`}
        href={article.article.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box className={`article-title ${classes.articleText}`} mt={3}>
          <ThemeProvider theme={theme}>
            <Typography variant="body1">{article.article.title}</Typography>
          </ThemeProvider>
        </Box>
        <Box
          className={`article-date ${classes.articleText}  ${classes.articleDate}`}
          mb={2}
        ></Box>
        <Divider />
      </a>
    </Box>
  );
}

// PropTypes ensures that passed down props adhere to the type checking
TopArticlesRight.propTypes = {
  article: PropTypes.object,
};
export default TopArticlesRight;
