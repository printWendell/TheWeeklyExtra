const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    username: Joi.string().min(2).lowercase().regex(/^[a-z\d\-_\s]+$/i).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).required(),
})

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required(),
});


module.exports = { registerSchema, loginSchema }