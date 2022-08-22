const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const curbSideItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        address: {
            type: String,
            required: true,
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
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CurbsideItem', curbSideItemSchema);
