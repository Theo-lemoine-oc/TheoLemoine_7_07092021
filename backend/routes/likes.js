const express = require('express');
const router = express.Router();

const messagesCtrl = require('../controllers/likes');

router.post('/vote/like', messagesCtrl.likePost);
router.post('/vote/dislike', messagesCtrl.dislikePost);

module.exports = router;