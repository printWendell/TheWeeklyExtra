import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Cookie from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { cookieStrToObj } from '../../../Helpers/functions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function ArticleSaveBtn({ article }) {
  const cookie = Cookie.get('user');
  let user = cookieStrToObj(cookie);
  let history = useHistory();

  const [saved, setSaved] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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

  // menu functions
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <span>
      <Hidden smDown>
        <IconButton onClick={getData}>
          {saved ? (
            <BookmarkIcon className=" saved articleBtn" />
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
            <IconButton onClick={getData}>
              {saved ? (
                <BookmarkIcon className="saved " />
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
