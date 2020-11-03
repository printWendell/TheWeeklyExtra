// set up User
const Sequelize = require('sequelize');
const { db } = require("../config/connection")
const bcrypt = require("bcrypt");
const createError = require("http-errors");

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
  {
    hooks: {
        // hash passwords
      beforeCreate: async (user) => {
        try {
          const salt = await bcrypt.genSalt();
          user.password = await bcrypt.hash(user.password, salt);
        } catch (error) {
          console.log("err", error);
        }
      },
    },
  }
)

User.validatePassword = async function (results) {
  const user = await User.findOne({ where: { email: results.email } });
  if (!user) throw createError.NotFound(`User not registered`);
  try {
    return await bcrypt.compare(results.password, user.password);
  } catch (error) {
    throw error;
  }
};

module.exports = { User }