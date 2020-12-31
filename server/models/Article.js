// set up Article
const Sequelize = require("sequelize");
const { db } = require("../config/connection");

const Article = db.define("article", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  author: {
    type: Sequelize.STRING(15),
  },
  title: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(255),
  },
  published_at: {
    type: "TIMESTAMP",
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  link_url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  img_url: {
    type: Sequelize.STRING,
  },
  source: {
    type: Sequelize.STRING(10),
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: "user",
      key: "id",
    },
  },
});

module.exports = { Article };
