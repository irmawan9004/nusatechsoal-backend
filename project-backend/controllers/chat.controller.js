const mongoose = require('mongoose');
const Message = require('../models/message.model');
const User = require('../models/user.model');  // Assuming you have a User model
const { sendMessageToQueue } = require('../config/rabbitmq');

exports.sendMessage = async (req, res) => {
  const { content, conversationId, recipientUsername } = req.body;  // Change recipientId to recipientUsername
  const senderId = req.user.id;

  try {
    // Check if recipientUsername is provided
    if (!recipientUsername) {
      return res.status(400).json({ error: 'Recipient username is required' });
    }

    // Find recipient by username
    const recipient = await User.findOne({ username: recipientUsername });
    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const recipientId = recipient._id;  // Get recipientId from the found user

    // Create the message in the database with senderId, recipientId, and conversationId
    const message = await Message.create({
      content,
      senderId,
      recipientId,
      conversationId,
    });

    // Send the message to the RabbitMQ queue
    const payload = JSON.stringify({ content, senderId, recipientId, conversationId });
    await sendMessageToQueue('chat-messages', payload);

    // Fetch the messages of the conversation after sending the new one
    const messages = await Message.find({ conversationId }).sort({ createdAt: -1 });

    // Return both the sent message and the conversation's messages
    res.status(201).json({ message, messages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
