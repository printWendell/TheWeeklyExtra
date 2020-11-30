import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import './ArticleStyles/Articles.css';

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
          {articleSection === 'top-left' ? (
            <h2>{article.title}</h2>
          ) : (
            <h3>{article.title}</h3>
          )}
        </Box>

        <Box className="article-date" mt={1} mb={1}>
          <small>{changeDate(article.publishedAt)}</small>
        </Box>

        <Box className="article-content">
          <Box className="article-content--img">
            <img className="content-img" src={article.urlToImage} alt="" />
          </Box>
          <Box className="article-content--description">
            <p>{article.description}</p>
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
