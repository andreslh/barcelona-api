const express = require('express');
const router = express.Router();

const controller = require('../controllers/users');
const { authenticateJWT, isAdmin } = require('../validators/authentication');

router.post('/signup', authenticateJWT, controller.signup);
router.post('/login', controller.login);
router.post('/token', controller.token);
router.post('/logout', controller.logout);
router.put('/change-password', authenticateJWT, controller.changePassword);
router.get(
  '/manage/list/:role',
  authenticateJWT,
  isAdmin,
  controller.getByRole
);
router.put(
  '/manage/reset-password/',
  authenticateJWT,
  isAdmin,
  controller.resetPassword
);

module.exports = router;
