const ChatbotMessage = require('../models/ChatbotMessage');
const askGroq = require('../utils/groqBot');
const User = require('../models/User');

exports.askBot = async (req, res) => {
  try {
    const { userId, question } = req.body;

    if (!userId || !question) {
      return res.status(400).json({ message: 'userId and question are required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // ✅ pass language
    const answer = await askGroq(question, user.role, user.language);
    const saved = await ChatbotMessage.create({ user: userId, question, answer });

    res.status(200).json({ success: true, question, answer, savedId: saved._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await ChatbotMessage.find({ user: userId }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, history });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};