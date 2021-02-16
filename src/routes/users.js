const express = require('express');
const router = express.Router();

const controller = require('../controllers/users');
const { authenticateJWT } = require('../validators/authentication');

router.post('/signup', authenticateJWT, controller.signup);
router.post('/login', controller.login);
router.post('/token', controller.token);
router.post('/logout', controller.logout);
router.put('/change-password', authenticateJWT, controller.changePassword);

module.exports = router;
