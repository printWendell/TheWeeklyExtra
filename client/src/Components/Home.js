import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
// import Grid from '@material-ui/core/Grid';
import Articles from './Articles/Articles';
import MiddleArticles from './Articles/MiddleArticles';
import TopArticlesLeft from './Articles/TopArticlesLeft';
import TopArticlesRight from './Articles/TopArticlesRight';

//=======material-ui css styles============//
const useStyles = makeStyles((theme) => ({
  articlesFlex: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  topSectionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '1.3rem',
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
    <div className="home">
      <section className={`home-top-section ${classes.topSectionGrid}`}>
        <div className={`home-top-section--left ${classes.topSectionGridLeft}`}>
          {homeNews.slice(0, 1).map((article, index) => (
            <article key={index}>
              <TopArticlesLeft article={article} />
            </article>
          ))}
        </div>
        <div
          className={` home-top-section--right${classes.topSectionGridRight}`}
        >
          {homeNews.slice(1, 7).map((article, index) => (
            <article key={index}>
              <TopArticlesRight article={article} />
            </article>
          ))}
        </div>
      </section>
      <section className={`home-middle-section ${classes.articlesFlex}`}>
        {homeNews.slice(7, 10).map((article, index) => (
          <article key={index}>
            <MiddleArticles article={article} />
          </article>
        ))}
      </section>
      <Divider />
      <section className="home-bottom-section">
        {homeNews.slice(10).map((article, index) => (
          <article key={index} className={classes.article}>
            <Articles article={article} />
          </article>
        ))}
      </section>
    </div>
  );
}
export default Home;
