const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// Import the user model
const User = require('../models/user');


router.post('/signup', (req, res, next) => {

    //Check if there is already a user registered with the same email
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                //STATUS 409 CONFLICT
                return res.status(409).json({
                    message: "Email already exists"
                });
            } else {

                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    message: 'User created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            })
                    }
                });

            }
        });


});

module.exports = router;
