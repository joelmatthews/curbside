const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const curbsideItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        addressLineOne: {
            type: String,
            required: true,
        },
        addressLineTwo: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true
        }
    },
    category: {
        type: String,
        enum: ['furniture', 'clothing', 'toys', 'entertainment', 'other'],
        required: true
    },
    details: {
        type: String,
        required: true,
        maxLength: 500
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CurbsideItem', curbsideItemSchema);
