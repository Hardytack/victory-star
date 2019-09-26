const mongoose = require('mongoose');

const setSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    series: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: Number,
        required: true
    },
    rarity: {
        type: String,
        required: true,
        trim: true
    },
    codeName: {
        type: String,
        required: true,
        trim: true
    },
    variant: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Card', setSchema);