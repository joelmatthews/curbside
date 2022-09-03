const ExpressError = require('./utilities/ExpressError');
const { itemJoiSchema, commentJoiSchema } = require('./validation');

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