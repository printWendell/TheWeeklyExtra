require('dotenv').config();
const newsApi = require('newsapi');
const key = process.env.NEWS_API_KEY;
const news = new newsApi(key);

module.exports.get_home_news = (req, res, next) => {
    news.v2.topHeadlines({
      pageSize: 70,
      language: "en",
      country: "us",
    }).then((response) => {
        if(response.status === "ok"){
            res.send(response)
        }
    }).catch((err => {
        next(err)
    }))
};

module.exports.get_news_category = (req, res, next) => {
    const category = req.params.category;
     news.v2.topHeadlines({
      category: category,
      pageSize: 70,
      language: "en",
      country: "us",
    }).then((response) => {
        if(response.status === "ok"){
            res.send(response)
        }
    }).catch((err => {
        next(err)
    }))
};