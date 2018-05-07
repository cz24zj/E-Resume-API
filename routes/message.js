const express = require('express');
const router = express.Router({ mergeParams: true });
const message = require('../handlers/message.js');
const auth = require('../middleware/auth.js');

router.route("/user/:id/message/", auth.isLoggedin, auth.isCurrentUser)
  .get(message.retrive)
  .post(message.create)

router.route('/user/:id/message/:message_id', auth.isLoggedin, auth.isCurrentUser)
  .put(message.update)
  .delete(message.delete)
  

module.exports = router;