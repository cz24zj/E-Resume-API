require("dotenv").load();
const db = require('../model');
const jwt = require('jsonwebtoken');
const auth = {};


auth.signup = function (req, res,next) {
    const username = req.body.username;
    const password = req.body.password;
    const imageUrl = req.body.imageUrl;
    db.user.create({ username: username, password: password, imageUrl: imageUrl })
        .then((user) => {
            jwt.sign({ username: username, imageUrl: imageUrl, id: user.id },
                process.env.SECRET_KEY, function (err, token) {
                    if (err) {
                        next(err);
                    } else {
                        res.status(200).json({ username: user.username, imageUrl: user.imageUrl, id: user.id, token: token });
                    }
                });

        })
        .catch((err) => {
            if (err.code === 11000) {
                next({
                    status: 400,message:
                    'Sorry, that username is taken'
                });
            } else {
                next(err);
            }
        })
};

auth.signin = function (req, res,next) {
    const username = req.body.username;
    const password = req.body.password;
    db.user.findOne({ username: username })
        .then(user => {
            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    next(err)
                } else if (!isMatch) {
                    next({
                        status: 400,
                        message: "Invalid Email/Password."
                    })
                } else {
                    jwt.sign({ username: user.username, imageUrl: user.imageUrl, id: user.id },
                        process.env.SECRET_KEY, function (err, token) {
                            if (err) {
                                next(err)
                            } else {
                                res.status(200).json({ username: user.username, imageUrl: user.imageUrl, id: user.id, token: token });
                            }
                        })
                }
            })
        })
        .catch(err => next({
            status: 400,
            message: "Invalid Email/Password."
        }));
};

module.exports = auth;