
const EntrieModel = require('../models/entrie');
const mongoose = require("mongoose");

exports.submit_new =  (req, res, next) => {

    return res.status(200).json({
        "message": "it works!"
    });
};
