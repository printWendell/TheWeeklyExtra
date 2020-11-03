// set up User
const Sequelize = require('sequelize');
const { db } = require("../config/connection")

const User = db.define(
    "user", 
    {
        id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        },
        username: {
        type: Sequelize.STRING(25),
        allowNull: false,
        unique: true,
        },
        email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: null,
        unique: true,
        },
        password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
  },
)

module.exports = { User }