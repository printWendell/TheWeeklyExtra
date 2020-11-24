import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
// import Grid from '@material-ui/core/Grid';
import Articles from './Articles/Articles';
import MiddleArticles from './Articles/MiddleArticles';

//=======material-ui css styles============//
const useStyles = makeStyles((theme) => ({
  articlesFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  [theme.breakpoints.down('sm')]: {
    articlesFlex: {
      display: 'block',
    },
  },
}));

function Home() {
  const [homeNews, setHomeNews] = useState([]);
  // const [fake, setFake] = useState([]);
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

  // console.log(fake);
  return (
    <div className="home">
      <section className={`home-top-section ${classes.articlesFlex}`}>
        {homeNews.slice(0, 3).map((article, index) => (
          <article key={index}>
            <MiddleArticles article={article} />
          </article>
        ))}
      </section>
      <Divider />
      <section className="home-bottom-section">
        {homeNews.slice(3).map((article, index) => (
          <article key={index} className={classes.article}>
            <Articles article={article} />
          </article>
        ))}
      </section>
    </div>
  );
}
export default Home;
