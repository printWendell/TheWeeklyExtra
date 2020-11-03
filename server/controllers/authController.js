const createError = require('http-errors')
const { registerSchema } = require('../helpers/validation.schema')
const { User } = require('../models/User')

module.exports.signup_post = async(req, res, next) => {
    try {
        const results = await registerSchema.validateAsync(req.body)
        // check if user exists
        const userExists = await User.findOne({ where: { email: results.email } })
        if(userExists) throw createError.Conflict(`${results.email} is already registered`)

        const newUser = await User.create(results)
        res.status(201).send({newUser})
    } catch (error) {
        // unprocessable request
        if(error.isJoi === true) error.status = 422;
        next(error)
    }
}

module.exports.login_post = (req, res, next) => {
    res.send('login')
}

module.exports.logout_get = (req, res, next) => {
    res.send('logout')
}