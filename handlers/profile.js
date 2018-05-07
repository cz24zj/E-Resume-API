const db = require('../model');
const profile = {};

profile.retrive = function (req, res, next) {

    db.user.findById(req.params.id)
        .populate('profile')
        .then(user => res.status(200).json(user.profile))
        .catch(err => next(err));


};

profile.create = function (req, res, next) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const location = req.body.location;
    const description = req.body.description
    const imageUrl = req.body.imageUrl

    db.profile.create({
        firstname: firstname,
        lastname: lastname,
        location: location,
        description: description,
        imageUrl: imageUrl
    }, function (err, profile) {
        if (err) {
            next(err);
        } else {
            db.user.findById(req.params.id)
                .then(user => {
                    user.profile.push(profile._id)
                    user.save()
                    res.status(200).json(profile);
                })
                .catch(err => next(err));

        }
    })
};

profile.update = function (req, res, next) {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const location = req.body.location;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    db.profile.findByIdAndUpdate(req.params.profile_id, {
        firstname: firstname,
        lastname: lastname,
        location: location,
        description: description,
        imageUrl: imageUrl,
    })
        .then(profile => res.status(200).json(profile))
        .catch(err => next(err));
};

profile.delete = function (req, res, next) {
    db.profile.findByIdAndRemove(req.params.profile_id)
        .then(profile => res.status(200).json(profile))
        .catch(err => next(err))

};

module.exports = profile;

