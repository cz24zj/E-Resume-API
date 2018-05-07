const mongoose = require('mongoose');
const user = require("./user");

const schoolschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    major: {
        type: String,
        required: true
    },
    gpa: {
        type: String,
        required:true
    },
    
    startDate: {
        type: String,
        required:true
    },
    endDate: {
        type: String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

});

schoolschema.pre("remove", function (next) {
    user.findById(this.user)
        .then(user => {
            user.school.remove(this.id)
            user.save();
            return next();
        })
        .catch(err => next(err));
})

const school = mongoose.model('school', schoolschema);

module.exports = school;