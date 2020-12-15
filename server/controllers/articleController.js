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
