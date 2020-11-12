import React from 'react';
import { useState, useEffect } from 'react';

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

  return homeNews.map((news, index) => <h2 key={index}>{news.title}</h2>);
}
export default Home;
