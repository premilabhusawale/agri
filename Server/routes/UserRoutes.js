const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const Authenticate = require('../middleware/Authenticate');
const { upload } = require('../config/cloudnary');

router.get('/all-users', UserController.getAllUser);
router.get('/profile', Authenticate, UserController.getUserProfile);
router.put('/update', Authenticate, upload.single('photo'), UserController.updateProfile);
router.put('/update-role/:id', UserController.updateRole);

// ✅ Search users by name (used in chat)
router.get('/users', Authenticate, UserController.searchUsers);

router.delete('/user/:id', Authenticate, UserController.deleteUser);

module.exports = router;