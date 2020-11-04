const JWT = require('jsonwebtoken')
const createError = require("http-errors");

// function to protect routes
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      JWT.verify(token, process.env.JWT_SECRET_KEY, (err) => {
        if (err) {
            return next(createError.Unauthorized(err.message)) 
        } else {
            next();
        }
        });
    } else {
       return next(createError.Unauthorized()) 
    }
}

module.exports = { requireAuth }