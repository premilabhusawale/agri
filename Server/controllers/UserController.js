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

const updateRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['CUSTOMER', 'ADMIN'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role. Use CUSTOMER or ADMIN' });
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

// ✅ Search users by name (used in chat)
const searchUsers = async (req, res) => {
  try {
    const { search } = req.query;
    if (!search || !search.trim()) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    const users = await User.find({
      $or: [
        { name: { $regex: search.trim(), $options: 'i' } },
        { surname: { $regex: search.trim(), $options: 'i' } },
        { role: { $regex: search.trim(), $options: 'i' } }
      ]
    })
      .select('_id name surname role photo')
      .limit(10);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await UserService.deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUser, getUserProfile, updateProfile, updateRole, searchUsers, deleteUser }