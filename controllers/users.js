const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('register');
}

module.exports.registerUser = async (req, res) => {
    try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const regUser = await User.register(user, password);
    req.login(regUser, err => {
        if (err) return next(err);
        req.flash('success', 'Welcome!');
    res.redirect('/items');
    })
    } catch(e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('login');
}

module.exports.loginUser = async (req, res) => {
    req.flash('success', 'Welcome');
    const redirectUrl = req.session.returnTo || '/items';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logoutUser = async (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        req.flash('success', 'Thanks for coming!');
        res.redirect('/items')
    })
}