import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Articles from './Articles/Articles';
import { Box } from '@material-ui/core';

//=======material-ui css styles============//
const useStyles = makeStyles((theme) => ({
  articlesFlex: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  topSectionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '2rem',
    marginBottom: '1.5rem',
  },
  topSectionGridLeft: {
    gridColumn: '1/4',
    gridRow: '1/3',
  },
  topSectionGridRight: {
    gridColumn: '4/4',
  },
  [theme.breakpoints.down('md')]: {
    articlesFlex: {
      marginBottom: '40px',
    },
    topSectionGrid: {
      display: 'block',
    },
  },
  [theme.breakpoints.down('sm')]: {
    articlesFlex: {
      display: 'block',
    },
  },
}));

function Home() {
  const [homeNews, setHomeNews] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const getHomeNews = async () => {
      const res = await fetch('/api/news');
      const data = await res.json();
      console.log(data);
      setHomeNews(data.articles);
    };
    getHomeNews();
  }, []);

  return (
    <Box className="home" mt={3} mb={5}>
      <section className={`home-top-section ${classes.topSectionGrid}`}>
        <div className={`home-top-section--left ${classes.topSectionGridLeft}`}>
          {homeNews.slice(0, 1).map((article, index) => (
            <article key={index}>
              <Articles article={article} articleSection="top-left" />
            </article>
          ))}
        </div>
        <div
          className={` home-top-section--right${classes.topSectionGridRight}`}
        >
          {homeNews.slice(1, 8).map((article, index) => (
            <article key={index}>
              <Articles article={article} articleSection="top-right-articles" />
            </article>
          ))}
        </div>
      </section>
      <section className={`home-middle-section ${classes.articlesFlex}`}>
        {homeNews.slice(8, 11).map((article, index) => (
          <article key={index}>
            <Articles article={article} articleSection="middle" />
          </article>
        ))}
      </section>
      <Divider />
      <section className="home-bottom-section">
        {homeNews.slice(11).map((article, index) => (
          <article key={index} className={classes.article}>
            <Articles article={article} articleSection="bottom" />
          </article>
        ))}
      </section>
    </Box>
  );
}
export default Home;
