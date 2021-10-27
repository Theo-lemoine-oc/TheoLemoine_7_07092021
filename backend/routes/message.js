const express = require('express');
const router = express.Router();
const messagesCtrl = require('../controllers/messages');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, messagesCtrl.createMessage);
router.put('/:id', auth, multer, messagesCtrl.updateMessage);
router.delete('/:id', messagesCtrl.deleteMessage);
router.get('/', auth, messagesCtrl.listMessages);

module.exports = router;