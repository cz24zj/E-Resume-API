const mongoose = require('mongoose');
const user = require("./user");

const skillschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

skillschema.pre("remove", function (next) {
    user.findById(this.user)
        .then(user => {
            user.skill.remove(this.id)
            user.save();
            return next();
        })
        .catch(err => next(err));
})

const skill = mongoose.model('skill', skillschema);

module.exports = skill;