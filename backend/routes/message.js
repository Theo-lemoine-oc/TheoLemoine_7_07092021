const express = require('express');
const router = express.Router();
const messagesCtrl = require('../controllers/messages');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/create', auth, multer, messagesCtrl.createMessage);
router.put('/update', auth, multer, messagesCtrl.updateMessage);
router.delete('/delete', messagesCtrl.deleteMessage);
router.get('/', auth, messagesCtrl.listMessages);

module.exports = router;