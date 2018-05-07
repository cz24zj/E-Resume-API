const express = require('express');
const router = express.Router({ mergeParams: true });
const profile = require('../handlers/profile.js');
const auth = require('../middleware/auth.js');

router.route('/user/:id/profile', auth.isLoggedin, auth.isCurrentUser)
    .get(profile.retrive)
    .post(profile.create);

router.route('/user/:id/profile/:profile_id', auth.isLoggedin, auth.isCurrentUser)
    .put(profile.update)
    .delete(profile.delete)

module.exports = router;