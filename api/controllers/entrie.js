
const EntrieModel = require('../models/entrie');
const mongoose = require("mongoose");

const DetectLanguage = require('detectlanguage');
const detectLanguage = new DetectLanguage({
    key: process.env.DETECT_LANGUAGE_API_KEY
});


exports.entrie_new =  (req, res, next) => {


    //check if text have a minimum of 2 chars see entrie model
    if (!req.body.text) {
        return res.status(500).json({
            message: "Text not supplied"
        });
    }
    else if (req.body.text.length < 2)
    {
        return res.status(500).json({
            message: "Text Does Not Meet Requirements"
        });
    }

  //Check if solutions already exist in database

    EntrieModel.find({text: req.body.text}).select('result -_id')
        .populate('user', 'name -_id')
        .exec()
        .then( result => {
            if (result.length >= 1) {
                return res.status(200).json({
                    lang: "User " + result[0].user.name + " already submitted this string, the result was: " + result[0].result
                });
            }
            else {

                detectLanguage.detect(req.body.text, function(err, result) {
                    if(result)
                    {
                        const lang = result[0].language;

                        const Entrie = new EntrieModel({
                            date: new Date(),
                            text: req.body.text,
                            result: lang,
                            latitude: req.body.latitude,
                            longitude: req.body.longitude,
                            user: req.userData.userId

                        });

                        Entrie
                            .save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    lang: lang
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            })

                    }
                    else {
                        res.status(500).json({
                            error: err
                        })
                    }
                });

            }
        })






};


exports.entrie_latest =  (req, res, next) => {

    EntrieModel.find().select('-_id').sort('-date').limit(5)
        .populate('user', 'name email -_id')
        .then(entries =>{
            res.status(200).json({
                entries: entries
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });

        })

};

exports.entrie_user =  (req, res, next) => {

    EntrieModel.find({user: req.userData.userId}).select('-_id -user').sort('-date')
        .then(entries =>{
            res.status(200).json({
                userEntries: entries
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });

        })

};
