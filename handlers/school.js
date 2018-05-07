const db = require('../model');
const school = {};

school.retrive = function (req, res,next) {
    db.user.findById(req.params.id)
        .populate('school')
        .then(user => res.status(200).json(user.school))
        .catch(err=>next(err))

};

school.create = function (req, res,next) {
    const name = req.body.name;
    const gpa = req.body.gpa;
    const major = req.body.major;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    db.school.create({
        name: name, major: major, gpa: gpa,
        startDate: startDate, endDate: endDate
    },
        function (err, school) {
            if (err) {
                next(err)
            } else {
                db.user.findById(req.params.id)
                .then(user => {
                    user.school.push(school._id);
                    user.save()
                    res.status(200).json(school);
                })
                .catch(err=>next(err));

            }
        })
};

school.update = function (req, res,next) {
    const name = req.body.name;
    const gpa = req.body.gpa;
    const major = req.body.major;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    db.school.findByIdAndUpdate(req.params.school_id, {
        name: name, major: major, gpa: gpa,
        startDate: startDate, endDate: endDate
    })
        .then(school => res.status(200).json(school
        ))
        .catch(err => next(err))

}

school.delete = function (req, res,next) {
    db.school.findByIdAndRemove(req.params.school_id)
        .then(school => res.status(200).json(school))
        .catch(err=>next(err))

}

module.exports = school;