const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../handlers/auth.js')

router.post('/signup', auth.signup);
router.post('/signin', auth.signin)

module.exports = router;