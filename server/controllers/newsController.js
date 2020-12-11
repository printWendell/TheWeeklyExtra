require("dotenv").config();
const { response } = require("express");
const newsApi = require("newsapi");
const key = process.env.NEWS_API_KEY;
const news = new newsApi(key);

module.exports.get_home_news = (req, res, next) => {
  news.v2
    .topHeadlines({
      pageSize: 70,
      language: "en",
      country: "us",
    })
    .then((response) => {
      if (response.status === "ok") {
        res.send(response);
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.get_news_category = (req, res, next) => {
  const category = req.params.category;
  news.v2
    .topHeadlines({
      category: category,
      pageSize: 70,
      language: "en",
      country: "us",
    })
    .then((response) => {
      if (response.status === "ok") {
        res.send(response);
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.get_news_search = (req, res, next) => {
  const search = req.query.search;
  const sort = req.query.sort;
  const page = req.query.page;

  // change sortBy based on query
  let sorting;
  if (sort === "latest") {
    sorting = "publishedAt";
  } else if (sort === "popular") {
    sorting = "popularity";
  } else {
    sorting = "relevancy";
  }

  news.v2
    .everything({
      q: search,
      language: "en",
      // set default page to 1
      page: page || 1,
      pageSize: 20,
      sortBy: sorting,
    })
    .then((response) => {
      if (response.status === "ok") {
        res.send(response);
      }
    })
    .catch((err) => {
      next(err);
    });
};
