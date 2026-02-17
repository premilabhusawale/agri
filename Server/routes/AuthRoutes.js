const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { upload } = require("../config/cloudnary");

router.post('/auth/signup', upload.single("photo"), AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout);
router.post('/auth/forgot-password', AuthController.forgotPassword);
router.post('/auth/reset-password', AuthController.resetPassword);

module.exports = router;
