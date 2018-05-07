const db = require('../model');
const experience = {};

experience.retrive = function (req, res,next) {
    db.user.findById(req.params.id)
        .populate('experience')
        .then(user => res.status(200).json(user.experience))
        .catch(err=>next(err));

};

experience.create = function (req, res,next) {
    const name = req.body.name;
    const time = req.body.time;
    const bullet = req.body.bullet;
    db.experience.create({ name: name, time: time, bullet: bullet }, function (err, experience) {
        if (err) {
            next(err);
        } else {
            db.user.findById(req.params.id)
            .then(user => {
                user.experience.push(experience._id);
                user.save()
                res.status(200).json(experience);
            })
            .catch(err=>next(err));

        }
    })
};

experience.update = function (req, res,next) {
    const name = req.body.name;
    const time = req.body.time;
    const bullet = req.body.bullet;
    db.experience.findByIdAndUpdate(req.params.experience_id, 
        { name: name, time: time, bullet: bullet })
        .then(experience => res.status(200).json(experience))
        .catch(err => next(err))

};

experience.delete = function (req, res,next) {
    db.experience.findByIdAndRemove(req.params.experience_id)
        .then(experience => res.status(200).json(experience))
        .catch(err=>next(err))

};

module.exports = experience;