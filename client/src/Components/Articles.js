import React from 'react';

function Articles(article) {
  // convert utc to string date
  function changeDate(date) {
    const utcDate = new Date(`${date}`);
    return utcDate.toDateString();
  }
  return (
    <article>
      <a href={article.article.url} target="_blank" rel="noopener noreferrer">
        <div className="article-title">
          <h3>{article.article.title}</h3>
        </div>
        <div className="article-date">
          <p>{changeDate(article.article.publishedAt)}</p>
        </div>
        <div className="article-content">
          <div className="article-content--img">
            <img src={article.article.urlToImage} alt="" />
          </div>
          <p className="article-content--description">
            {article.article.description}
          </p>
        </div>
      </a>
    </article>
  );
}
export default Articles;
