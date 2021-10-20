const express = require('express');
const router = express.Router();

const messagesCtrl = require('../controllers/messages');

router.post('/', messagesCtrl.createMessage);
router.get('/', messagesCtrl.listMessages);

module.exports = router;