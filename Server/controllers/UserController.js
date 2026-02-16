const UserService = require('../services/UserService')
const User = require('../models/User')

const getAllUser = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const getUserProfile = async (req, res) => {
    try {
        const jwt = req.headers.authorization?.split(" ")[1];
        if (!jwt) {
            return res.status(401).send({ message: 'Token Not Found' });
        }
        const user = await UserService.getUserProfile(jwt);
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updateData = { ...req.body };
    if (req.file) {
      updateData.photo = req.file.path || req.file.filename; 
    }
    for (let key in updateData) {
      if (updateData[key] === '') {
        updateData[key] = undefined;
      }
    }
    const updatedUser = await UserService.updateUserProfile(userId, updateData);
    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Added this
const updateRole = async (req, res) => {
  try {
    const { role } = req.body;

    // validate role
    if (!['CUSTOMER', 'FARMER', 'ADMIN'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Use CUSTOMER, FARMER or ADMIN' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ success: true, message: `Role updated to ${role}`, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUser, getUserProfile, updateProfile, updateRole } 