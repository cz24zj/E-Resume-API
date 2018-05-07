const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 20,
        minlength: 4,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    email:{
        type:String,
        
    },
    skill: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'skill'

    }],
    coursework: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coursework'
    }],
    profile: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    }],
    school: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'school'
    }],
    experience: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'experience'
    }],
    message:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message",
    }]


});

userschema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    } else {
        bcrypt.hash(user.password, saltRounds)
            .then((hashedPassword) => {
                user.password = hashedPassword;
                return next();
            })
            .catch(err => next(err));
    }
});

userschema.methods.comparePassword = function (candidatePassword, compare) {
    bcrypt.compare(candidatePassword, this.password)
        .then(isMatch => compare(null, isMatch))
        .catch(err => compare(err));
}

const user = mongoose.model('user', userschema)

module.exports = user;