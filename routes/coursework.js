const express = require('express');
const router = express.Router({ mergeParams: true });
const coursework = require('../handlers/coursework.js');
const auth = require('../middleware/auth.js');

router.route('/user/:id/coursework', auth.isLoggedin, auth.isCurrentUser)
    .get(coursework.retrive)
    .post(coursework.create);

router.route('/user/:id/coursework/:coursework_id', auth.isLoggedin, auth.isCurrentUser)
    .put(coursework.update)
    .delete(coursework.delete);

module.exports = router;