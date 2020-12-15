const createError = require("http-errors");
const { Article } = require("../models/Article");
const { User } = require("../models/User");

module.exports.get_saved_articles = async (req, res, next) => {
  try {
    //   find user id
    const results = req.body.email;
    const findUser = await User.findOne({ where: { email: results } });

    //   use user id to find all of users saved articles
    const articles = await Article.findAll({ where: { user_id: findUser.id } });
    res.status(200).send(articles);
  } catch (error) {
    next(error);
  }
};

module.exports.post_save_articles = async (req, res, next) => {
  try {
    const results = req.body;

    // find user id
    const findUser = await User.findOne({ where: { email: results.email } });
    const user_id = findUser.id;

    // create article object with article data from req and user id
    const { email, ...articleData } = results;
    const article = { ...articleData, user_id };

    // check if user already saved article
    const articleExists = await Article.findOne({
      where: { link_url: article.link_url, user_id: user_id },
    });

    if (articleExists) {
      throw createError.Conflict("Article already saved");
    } else {
      const savedArticle = await Article.create(article);
      res.status(201).send(savedArticle);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.delete_saved_articles = async (req, res, next) => {
  try {
    const results = req.body;

    // find user id
    const findUser = await User.findOne({ where: { email: results.email } });
    const user_id = findUser.id;

    // find article to delete using results url and user id
    const savedArticle = await Article.destroy({
      where: { link_url: results.link_url, user_id: user_id },
    });

    if (!savedArticle) throw createError.NotFound("Article Not Found");
    await Article.destroy({
      where: { link_url: results.link_url, user_id: user_id },
    });

    res.status(204).send({ savedArticle });
  } catch (error) {
    next(error);
  }
};
