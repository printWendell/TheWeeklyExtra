import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';
import {
  cookieStrToObj,
  getSavedArticles,
  deleteSavedArticles,
} from '../../Helpers/functions';
import Articles from '../Articles/Articles';
import { Avatar, Box, Divider, IconButton } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  profileUser: {
    background: 'linear-gradient(to bottom, #8D91A4, #8D91A4 50%, white 50%)',
    border: 'solid 1px #bdbdbd',
    borderRadius: '5px',
    padding: '3rem',
  },
  profileUser_Icon: {
    marginRight: '3rem',
  },
  userIcon: {
    backgroundColor: '#2E3B55',
    width: theme.spacing(15),
    height: theme.spacing(15),
    fontSize: theme.spacing(8),
  },
  gridButton_delete: {
    color: fade(theme.palette.error.light, 0.75),
    '&:hover': {
      color: fade(theme.palette.error.dark, 0.75),
    },
  },
  [theme.breakpoints.down('xs')]: {
    profileUser: {
      background: 'linear-gradient(to bottom, #8D91A4, #8D91A4 60%, white 40%)',
      display: 'block',
    },
    profileUser_Icon: {
      marginRight: '0',
    },
    userIcon: {
      width: theme.spacing(11),
      height: theme.spacing(11),
      fontSize: theme.spacing(6),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    profileUser_Info: {
      textAlign: 'center',
      '& h1': {
        fontSize: theme.spacing(3),
      },
      '& p': {
        marginTop: '1.5rem',
        fontSize: theme.spacing(1.7),
      },
    },
    profileArticles_Header: {
      textAlign: 'center',
      '& h2': {
        fontSize: theme.spacing(2.3),
      },
    },
    profileAricles_Grid: {
      flexDirection: 'column-reverse',
    },
    gridButton: {
      textAlign: 'center',
      marginTop: '1rem',
    },
  },
}));

function Profile() {
  const classes = useStyles();
  const cookie = Cookie.get('user');
  const { enqueueSnackbar } = useSnackbar();
  let user = cookieStrToObj(cookie);
  if (!user.email) return <Redirect to="/login" />;

  let snackbarMessage = '';

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getSavedArticles().then((data) => setArticles(data));
  }, []);

  // profile functions
  function deleteArticle(email, url) {
    try {
      deleteSavedArticles(email, url);
      let newArticleList = articles.filter(
        (article) => article.link_url !== url
      );
      setArticles(newArticleList);
      snackbarMessage = 'Article deleted from Profile';
    } catch (error) {
      console.log(error);
      snackbarMessage = 'Failed to delete from Profile';
    }
  }

  const handleSnackBar = () => {
    enqueueSnackbar(
      <div className="article-deleteBtn-snackbar">
        <p className="snackbar">
          <CheckCircleIcon className="snackbar-icon" />
          {snackbarMessage}
        </p>
      </div>
    );
  };

  // handle delete function and snackbar
  const deleteArticleAndOpenSnackBar = (email, url) => {
    deleteArticle(email, url);
    handleSnackBar();
  };

  return (
    <Box className="profile" mt={5}>
      <Box
        className={`profile-user, ${classes.profileUser}`}
        display="flex"
        flexDirection="row"
        mb={5}
      >
        <Box className={`profile-user--icon, ${classes.profileUser_Icon}`}>
          <Avatar className={`user--icon, ${classes.userIcon}`}>
            {user.name.charAt(0)}
          </Avatar>
        </Box>
        <Box className={`profile-user--info, ${classes.profileUser_Info}`}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>{articles.length} Saved Articles</p>
        </Box>
      </Box>
      <main className="profile-articles">
        <Box
          mb={2}
          className={`profile-articles--header, ${classes.profileArticles_Header}`}
        >
          <h2>Your Articles</h2>
          <Divider />
        </Box>

        {articles.map((article, index) => (
          <article
            key={index}
            className={`profile-articles--article, ${classes.profileArticles_Article}`}
          >
            {/* saved article key names doesnt match article keys from news api */}
            {/* use grid instead of flex to avoid weird width issues */}
            <Grid
              container
              className={`profile-articles--grid ${classes.profileAricles_Grid}`}
            >
              <Grid item xs={12} sm={11} className="grid-article">
                <Articles
                  article={{
                    author: article.author,
                    title: article.title,
                    description: article.description,
                    publishedAt: article.published_at,
                    source: article.source,
                    url: article.link_url,
                    urlToImage: article.img_url,
                  }}
                  fromProfile="yes"
                  articleSection="bottom"
                  className={`article ${classes.article}`}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={1}
                className={`grid-button ${classes.gridButton}`}
              >
                <IconButton
                  className={`grid-button--delete ${classes.gridButton_delete}`}
                  onClick={() => {
                    deleteArticleAndOpenSnackBar(user.email, article.link_url);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </article>
        ))}
      </main>
    </Box>
  );
}

export default Profile;
