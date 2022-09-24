const ExpressError = require('./utilities/ExpressError');
const { itemJoiSchema, commentJoiSchema } = require('./validation');
const CurbsideItem = require('./models/items');
const Comment = require('./models/comment');

module.exports.validateItem = (req, res, next) => {
    const { error, value } = itemJoiSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message);
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateComment = (req, res, next) => {
    const { error, value } = commentJoiSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message);
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You Must Be Logged In!')
        return res.redirect('/login')
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const item = await CurbsideItem.findById(id);
    if (!item.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission!')
        return res.redirect(`/items/${id}`)
    }
    next();
}

module.exports.isCommentAuthor = async (req, res, next) => {
    const { id, commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission!')
        return res.redirect(`/items/${id}`)
    }
    next();
}