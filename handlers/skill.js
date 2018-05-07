

const db = require('../model');
const skill = {};

skill.retrive = function (req, res,next) {
    db.user.findById(req.params.id)
        .populate('skill')
        .then(user => res.status(200).json(user.skill))
        .catch(err=>next(err))
};

skill.create = function (req, res,next) {
    const name = req.body.name
    db.skill.create({ name: name }, function (err, skill) {
        if (err) {
            next(err);
        } else {
            db.user.findById(req.params.id)
            .then(user => {
                user.skill.push(skill._id);
                user.save()
                res.status(200).json(skill);
            })
            .catch(err=>next(err))

        }
    })
};

skill.update = function (req, res,next) {
    const name = req.body.name
    db.skill.findByIdAndUpdate(req.params.skill_id, { name: name })
        .then(skill => res.status(200).json(skill))
        .catch(err => next(err))

};

skill.delete = function (req, res,next) {
    db.skill.findByIdAndRemove(req.params.skill_id)
        .then(skill => res.status(200).json(skill))
        .catch(err=>next(err));

};

module.exports = skill;