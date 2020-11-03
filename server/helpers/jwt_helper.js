const JWT = require('jsonwebtoken')
const createError = require('http-errors')
require("dotenv").config();

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                id: userId
            }
            const secret = process.env.JWT_SECRET_KEY;
            const options = {
                expiresIn: "4h",
                issuer: "theweeklyextra",
            };
            JWT.sign({ payload }, secret, options, (err, token) => {
                if(err) return reject(createError.InternalServerError())
                resolve(token)
            })
        })
    }
}