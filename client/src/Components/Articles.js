import React from 'react';
import {
  makeStyles,
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

// make text responsive//

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
    color: '#37474f',
  },
  contentImg: {
    width: '15vw',
    minWidth: '220px',
    objectFit: 'cover',
  },
  [theme.breakpoints.down('sm')]: {
    flexToBlock: {
      display: 'block',
    },
  },
  [theme.breakpoints.down('xs')]: {
    articleLink: {
      textAlign: 'center',
    },
    articleText: {
      display: 'none',
    },
  },
}));

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

// =========Component==================== //
function Articles(article) {
  const classes = useStyles();
  // convert utc to string date
  function changeDate(date) {
    const utcDate = new Date(`${date}`);
    return utcDate.toDateString();
  }

  return (
    <>
      <a
        className={`article ${classes.articleLink}`}
        href={article.article.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box className="article-title" mt={3}>
          <ThemeProvider theme={theme}>
            <Typography variant="h5">{article.article.title}</Typography>
          </ThemeProvider>
        </Box>
        <Box className={`article-date ${classes.articleText}`} mt={1} mb={1}>
          <Typography variant="caption" gutterBottom>
            {changeDate(article.article.publishedAt)}
          </Typography>
        </Box>
        <Box
          className={`article-content ${classes.flexToBlock}`}
          display="flex"
          alignItems="center"
          mb={4}
        >
          <Box className="article-content--img" mr={4}>
            <img
              className={classes.contentImg}
              src={article.article.urlToImage}
              alt=""
            />
          </Box>
          <Box
            className={`article-content--description ${classes.articleText}`}
          >
            <ThemeProvider>
              <Typography variant="body1">
                {article.article.description}
              </Typography>
            </ThemeProvider>
          </Box>
        </Box>
        <Divider />
      </a>
    </>
  );
}
export default Articles;
