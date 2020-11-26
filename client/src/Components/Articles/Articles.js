import React from 'react';
import PropTypes from 'prop-types';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import './ArticleStyles/Articles.css';

// variable for responsive fonts
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

// change h5 object better responsiveness
theme.typography.h5 = {
  fontSize: '3rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1.1rem',
  },
};

// =========Component==================== //
function Articles({ article, articleSection }) {
  // convert utc to string date
  function changeDate(date) {
    const utcDate = new Date(`${date}`);
    return utcDate.toDateString();
  }
  console.log(articleSection);

  return (
    <Box
      className={
        articleSection === 'bottom'
          ? 'bottom-articles'
          : articleSection === 'middle'
          ? 'middle-articles'
          : articleSection === 'top-left'
          ? 'top-left-articles'
          : 'top-right-articles'
      }
    >
      <a
        className="article-link"
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Box className="article-title" mt={3} mb={2}>
          <ThemeProvider theme={theme}>
            <Typography variant="h5" className="title">
              {article.title}
            </Typography>
          </ThemeProvider>
        </Box>

        <Box className="article-date" mt={1} mb={1}>
          <Typography variant="caption" gutterBottom>
            {changeDate(article.publishedAt)}
          </Typography>
        </Box>

        <Box className="article-content" mb={4}>
          <Box className="article-content--img">
            <img className="content-img" src={article.urlToImage} alt="" />
          </Box>
          <Box className="article-content--description">
            <ThemeProvider>
              <Typography variant="body1">{article.description}</Typography>
            </ThemeProvider>
          </Box>
        </Box>
        <Divider className="divider" />
      </a>
    </Box>
  );
}

// PropTypes ensures that passed down props adhere to the type checking
Articles.propTypes = {
  article: PropTypes.object,
  articleSection: PropTypes.string,
};
export default Articles;
