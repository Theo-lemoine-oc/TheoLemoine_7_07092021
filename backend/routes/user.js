const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/me', auth, userCtrl.getUserProfile);
router.put('/changepassword', auth, userCtrl.changePassword);
router.delete('/:id', auth, userCtrl.deleteProfile);

module.exports = router;