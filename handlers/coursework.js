const db = require('../model');
const coursework = {};

coursework.retrive = function (req, res, next) {
    db.user.findById(req.params.id)
        .populate('coursework')
        .then(user => res.status(200).json(user.coursework))
        .catch(err => next(err));

};

coursework.create = function (req, res, next) {
    const name = req.body.name
    db.coursework.create({ name: name }, function (err, coursework) {
        if (err) {
            next(err);
        } else {
            db.user.findById(req.params.id)
                .then(user => {
                    user.coursework.push(coursework._id);
                    user.save()
                    res.status(200).json(coursework);
                })
                .catch(err => next(err));

        }
    })
};

coursework.update = function (req, res, next) {
    const name = req.body.name;
    db.coursework.findByIdAndUpdate(req.params.coursework_id, { name: name })
        .then(coursework => res.status(200).json(coursework))
        .catch(err => next(err));

};

coursework.delete = function (req, res, next) {
    db.coursework.findByIdAndRemove(req.params.coursework_id)
        .then(coursework => res.status(200).json(coursework))
        .catch(err => next(err));

};

module.exports = coursework;