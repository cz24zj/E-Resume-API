const express = require('express');
const router = express.Router({ mergeParams: true });
const experience = require('../handlers/experience.js');
const auth = require('../middleware/auth.js');

router.route('/user/:id/experience', auth.isLoggedin, auth.isCurrentUser)
    .get(experience.retrive)
    .post(experience.create);

router.route('/user/:id/experience/:experience_id', auth.isLoggedin, auth.isCurrentUser)
    .put(experience.update)
    .delete(experience.delete)

module.exports = router;