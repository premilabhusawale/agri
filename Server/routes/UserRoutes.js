const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const Authenticate = require('../middleware/Authenticate');

router.get('/all-users',  UserController.getAllUser);
router.get('/profile', Authenticate, UserController.getUserProfile);
router.put('/update', Authenticate, UserController.updateProfile);
router.put('/update-role/:id', UserController.updateRole);

module.exports = router;