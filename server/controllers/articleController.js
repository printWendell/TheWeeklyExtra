const { Article } = require("../models/Article");

module.exports.get_saved_articles = async (req, res, next) => {
  const article = await Article.findAll();
  res.send(article);
};
