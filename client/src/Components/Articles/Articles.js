import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
// import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import './ArticleStyles/Articles.css';
import ArticleSaveBtn from './SaveArticles/ArticleSaveBtn';

// =========Component==================== //
function Articles({ article, articleSection, fromProfile }) {
  // convert utc to string date
  function changeDate(date) {
    const utcDate = new Date(`${date}`);
    return utcDate.toDateString();
  }

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
            <h2>
              {article.title}{' '}
              {/* if articles are siplayed from the profile page dont display saveBtn */}
              {fromProfile === 'yes' ? (
                ''
              ) : (
                <span className="article-saveBtn">
                  <ArticleSaveBtn article={article} />
                </span>
              )}
            </h2>
          ) : (
            <h3>
              {article.title}{' '}
              {/* if articles are siplayed from the profile page dont display saveBtn */}
              {fromProfile === 'yes' ? (
                ''
              ) : (
                <span className="article-saveBtn">
                  <ArticleSaveBtn article={article} />
                </span>
              )}
            </h3>
          )}
        </Box>

        <Box className="article-date" mt={1} mb={1}>
          <small>{changeDate(article.publishedAt)} </small>
        </Box>

        <Box className="article-content">
          <Box className="article-content--img">
            <img
              className="content-img"
              src={article.urlToImage}
              alt=""
              loading="lazy"
            />
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
  fromProfile: PropTypes.string,
};
export default Articles;
