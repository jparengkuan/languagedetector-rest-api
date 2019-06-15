const mongoose = require('mongoose');

const entrieSchema = mongoose.Schema({

    date: {
        type: Date,
        required: true
    },

    text: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 15,
        match: /^[a-zA-Z0-9]*$/
    },

    result: {
        type: String,
        required: true
    },

    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Entrie', entrieSchema);
