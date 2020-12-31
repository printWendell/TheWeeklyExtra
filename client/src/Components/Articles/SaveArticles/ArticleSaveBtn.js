/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { cookieStrToObj } from '../../../Helpers/functions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useSnackbar } from 'notistack';

function ArticleSaveBtn({ article }) {
  const cookie = Cookie.get('user');
  let user = cookieStrToObj(cookie);
  let history = useHistory();

  const [saved, setSaved] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  let snackbarMessage = '';

  // remove 't' and 'z' from published date to save to sql
  const articleTime = new Date(article.publishedAt);
  const savedArticleTime = articleTime
    .toISOString()
    .replace('Z', '')
    .replace('T', ' ');

  // post article to save article route
  const saveArticle = (e) => {
    e.preventDefault();
    setSaved(!saved);
    const email = user.email;
    if (saved === false) {
      if (user.email) {
        snackbarMessage = 'Article saved to profile';
        try {
          fetch('/api/articles/save', {
            method: 'POST',
            body: JSON.stringify({
              email,
              author: article.author,
              title: article.title,
              description: article.description,
              published_at: savedArticleTime,
              link_url: article.url,
              img_url: article.urlToImage,
              source: article.source.name,
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
        } catch (error) {
          setSaved(false);
        }
      } else {
        history.push('/login');
      }
    } else if (saved === true) {
      snackbarMessage = 'Article removed from profile';

      // delete article route
      if (user.email) {
        try {
          fetch('/api/articles/delete', {
            method: 'DELETE',
            body: JSON.stringify({
              email,
              link_url: article.url,
            }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  // menu functions
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // snackbar functions
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const OpenSnackbar = (e) => {
    e.preventDefault();
    enqueueSnackbar(
      <div className="article-saveBtn-snackbar">
        <p className="snackbar">
          <CheckCircleIcon className="snackbar-icon" />
          {snackbarMessage}
        </p>
      </div>
    );
  };

  function saveArticleAndOpenSnackBar(e) {
    saveArticle(e);
    if (user.email) {
      OpenSnackbar(e);
    } else {
      history.push('/login');
    }
  }

  return (
    <span>
      <Hidden smDown>
        <IconButton onClick={saveArticleAndOpenSnackBar}>
          {saved ? (
            <BookmarkIcon className="saved articleBtn" />
          ) : (
            <BookmarkBorderIcon className="unsaved articleBtn" />
          )}
        </IconButton>
      </Hidden>

      {/* menu */}
      <Hidden mdUp>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon className="articleBtn article-saveBtn-menu" />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <IconButton onClick={saveArticleAndOpenSnackBar}>
              {saved ? (
                <BookmarkIcon className="saved" />
              ) : (
                <BookmarkBorderIcon className="unsaved " />
              )}
            </IconButton>
          </MenuItem>
        </Menu>
      </Hidden>
    </span>
  );
}

ArticleSaveBtn.propTypes = {
  article: PropTypes.object,
};

export default ArticleSaveBtn;
