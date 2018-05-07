require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require("./handlers/err.js");
const userroute = require('./routes/user.js')
const skillroute = require('./routes/skill.js');
const courseworkroute = require('./routes/coursework.js');
const profileroute = require('./routes/profile.js');
const authroute = require('./routes/auth.js');
const schoolroute = require('./routes/school.js');
const experienceroute = require('./routes/experience.js')
const messageroute = require('./routes/message.js')
const db = require('./model');
const bodyParser = require('body-parser');
const PORT = process.env.PORT||8000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/user', function (req, res, next) {
    db.user.find({}, { password: 0 })
        .sort({ creatdAt: 'desc' })
        .populate('profile')
        .then(user => res.status(200).json(user))
        .catch(err => next(err))
})

app.use('/api/auth', authroute);
app.use('/api', userroute);
app.use('/api', skillroute);
app.use('/api', profileroute);
app.use('/api', courseworkroute);
app.use('/api', schoolroute);
app.use('/api', experienceroute);
app.use('/api',messageroute);

app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function (req, res) {
    console.log(`Server starts on PORT:` + PORT)
})