const JWT = require('jsonwebtoken')

// function to protect routes
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      JWT.verify(token, process.env.ACCESS_JWT_SECRET, (err) => {
        if (err) {
            res.status(401).send(err.message);
        } else {
            next();
        }
        });
    } else {
        res.status(401);
    }
}

module.exports = { requireAuth }