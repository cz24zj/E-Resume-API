const db = require('../model');
const message = {};

message.retrive = function (req, res, next) {
    db.user.findById(req.params.id)
        .populate('message')
        .then(user => res.status(200).json(user.message))
        .catch(err => next(err));
}

message.create = function (req, res, next) {
    const text = req.body.text;
    const user = req.body.user;
    const beenread = req.body.beenread;
    const username = req.body.username;
    db.message.create({
        text: text,
        beenread: beenread,
        user: user,
        username: username,
    })
        .then(message => {
            db.user.findById(req.params.id)
                .then(user => {
                    user.message.push(message._id);
                    user.save();
                    res.status(200).json(message);
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))
}

message.update = function (req, res, next) {
    const text = req.body.text;
    const user = req.body.user;
    const beenread = req.body.beenread;
    const username = req.body.username
    db.message.findByIdAndUpdate(req.params.message_id, {
        text: text,
        beenread: beenread,
        user: user,
        username: username
    })
        .then(message => res.status(200).json(message))
        .catch(err => next(err));
};

message.delete = function (req, res, next) {
    db.message.findByIdAndRemove(req.params.message_id)
        .then(message => res.status(200).json(message))
        .catch(err => next(err))
}

module.exports = message;