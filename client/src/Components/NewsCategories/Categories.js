import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Articles from '../Articles/Articles';
import { Divider } from '@material-ui/core';

function Categories({ category }) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // get top articles depending on category prop
    async function getNewsCategory() {
      const res = await fetch(`/api/news/category/${category}`);
      const data = await res.json();
      setNews(data.articles);
      console.log(data);
    }
    getNewsCategory();
  }, []);

  return (
    <div>
      <h1>{category}</h1>
      <Divider />
      {news.map((article, index) => (
        <article key={index}>
          <Articles article={article} articleSection="bottom" />
        </article>
      ))}
    </div>
  );
}

// PropTypes ensures that passed down props adhere to the type checking
Categories.propTypes = {
  category: PropTypes.string,
};

export default Categories;
