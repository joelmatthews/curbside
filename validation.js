const Joi = require('joi');

const itemJoiSchema = Joi.object({
    item: Joi.object({
        name: Joi.string().required(),
        location: Joi.object({
            addressLineOne: Joi.string().required(),
            addressLineTwo: Joi.string().optional().allow(''),
            city: Joi.string().required(),
            state: Joi.string().required(),
            zip: Joi.number().required()
        }),
        category: Joi.string().valid('furniture', 'clothing', 'toys', 'entertainment', 'other').required(),
        details: Joi.string().max(500).required(),
        image: Joi.string().optional()

    })
})

module.exports = itemJoiSchema;