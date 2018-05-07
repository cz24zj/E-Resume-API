const mongoose = require('mongoose');
const user = require("./user");

const profileschema = new mongoose.Schema({
    firstname: {
        type: String,
        required:true
    },
    lastname: {
        type: String,
        required:true
    },
    location: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    imageUrl: {
        type: String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const profile = mongoose.model('profile', profileschema);

module.exports = profile;