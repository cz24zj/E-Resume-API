const mongoose = require("mongoose");
const user = require("./user");

const messageschema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            maxLength: 160
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        beenread: {
            type: Boolean,
        },
        username: {
            type: String,
        }
    },
    {
        timestamps: true
    }

);

messageschema.pre("remove", function (next) {
    user.findById(this.user)
        .then(user => {
            user.message.remove(this.id)
            user.save();
            return next();
        })
        .catch(err => next(err));
})


const message = mongoose.model("message", messageschema);
module.exports = message;
