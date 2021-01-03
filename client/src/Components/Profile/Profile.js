import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';
import { cookieStrToObj, getSavedArticles } from '../../Helpers/functions';
import Articles from '../Articles/Articles';
import { Avatar, Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  profileUser: {
    background: 'linear-gradient(to bottom, #8D91A4, #8D91A4 50%, white 50%)',
    border: 'solid 1px #bdbdbd',
    borderRadius: '5px',
    padding: '3rem',
  },
  profileUserIcon: {
    marginRight: '3rem',
  },
  userIcon: {
    backgroundColor: '#2E3B55',
    width: theme.spacing(15),
    height: theme.spacing(15),
    fontSize: theme.spacing(8),
  },
  [theme.breakpoints.down('xs')]: {
    profileUser: {
      background: 'linear-gradient(to bottom, #8D91A4, #8D91A4 60%, white 40%)',
      display: 'block',
    },
    profileUserIcon: {
      marginRight: '0',
    },
    userIcon: {
      width: theme.spacing(11),
      height: theme.spacing(11),
      fontSize: theme.spacing(6),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    profileUserInfo: {
      textAlign: 'center',
      '& h1': {
        fontSize: theme.spacing(3),
      },
      '& p': {
        marginTop: '1.5rem',
        fontSize: theme.spacing(1.7),
      },
    },
    profileArticlesHeader: {
      textAlign: 'center',
      '& h2': {
        fontSize: theme.spacing(2.3),
      },
    },
  },
}));

function Profile() {
  const classes = useStyles();
  const cookie = Cookie.get('user');
  let user = cookieStrToObj(cookie);

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getSavedArticles().then((data) => setArticles(data));
  }, []);

  if (!user.email) return <Redirect to="/login" />;

  return (
    <Box className="profile" mt={3}>
      <Box
        className={`profile-user, ${classes.profileUser}`}
        display="flex"
        flexDirection="row"
        mb={5}
      >
        <Box className={`profile-user--icon, ${classes.profileUserIcon}`}>
          <Avatar className={`user--icon, ${classes.userIcon}`}>
            {user.name.charAt(0)}
          </Avatar>
        </Box>
        <Box className={`profile-user--info, ${classes.profileUserInfo}`}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>{articles.length} Saved Articles</p>
        </Box>
      </Box>
      <main className="profile-articles">
        <Box
          mb={5}
          className={`profile-articles--header, ${classes.profileArticlesHeader}`}
        >
          <h2>Your Articles</h2>
          <Divider />
        </Box>
        {articles.map((article, index) => (
          <article key={index} className="profile-articles--article">
            {/* saved article key names doesnt match article keys from news api */}
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
              articleSection="bottom"
            />
          </article>
        ))}
      </main>
    </Box>
  );
}

export default Profile;
