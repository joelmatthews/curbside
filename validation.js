const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAtributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.itemJoiSchema = Joi.object({
    item: Joi.object({
        name: Joi.string().required().escapeHTML(),
        location: Joi.object({
            addressLineOne: Joi.string().required().escapeHTML(),
            addressLineTwo: Joi.string().optional().allow('').escapeHTML(),
            city: Joi.string().required().escapeHTML(),
            state: Joi.string().required().escapeHTML(),
            zip: Joi.number().required()
        }),
        category: Joi.string().valid('furniture', 'clothing', 'toys', 'entertainment', 'other').required(),
        details: Joi.string().max(500).required().escapeHTML(),
        image: Joi.string().optional()

    })
})

module.exports.commentJoiSchema = Joi.object({
    comment: Joi.string().required().min(4)
    }).required();
