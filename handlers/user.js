const db = require('../model');
const user = {};

user.retrive = function (req, res,next) {
    db.user.findById(req.params.id)
        .populate('profile school skill coursework experience')
        .then(user => 
            res.status(200).json({
            username:user.username,
            profile: user.profile==0?[{}]:user.profile,
            school: user.school, 
            experience: user.experience,
            skill: user.skill,
            coursework:user.coursework, 
            id:user._id
            }))
        .catch(err=>next(err));
}


module.exports = user;