import React from 'react';
import { useState, useEffect } from 'react';
// import Grid from '@material-ui/core/Grid';
import Articles from './Articles';

function Home() {
  const [homeNews, setHomeNews] = useState([]);

  useEffect(() => {
    const getHomeNews = async () => {
      const res = await fetch('/api/news');
      const data = await res.json();
      console.log(data);
      setHomeNews(data.articles);
    };
    getHomeNews();
  }, []);

  return homeNews.map((article, index) => (
    <article key={index}>
      <Articles article={article} />
    </article>
  ));
}
export default Home;
