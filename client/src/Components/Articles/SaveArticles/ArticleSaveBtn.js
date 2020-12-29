import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { cookieStrToObj } from '../../../Helpers/functions';

function ArticleSaveBtn({ article }) {
  const cookie = Cookie.get('user');
  let user = cookieStrToObj(cookie);
  let history = useHistory();

  const [saved, setSaved] = useState(false);

  // remove 't' and 'z' from published date to save to sql
  const articleTime = new Date(article.publishedAt);
  const savedArticleTime = articleTime
    .toISOString()
    .replace('Z', ' ')
    .replace('T', ' ');

  // post article to save article route
  const getData = (e) => {
    e.preventDefault();
    if (user.email) {
      console.log(article);
      console.log(savedArticleTime);
      setSaved(!saved);
    } else {
      history.push('/login');
    }
  };

  return (
    <span>
      <IconButton onClick={getData}>
        {saved ? (
          <BookmarkIcon className="saved" />
        ) : (
          <BookmarkBorderIcon className="unsaved" />
        )}
      </IconButton>
    </span>
  );
}

ArticleSaveBtn.propTypes = {
  article: PropTypes.object,
};

export default ArticleSaveBtn;
