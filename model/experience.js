const mongoose = require('mongoose');
const user = require("./user");

const experienceschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    bullet: [{
        type: String,
        require:true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

experienceschema.pre("remove", function (next) {
    user.findById(this.user)
        .then(user => {
            user.experience.remove(this.id)
            user.save();
            return next();
        })
        .catch(err => next(err));
})

const experience = mongoose.model('experience', experienceschema);

module.exports = experience;