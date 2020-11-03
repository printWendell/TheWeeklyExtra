module.exports.signup_post = (req, res, next) => {
    res.send("signup")
}

module.exports.login_post = (req, res, next) => {
    res.send('login')
}

module.exports.logout_get = (req, res, next) => {
    res.send('logout')
}