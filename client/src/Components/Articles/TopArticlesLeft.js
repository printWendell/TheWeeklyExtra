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

//=======material-ui css styles============//
const useStyles = makeStyles(() => ({
  articleLink: {
    backgroundColor: 'black',
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  articleText: {
    width: '90%',
  },
  articleDate: {
    color: '#37474f',
  },
  contentImg: {
    height: '100%',
    minWidth: '307px',
    width: '100%',
    objectFit: 'cover',
  },
}));

// variable for responsive fonts
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

// change h5 object better responsiveness

// =========Component==================== //
function TopArticlesLeft(article) {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row">
      <a
        className={`article ${classes.articleLink}`}
        href={article.article.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box
          className={`article-content ${classes.flexToBlock}`}
          display="flex"
          alignItems="center"
          mb={4}
        >
          <Box className="article-content--img">
            <img
              className={classes.contentImg}
              src={article.article.urlToImage}
              alt=""
            />
          </Box>
        </Box>
        <Box
          className={`article-title ${classes.articleText}`}
          mt={3}
          ml={3}
          pb={4}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="h5">{article.article.title}</Typography>
          </ThemeProvider>
        </Box>
      </a>
    </Box>
  );
}

// PropTypes ensures that passed down props adhere to the type checking
TopArticlesLeft.propTypes = {
  article: PropTypes.object,
};
export default TopArticlesLeft;
