const mongoose = require('mongoose');

const entrieSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    date: {
        type: Date,
        required: true
    },

    text: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10,
        match: /^[a-zA-Z0-9]*$/
    },

    result: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Entrie', entrieSchema);
