const express = require('express');
const router = express.Router({ mergeParams: true });
const user = require('../handlers/user.js');
const auth = require('../middleware/auth.js');

router.route('/user/:id', auth.isLoggedin,)
    .get(user.retrive)


module.exports = router;
    

