const express = require('express');
const router = express.Router({ mergeParams: true });
const skill = require('../handlers/skill.js');
const auth = require('../middleware/auth.js');

router.route('/user/:id/skill', auth.isLoggedin, auth.isCurrentUser)
    .get(skill.retrive)
    .post(skill.create);

router.route('/user/:id/skill/:skill_id',auth.isLoggedin, auth.isCurrentUser)
    .put(skill.update)
    .delete(skill.delete);

module.exports = router;