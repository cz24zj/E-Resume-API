const express = require('express');
const router = express.Router({ mergeParams: true });
const school = require('../handlers/school.js');
const auth = require('../middleware/auth.js');

router.route('/user/:id/school', auth.isLoggedin, auth.isCurrentUser)
    .get(school.retrive)
    .post(school.create);

router.route('/user/:id/school/:school_id', auth.isLoggedin, auth.isCurrentUser)
    .put(school.update)
    .delete(school.delete)

module.exports = router;