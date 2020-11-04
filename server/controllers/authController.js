const createError = require('http-errors')
const ms = require('ms')
const { registerSchema, loginSchema } = require('../helpers/validation.schema')
const { signAccessToken } = require('../helpers/jwt_helper')
const { User } = require('../models/User')

module.exports.signup_post = async(req, res, next) => {
    try {
        const results = await registerSchema.validateAsync(req.body)
        // check if user exists
        const userExists = await User.findOne({ where: { email: results.email } })
        if(userExists) throw createError.Conflict(`${results.email} is already registered`)

        const newUser = await User.create(results);
        
        // sign token to user
        const token = await signAccessToken(newUser.id)
        // send cookier to browser
        res.cookie('jwt', token, { httpOnly: true, maxAge: ms('1d'), secure: process.env.NODE_ENV === "production" ? true : false })
        res.status(201).send({newUser, token})
    } catch (error) {
        // unprocessable request
        if(error.isJoi === true) error.status = 422;
        next(error)
    }
}

module.exports.login_post = async (req, res, next) => {
    try {
        const results = await loginSchema.validateAsync(req.body);
        //check if user is registered   
        const user = await User.findOne({ where: { email: results.email } })
        if(!user) throw createError.NotFound(`User not registered`)

        // check if password matches
        const userMatched = await User.validatePassword(results)
        if(!userMatched) throw createError.Unauthorized(`Username/Password not valid`)

        // sign token to user
        const token = await signAccessToken(user.id)
        // send cookier to browser
        res.cookie('jwt', token, { httpOnly: true, maxAge: ms('1d'), secure: process.env.NODE_ENV === "production" ? true : false })        
        res.status(200).send({ loggedin : user, token });
    } catch (error) {
        if (error.isJoi === true)
            return next(createError.BadRequest("Invalid Username/Password"));
        next(error)
    }
}

module.exports.logout_get = (req, res, next) => {
    res.send('logout')
}