
const UserModel = require('../models/user');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

exports.user_register =  (req, res, next) => {

    //check if password have a minimum of 5 chars
    if (!req.body.password) {
        return res.status(500).json({
            message: "Password not supplied"
        });
    }
    else if (req.body.password.length < 5)
    {
        return res.status(500).json({
            message: "Password Does Not Meet Requirements"
        });
    }


    //Check if there is already a user registered with the same email
    UserModel.find({email: req.body.email})
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
                            message: err
                        });
                    } else {
                        const user = new UserModel({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
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
                                    message: err
                                });
                            })
                    }
                });

            }
        });

};

exports.user_login = (req, res, next) => {

    console.log("user trying to log in");
    console.log(req.body.email);
    console.log(req.body.password);

    UserModel.find({email: req.body.email})
        .exec()
        .then(user => {
            // Check if email exist in database
            if (user.length < 1) {
                return res.status(404).json({
                    message: "Authentication failed"
                });
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(404).json({
                        message: "Authentication failed"
                    });
                }

                if (result) {
                    const token = jwt.sign({
                            name: user[0].name,
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_SECRET_KEY,
                        {
                            expiresIn: process.env.JWT_EXPIRES
                        }
                    );

                    return res.status(200).json({
                        message: "Authentication successful",
                        token: token
                    });
                }
                res.status(404).json({
                    message: "Authentication failed"
                });
            });


        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        });

};

exports.user_details = (req, res, next) => {

    UserModel.findById(req.userData.userId, 'name email -_id')
        .then( user => {
            res.status(200).json({
                user
            });
        })
        .catch( err => {
            res.status(404).json({
                message: err
            })

        })

};


exports.user_update_password = (req, res, next) => {


    //check if password have a minimum of 5 chars
    if (!req.body.password) {
        return res.status(500).json({
            message: "Password not supplied"
        });
    }
    else if (req.body.password.length < 5)
    {
        return res.status(500).json({
            message: "Password Does Not Meet Requirements"
        });
    }


    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            UserModel.findByIdAndUpdate(req.userData.userId, {password: hash}, {new: true})
                .then(result => {
                    console.log(result)
                    res.status(201).json({
                        message: 'password updated!'
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
};

exports.user_update_name = (req, res, next) => {


    //check if password have a minimum of 3
    if (!req.body.name) {
        return res.status(500).json({
            message: "Name not supplied"
        });
    }
    else if (req.body.name.length < 3)
    {
        return res.status(500).json({
            message: "Name Does Not Meet Requirements"
        });
    }

            UserModel.findByIdAndUpdate(req.userData.userId, {name: req.body.name}, {new: true})
                .then(result => {
                    console.log(result)
                    res.status(201).json({
                        message: 'Name updated!'
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                })

};


