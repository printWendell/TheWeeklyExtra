// set up sequelize
const Sequelize = require('sequelize')
const dbConfig = require('./db.config')
let db = {}

if(process.env.CLEARDB_DATABASE_URL){
    db = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
        dialect: 'mysql',
        define: {
            freezeTableName: true,
            timestamps: false,
        }
    })
} else {
    db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASS, {
        host: dbConfig.HOST,
        dialect: "mysql",
        define: {
            freezeTableName: true,
            timestamps: false,
        }
    })
}

module.exports = { db }