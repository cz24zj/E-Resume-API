const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/onlineCV');

module.exports.user = require('./user')
module.exports.skill = require('./skill')
module.exports.coursework = require('./coursework');
module.exports.profile = require('./profile');
module.exports.school = require('./school');
module.exports.experience = require('./experience');
module.exports.message = require('./message');

