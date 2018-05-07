const mongoose = require('mongoose');
const user = require("./user");

const courseworkschema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

courseworkschema.pre("remove", function (next) {
    user.findById(this.user)
        .then(user => {
            user.coursework.remove(this.id)
            user.save();
            return next();
        })
        .catch(err => next(err));
})

const coursework = mongoose.model('coursework', courseworkschema);

module.exports = coursework;