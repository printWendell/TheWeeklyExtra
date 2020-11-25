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
const useStyles = makeStyles((theme) => ({
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
  articleDate: {
    color: '#37474f',
  },
  contentImg: {
    height: '28vh',
    minWidth: '320px',
    width: '20vw',
    objectFit: 'cover',
  },
  [theme.breakpoints.down('md')]: {
    articleText: {
      width: '25vw',
    },
    contentImg: {
      minWidth: '220px',
      width: '28vw',
      objectFit: 'cover',
    },
  },
  [theme.breakpoints.down('sm')]: {
    articleLink: {
      textAlign: 'center',
    },
    articleText: {
      width: '100%',
    },
    flexToBlock: {
      display: 'block',
    },
    contentImg: {
      display: 'block',
      width: '70%',
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '3rem',
    },
  },
  [theme.breakpoints.down('xs')]: {
    articleLink: {
      textAlign: 'center',
    },
    articleText: {
      width: '100%',
      marginBottom: '2rem',
    },
    articleDate: {
      display: 'none',
    },
    contentImg: {
      marginTop: '1.2rem',
      width: '100%',
    },
  },
}));

// variable for responsive fonts
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

// =========Component==================== //
function MiddleArticles(article) {
  const classes = useStyles();
  // convert utc to string date
  function changeDate(date) {
    const utcDate = new Date(`${date}`);
    return utcDate.toDateString();
  }

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
        <Box className={`article-title ${classes.articleText}`} mt={3}>
          <ThemeProvider theme={theme}>
            <Typography variant="h6">{article.article.title}</Typography>
          </ThemeProvider>
        </Box>
        <Box
          className={`article-date ${classes.articleText}  ${classes.articleDate}`}
          mb={6}
        >
          <Typography variant="caption" gutterBottom>
            {changeDate(article.article.publishedAt)}
          </Typography>
        </Box>
      </a>
    </Box>
  );
}

// PropTypes ensures that passed down props adhere to the type checking
MiddleArticles.propTypes = {
  article: PropTypes.object,
};
export default MiddleArticles;
